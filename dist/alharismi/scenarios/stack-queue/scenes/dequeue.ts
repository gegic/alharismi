import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {SimulationQueue} from '../../../app/core/simulation/structures/array/simulation-queue';

export class Dequeue implements Scene {
  id = 5;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  queue: SimulationQueue;
  index = -1;
  elements = '';
  queueSize = -1;
  firstValue = -1;
  lastValue = -1;

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
    await this.queue.dequeue();
  }

  content(): string {
    return `
  <h1 class="scene-title">Queue - Dequeue operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's the queue implementation.
  </p>
  <p>
    The first element of the queue is <span style="color: #a0ff6f; font-weight: bold">${this.firstValue}</span>,
    and the last element is <span style="color: #ff9494; font-weight: bold">${this.lastValue}</span>.
  </p>
  <p>
    The operation that will be performed now is the <em>dequeue</em> operation,
    which is another crucial operation used for queues.
  </p>
  <p>
    In this configuration, dequeue is performed like a deletion of the first element from the array.
    However, the difference between the default deletion for arrays and the dequeue operation
    is that the empty space remains.
  </p>
  <p>
    Let's see how an element is dequeued from this queue.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    After successfully dequeueing the value ${this.firstValue}, the second element of the array
    at the index [1] has became the first element of the queue.
  </p>
  <small>Notice that remaining elements were not moved to the left in order to fill the empty space.</small>
    `;
  }

}
