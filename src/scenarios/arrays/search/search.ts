import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class SearchScene implements Scene {
  id = 1;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  nodes?: SimulationNode[];
  array?: SimulationArray;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(11);
    simulation.nodeHandler.add(nodes);
    this.array = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.array);

    for (let i = 0; i < nodes.length; ++i) {
      await this.array.insertAt(nodes[i], i, false);
    }
  }

  play(simulation: Simulation): void {
  }


  content(): string {
    return `
  <h1 class="scene-title">Linear search</h1>
  <p>
    Notice an array on the right-hand-side. It has ${!!this.array ? this.array.size : 10} elements in an
    arbitrary order.
  </p>
  <p>
    What do you think would be the best method to find a node with value ${this.array ? this.array.data[6].node.value : -1}?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }
}
