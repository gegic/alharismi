import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class DeletionBeginning implements Scene {
  id = 7;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  nodes?: SimulationNode[];
  array?: SimulationArray;
  arrElement = -1;
  index = -1;
  arrSize = -1;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.array = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.array);

    for (let i = 0; i < nodes.length; ++i) {
      await this.array.insertAt(nodes[i], i, false);
    }
    this.index = 0;
    this.arrElement = this.array.data[this.index].node.value;
    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.array.deleteAt(this.index);
  }


  content(): string {
    return `
  <h1 class="scene-title">Deletion from a given index of an array</h1>
  <p>
    Glance at the array on the right-hand side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What would happen if we wanted to delete an element from the beginning, i.e. index [${this.index}] of this array.
  </p>
  <p>
    You might think that every remaining element in the will be shifted to the left.
  </p>
  <small>
    HINT: That's correct.
  </small>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    After removing ${this.arrElement} from the array, that empty space from the beginning, index [${this.index}]
    had to be gone.
  </p>
  <p>
    That was managed by moving all the remaining elements to the left.
  </p>
  `;
  }
}
