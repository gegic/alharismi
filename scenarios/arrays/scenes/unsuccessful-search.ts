import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class UnsuccessfulSearch implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  nodes?: SimulationNode[];
  array?: SimulationArray;
  arrElement = -1;
  arrSize = -1;
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(10);
    simulation.nodeHandler.add(nodes);
    this.array = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.array);

    for (let i = 0; i < nodes.length; ++i) {
      await this.array.insertAt(nodes[i], i, false);
    }
    this.arrElement = 23.11;

    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.array.linearSearch(this.arrElement);
  }


  content(): string {
    return `
  <h1 class="scene-title">Linear search - unsuccessful</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize}
    elements in an arbitrary order.
  </p>
  <p>
    What is, in your opinion, the best way to deterine that ${this.arrElement} is not present in the array?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    As you see, the algorithm had to check every single element of the array, from
    [0] all the way up to [${this.array.size - 1}], and only after finding out that
    none of them was equal to ${this.arrElement}, could it be sure that ${this.arrElement}
    was not in the array.
  </p>
  `;
  }
}
