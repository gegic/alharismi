import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {BubbleSort} from '../../../app/core/simulation/structures/array/bubble-sort';

export class Bubble implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  array: SimulationArray;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(10);
    simulation.nodeHandler.add(nodes);
    this.array = simulation.objectFactory.create('array', 0, 0) as SimulationArray;
    simulation.arrayHandler.add(this.array);

    for (let i = 0; i < nodes.length; ++i) {
      await this.array.insertAt(nodes[i], i, false);
    }
  }

  async play(simulation: Simulation): Promise<void> {
    this.array.sorting = new BubbleSort();
    await this.array.sort();
  }

  content(): string {
    return `
  <h1 class="scene-title">Bubble sort</h1>
  <p>
    Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
    compares adjacent elements and swaps them if they are in the wrong order.
    The pass through the list is repeated until the list is sorted. The algorithm
    is named for the way smaller or larger elements "bubble" to the top of the list.
  </p>
  <p>
    In this example, elements will be sorted in ascending order.
  </p>

  <p>
    Press play to sort the elements
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Bubble sort has a worst-case and average complexity of <em>О(n<sup>2</sup>)</em>, where n is the
    number of items being sorted. Most practical sorting algorithms have substantially
    better worst-case or average complexity, often <em>О(n logn)</em>. Even other  <em>О(n<sup>2</sup>)</em> sorting
    algorithms, such as insertion sort, generally run faster than bubble sort, and are no
    more complex. Therefore, bubble sort is not a practical sorting algorithm.
  </p>
    `;
  }

}
