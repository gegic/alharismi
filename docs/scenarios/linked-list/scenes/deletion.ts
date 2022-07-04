import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Deletion implements Scene {
  id = 3;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  toDelete = -1;
  deletionIndex = -1;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }
    this.deletionIndex = Math.floor(nodes.length / 2);
    this.toDelete = nodes[this.deletionIndex].value;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.list.delete(this.deletionIndex);
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - deletion at a given index</h1>
  <p>
    Deleting an element from the linked list is performed similarly to deleting
    from the beginning, with the exception that the element at the given index
    must be found prior to that.
  </p>
  <p>
    Finding an element at a given index has to be performed by
    traversing successors and counting how many nodes were passed at every
    given iteration.
  </p>
  <p>
    After finding an element at a given index, deletion consists of one step where
    predecessor of the <em>target</em> node now references <em>target</em> node's
    successor.
  </p>
  <p>
    Now, let's delete element at the index ${this.deletionIndex}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.toDelete} is now deleted from the index ${this.deletionIndex} of the linked list.
  </p>
    `;
  }

}
