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
  <h1 class="scene-title">Sorting</h1>
  <p>
    Sorting represents a process of reordering elements of a data structure according
    according to a predefined factor.
  </p>
  <p>
    The importance of sorting lies in the fact that data searching can be optimized to
    a very high level, if data is stored in a sorted manner. Sorting is also used to represent data in more readable formats.
  </p>
  <p>
    Sorting algorithms covered in this section are:
  </p>
  <ul>
    <li>Bubble sort;</li>
    <li>Insertion sort;</li>
    <li>Selection sort;</li>
    <li>Merge sort;</li>
    <li>Quick sort.</li>
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
