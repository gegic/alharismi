import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class PopLast implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  toPop = -1;
  newLast = -1;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }

    this.toPop = nodes[nodes.length - 1].value;
    this.newLast = nodes[nodes.length - 2].value;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.list.popLast();
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - pop the last node</h1>
  <p>
    In order to remove the element which is placed at the end of a linked list,
    the process is quite complicated.
  </p>
  <p>
    Since it is impossible to directly get the predecessor of ${this.toPop},
    the entire linked list has to be traversed in order to find a node which
    references ${this.toPop}. That node is its predecessor
  </p>
  <p>
    The steps required in order to delete an element from the end of the linked list are:
  </p>
  <ul>
    <li>
      Get the node referenced by <em>tail</em>, which is ${this.toPop};
    </li>
    <li>
      Iterate and find its predecessor, that is ${this.newLast};
    </li>
    <li>
      Delete predecessor's reference and set <em>tail</em> to reference predecessor.
    </li>
  </ul>
  <p>
    Press play in order to see how all of that works in practice.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.toPop} is now popped from the linked list and node with value
    ${this.newLast} is referenced by <em>tail</em>, but it doesn't reference any node at all.
  </p>
    `;
  }

}
