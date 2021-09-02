import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Prepend implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  newElement = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.newElement, -1, this.list.x, this.list.y - 200);
    simulation.nodeHandler.add(node);

    await this.list.prepend(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - prepend</h1>
  <p>
    One main advantage of linked lists over arrays is that it is possible to add an
    element to the beginning of a list without moving any other node.
  </p>
  <p>
    Since nodes might be scattered everywhere in the memory, a new node is added and:
  </p>
  <ul>
    <li>
      <em>Head</em> now references the new node;
    </li>
    <li>
      The new node references previous first node.
    </li>
  </ul>
  <p>
    Now, let's add ${this.newElement} to the beginning of the linked list.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.newElement} is now added to the linked list, it is referenced by <em>head</em> and it
    references the same node <em>head</em> was referencing prior to this insertion.
  </p>
    `;
  }

}
