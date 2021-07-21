import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class CircularQueue implements Scene {
  id = 6;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  queue: SimulationArray;
  index = -1;
  elements = '';
  queueSize = -1;
  firstElement: ArrayCell;
  lastElement: ArrayCell;
  firstValue = -1;
  lastValue = -1;
  toEnqueue = 23.11;
  capacity = -1;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.queue = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.queue);

    for (let i = 0; i < nodes.length; ++i) {
      await this.queue.insertAt(nodes[i], i + this.queue.capacity - nodes.length, false);
    }
    this.firstElement = this.queue.data[this.queue.capacity - nodes.length];
    this.capacity = this.queue.capacity;
    this.lastElement = this.queue.data[this.queue.capacity - 1];
    this.firstElement.highlight('#a0ff6f');
    this.lastElement.highlight('#ff9494');
    this.firstValue = this.firstElement.node.value;
    this.lastValue = this.lastElement.node.value;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.toEnqueue, -1, this.queue.x, this.queue.y - 200);
    simulation.nodeHandler.add(node);
    this.lastElement.resetColor();
    await this.queue.insertAt(node, 0);
    this.lastElement = this.queue.data[0];
    this.lastElement.highlight('#ff9494');
  }

  content(): string {
    return `
  <h1 class="scene-title">Queue - Circular queue</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    Current queue configuration was achieved using consecutive enqueue and dequeue operations,
    without moving elements to the left when dequeueing.
  </p>
  <p>
    Now, utilizing the previously learned way of appending element ${this.toEnqueue}
    to the end of the array won't work. Even though the array itself isn't completely full,
    we can't simply add an element to it.
  </p>
  <p>
    That is why a circular variant of the queue is implemented. Now, we're not simply adding
    an element to the end of array. Instead, imagine we're checking if the last element is at the last index
    of the array. If it is, we'll check if there is empty space at the beginning of the array and out new last element
    will be placed there this time.
  </p>
  <p>
    Only, we can avoid that checking if the last element is at the last index, and simply insert
    our new element (which will be denoted as the last element of the queue) at the index
    [(i + 1) % N] where <em>i</em> is index of the last element of the queue and N is capacity of the array.
  </p>
  <p>
    Moreover, we can avoid that checking process and simply insert
    our new element (which will be denoted as the last element of the queue) at the index
    [(i + 1) % N] where <em>i</em> is index of the last element of the queue and N is capacity of the array.
  </p>
  <p>
    Let's see how this works by enqueueing ${this.toEnqueue}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    After successfully enqueueing the value ${this.toEnqueue}, it has became the new last element.
  </p>
  <small>
    The same principle goes for dequeueing as well, where the first element would
    be placed at the index [0] after dequeueing an element from the index [${this.capacity}].
  </small>
    `;
  }

}
