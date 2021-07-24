import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import heapScenario from '../heap-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {Heap} from '../../../app/core/simulation/structures/tree/binary-tree/heap/heap';

export class Insertion implements Scene {
  id = 3;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  heap: Heap;
  newElement = -9.31;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.heap = simulation.objectFactory.create('heap', 0, 0) as Heap;
    simulation.heapHandler.add(this.heap);

    for (const node of nodes) {
      await this.heap.insert(node, false);
    }
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.newElement, -1, this.heap.x, this.heap.y - 200);
    simulation.nodeHandler.add(node);

    await this.heap.insert(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Heap insertion</h1>
  <p>
    Inserting an element to a heap is done by simply inserting a
    node as its last leaf and then propagating it up the heap
    in order to find its correct position.
  </p>
  <ul>
    <li>
      Insert new node ${this.newElement} to the heap's last leaf;
    </li>
    <li>
      Swap the node contatining ${this.newElement} and its parent as long as
      the node's value is lower than its parent's value.
    </li>
  </ul>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.newElement} is now inserted and the heap order is restored.
  </p>
    `;
  }

}
