import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class InsertionEnd implements Scene {
  id = 3;
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
    this.arrElement = 23.11;
    this.index = this.array.size;
    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.arrElement, -1, this.array.x, this.array.y - 200);
    simulation.nodeHandler.add(node);
    await this.array.insertAt(node, this.index);
  }


  content(): string {
    return `
  <h1 class="scene-title">Insertion at the end of an array</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's append ${this.arrElement} to the array.
  </p>
  <p>
    Are there any special steps that we need to perform prior to inserting this element at the index [${this.index}]?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    Obviously, there weren't any necessary steps prior to this insertion.
    The algorithm has simply determined that there were no elements at the index
    [${this.index}], and thus only placed ${this.arrElement} there.
  </p>
  `;
  }
}
