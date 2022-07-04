import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class SearchScene implements Scene {
  id = 1;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  nodes?: SimulationNode[];
  array?: SimulationArray;
  arrElement = -1;
  arrSize = -1;
  movedElements = '';
  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(10);
    simulation.nodeHandler.add(nodes);
    this.array = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.array);

    for (let i = 0; i < nodes.length; ++i) {
      await this.array.insertAt(nodes[i], i, false);
    }
    if (!this.array || !this.array.data[6].node) {
      this.arrElement = -1;
    } else {
      this.arrElement = this.array.data[6].node.value;
    }

    this.arrSize = !!this.array ? this.array.size : 10;
    this.movedElements = this.array.data.slice(0, 6).map(d => d.node.value).join(', ');
  }

  async play(simulation: Simulation): Promise<void> {
    await this.array.linearSearch(this.arrElement);
  }


  content(): string {

    return `
  <h1 class="scene-title">Linear search</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} elements in an
    arbitrary order.
  </p>
  <p>
    What do you think would be the best method to find a node with value ${this.arrElement}?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    If you guessed that you should check every element starting from the first one, then you guessed correctly.
  </p>
  <p>
    The algorithm has checked every single element, [${this.movedElements}]
    before it successfully found ${this.arrElement}.
  </p>
  <p>
    How do we determine if element is not present in the array?
  </p>
`;
  }
}
