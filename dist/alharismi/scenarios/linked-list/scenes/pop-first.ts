import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class PopFirst implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  list: LinkedList;
  toPop = -1;
  newFirst = -1;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    this.list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(this.list);

    for (const node of nodes) {
      await this.list.append(node, false);
    }

    this.toPop = nodes[0].value;
    this.newFirst = nodes[1].value;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.list.popFirst();
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list - pop first node</h1>
  <p>
    In order to remove the element which is placed at the beginning of a linked list,
    it is necessary to simply reverse steps from insertion at the beginning, that is:
  </p>
  <ul>
    <li>
      Get the node referenced by ${this.toPop}, which is ${this.newFirst};
    </li>
    <li>
      Set <em>head</em> to reference the node with value ${this.newFirst}.
    </li>
  </ul>
  <p>
    Now, let's visualize that.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Node with value ${this.toPop} is now popped from the linked list and node with value
    ${this.newFirst} is referenced by <em>head</em>.
  </p>
    `;
  }

}
