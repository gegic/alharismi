import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import heapScenario from '../heap-scenario';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';

export class FindMin implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  heap: Heap;
  minValue = -1;
  newRootValue = -1;
  newProperRootValue = -1;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.heap = simulation.objectFactory.create('heap', 0, 0) as Heap;
    simulation.heapHandler.add(this.heap);

    for (const node of nodes) {
      await this.heap.insert(node, false);
    }
    this.minValue = this.heap.getRoot().node.value;
    this.newRootValue = this.heap._data[this.heap.size - 2].node.value;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.heap.deleteNodeFromCell(this.heap.getRoot());
    this.newProperRootValue = this.heap.getRoot().node.value;
  }

  content(): string {
    return `
  <h1 class="scene-title">Extract minimum</h1>
  <p>
    As the tree on the right-hand side is a min-heap, a node with the minimum value can
    be found in the heap's root.
  </p>
  <p>
    Extraction isn't that complicated:
  </p>
  <ol>
    <li>
      Swap the root node with the last leaf, which contains value ${this.newRootValue};
    </li>
    <li>
      Extract value from the last leaf, which is now minimum ${this.minValue};
    </li>
    <li>
      Propagate new root value down the heap, in order to restore heap order.
    </li>
  </ol>
  <p>
    Press play to see how that works in practice!
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Order of the heap is successfully restored and ${this.newRootValue} was
    propagated down the tree, so ${this.newProperRootValue} became the new root value by
    swapping nodes all the way down the heap.
  </p>
    `;
  }

}
