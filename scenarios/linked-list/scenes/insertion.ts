import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Insertion implements Scene {
  id = 3;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  insertionIndex = -1;
  newElement = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }
    this.insertionIndex = Math.floor(nodes.length / 2);
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.newElement, -1, this.list.x, this.list.y - 200);
    simulation.nodeHandler.add(node);

    await this.list.insert(node, this.insertionIndex);
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - insertion after a given index</h1>
  <p>
    Inserting an element to a linked list wouldn't be too complicated if
    there were an easy way to find out where that index is.
  </p>
  <p>
    That being said, finding an element at a given index has to be performed by
    traversing successors and counting how many nodes were passed at every
    given iteration.
  </p>
  <p>
    After finding an element at a given index, insertion consists of a few steps which involve the
    predecessor and the successor of the new node:
  </p>
  <ul>
    <li>
      New predecessor now references the new node.
    </li>
    <li>
      The new node now references the new successor.
    </li>
  </ul>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.newElement} is now inserted after the index ${this.insertionIndex} of the linked list.
  </p>
    `;
  }

}
