import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';

export class StartScene implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  setup(simulation: Simulation): void {
    const array = simulation.objectFactory.create('array', 0, 0) as SimulationArray;
    simulation.arrayHandler.add(array);
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Array visualization</h1>
  <p>
    Here, you will learn the fundamentals regarding arrays.
  </p>
  <p>
    One such array is present on the right-hand-side of this visualization.
    It consists of a collection of elements (values or variables),
    each identified by at least one array index or key (denoted as<i>[index]</i>).
  </p>
  <p>
    Try and interact with the array to familiarize yourself with the environment.
    Array fundamentals which are covered in this section are as follows:
  </p>
  <ul>
    <li>Linear search of elements;</li>
    <li>Inserting elements;</li>
    <li>Deleting elements;</li>
    <li>Finding elements in a sorted array - <em>binary search</em>.</li>
  </ul>
  <p>
    Let's get started :)
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
