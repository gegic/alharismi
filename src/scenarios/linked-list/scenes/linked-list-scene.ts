import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {LinkedList} from '../../../app/core/simulation/structures/tree/linked-list/linked-list';
import linkedListScenario from '../linked-list-scenario';

export class LinkedListScene implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);

    const list = simulation.objectFactory.create('singlyLinkedList', 0, 0) as LinkedList;
    simulation.linkedListHandler.add(list);

    for (const node of nodes) {
      await list.append(node, false);
    }
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Linked list</h1>
  <p>
    Liked list represents a sequence of connected elements in form of nodes.
  </p>
  <p>
    Each node contains:
  </p>
  <ul>
    <li>
      Data (a value which it holds);
    </li>
    <li>
      Link towards the next node in the sequence;
    </li>
    <li>
      Link towards the previous node in the sequence
      <small>If it's a doubly linked list</small>.
    </li>
  </ul>
  <p>
    There is one reference to the first node in the list, and it is called <em>head</em>,
    as well as one reference to the last node in the list, and it is called <em>tail</em>.
  </p>
  <p>
    Every node is referencing its only successor, and the last node
    does not have a link to any node.
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
