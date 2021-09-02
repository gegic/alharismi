import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import heapScenario from '../heap-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';

export class Deletion implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  heap: Heap;
  toDelete = -1;
  newRoot = -1;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.heap = simulation.objectFactory.create('heap', 0, 0) as Heap;
    simulation.heapHandler.add(this.heap);

    for (const node of nodes) {
      await this.heap.insert(node, false);
    }

    if (nodes[3] !== this.heap.getRoot().node) {
      this.toDelete = nodes[3].value;
    } else {
      this.toDelete = nodes[2].value;
    }
  }

  async play(simulation: Simulation): Promise<void> {
    await this.heap.delete(this.toDelete);
  }

  content(): string {
    return `
  <h1 class="scene-title">Heap - deletion</h1>
  <p>
    In order to remove an element with a given value, firstly the heap
    from the right-hand side has to be searched using breadth-first-search
    for that value.
  </p>
  <p>
    After finding the target node, it is swapped with the last leaf
    of the heap, just like it was the case with extracting the minimum
    value.
  </p>
  <p>
    Then, the last node is removed from the heap, and the remaining
    swapped node is propagated down the heap in order to restore
    heap properties.
  </p>
  <p>
    Let's see how all this works with the value ${this.toDelete}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.toDelete} is now removed from the heap, and
    the its order is restored.
  </p>
    `;
  }

}
