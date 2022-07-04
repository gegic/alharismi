import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Append implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  currentLast = -1;
  newElement = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }
    this.currentLast = nodes[nodes.length - 1].value;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.newElement, -1, this.list.x, this.list.y - 200);
    simulation.nodeHandler.add(node);

    await this.list.append(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - prepend</h1>
  <p>
    The data structure on the right-hand side is a singly linked list.
  </p>
  <p>
    Now, let's see how to add an element with value ${this.newElement} to the end of a linked list.
  </p>
  <p>
    Appending is performed as follows:
  </p>
  <ul>
    <li>Get node referenced by <em>tail</em>;</li>
    <li>Set the new node as its successor;</li>
    <li>Set <em>tail's</em> reference to be the new node.</li>
  </ul>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.newElement} is now added to the linked list, it is referenced by and it
    doesn't have a successor. However, it is referenced by both the node with value ${this.currentLast}
    and <em>tail</em>.
  </p>
    `;
  }

}
