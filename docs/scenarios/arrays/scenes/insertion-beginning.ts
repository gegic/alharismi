import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class InsertionBeginning implements Scene {
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
    this.index = 0;
    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.arrElement, -1, this.array.x, this.array.y - 200);
    simulation.nodeHandler.add(node);
    await this.array.insertAt(node, this.index);
  }


  content(): string {
    return `
  <h1 class="scene-title">Insertion at the beginning</h1>
  <p>
    Still that same array :D It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    Now, let's insert ${this.arrElement} at the the beginning (i.e. index [0]).
  </p>
  <p>
    Doesn't this already look similar to the previous scenario when we were moving elements to the right?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    Just like earlier, we head to move all the elements to the right of our new element's index.
  </p>
  <p>
    Since we wanted to insert ${this.arrElement} at the beginning, and that means at the index [0],
    we had to shift all existing elements to the right, starting from the index at which we wanted
    to insert ${this.arrElement}.
  </p>
  <p>
    Only after shifting all the elements to the right, were we sure
    that the array didn't have any elements at index [0],
    and we could simply insert ${this.arrElement} there.
  </p>
  `;
  }
}
