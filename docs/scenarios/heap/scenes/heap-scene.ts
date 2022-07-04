import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import heapScenario from '../heap-scenario';
import {BinarySearchTree} from '../../../app/core/simulation/structures/tree/binary-tree/binary-search-tree/binary-search-tree';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';

export class HeapScene implements Scene {
  id = 1;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    const heap = simulation.objectFactory.create('heap', 0, 0) as Heap;
    simulation.heapHandler.add(heap);

    for (const node of nodes) {
      await heap.insert(node, false);
    }
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Heap</h1>
  <p>
    Heap is a type of <em>complete binary tree</em>.
  </p>
  <p>
    <em>Binary</em> means that each node has at most two children nodes, whereas
    <em>complete</em> means that every node (except root and rightmost leaf) must have
    a sibling.
  </p>
  <p>
    The tree on the right-hand side is a such a complete binary tree. Besides being
    complete and binary, heap has some other properties:
  </p>
  <ul>
    <li>
        In a max heap, children contain value which is lower than their parent's value.
    </li>
    <li>
        In a <em>min heap</em>, children contain value which is higher than their parent's value.
        That means the root is holding the minimum value in the heap.
    </li>
  </ul>
  <small>Heap on the right side is a min-heap, right?</small>
  <p>
    Press next to see how that minimum value is extracted :D
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
