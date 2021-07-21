import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class InsertionMiddle implements Scene {
  id = 4;
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
    this.index = Math.floor(this.array.size / 2);
    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.arrElement, -1, this.array.x, this.array.y - 200);
    simulation.nodeHandler.add(node);
    await this.array.insertAt(node, this.index);
  }


  content(): string {
    return `
  <h1 class="scene-title">Insertion at a given index</h1>
  <p>
    There's still that same array from before. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's insert ${this.arrElement} at the index [${this.index}].
  </p>
  <p>
    Are there any special steps in this new scenario that we need to perform prior to
    inserting this element at the index [${this.index}]?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    As you see, this was quite a complicated and timely process.
  </p>
  <p>
    Firstly, all of the elements starting from index [${this.index}]
    had to be moved one step to the right. And that was performed by
    moving those elements with the higher index first.
  </p>
  <p>
    Only after shifting all the elements to the right, were we sure
    that the array didn't have any elements at index [${this.index}],
    and we could simply insert ${this.arrElement} there.
  </p>
  `;
  }
}
