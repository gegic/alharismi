import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {SimulationQueue} from '../../../app/core/simulation/structures/array/simulation-queue';

export class Enqueue implements Scene {
  id = 4;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  queue: SimulationQueue;
  elements = '';
  queueSize = -1;
  firstValue = -1;
  lastValue = -1;
  toEnqueue = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.queue = simulation.objectFactory.create('queue', 0, 0, 10) as SimulationQueue;
    simulation.arrayHandler.add(this.queue);

    for (const node of nodes) {
      await this.queue.enqueue(node, false);
    }
    this.firstValue = this.queue.left.node.value;
    this.lastValue = this.queue.right.node.value;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.toEnqueue, -1, this.queue.x, this.queue.y - 200);
    simulation.nodeHandler.add(node);
    await this.queue.enqueue(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Queue - Enqueue operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    The operation that will be performed now is the <em>enqueue</em> operation.
  </p>
  <p>
    In this configuration, enqueue is done as simple insertion at the end of the implementation array.
  </p>
  <p>
    Let's see how ${this.toEnqueue} is enqueued to this queue.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    After successfully enqueueing the value ${this.toEnqueue}, it has became the new last element.
  </p>
  <small>More details about enqueue operation will be covered in the section following dequeue.</small>
    `;
  }

}
