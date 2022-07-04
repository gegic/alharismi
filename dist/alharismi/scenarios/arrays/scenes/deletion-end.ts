import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class DeletionEnd implements Scene {
  id = 5;
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
    this.index = this.array.size - 1;
    this.arrElement = this.array.data[this.array.size - 1].node.value;
    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.array.deleteAt(this.index);
  }


  content(): string {
    return `
  <h1 class="scene-title">Deletion from the end of an array</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What would happen if we wanted to delete an element from the end, i.e. index [${this.index}] of this array.
  </p>
  <p>
    Are there any special steps that we need to perform prior to its deletion?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    Obviously, there weren't any necessary steps prior to this deletion.
    We simply just removed ${this.arrElement} from the index [${this.index}],
    so there are no more elements at that position.
  </p>
  `;
  }
}
