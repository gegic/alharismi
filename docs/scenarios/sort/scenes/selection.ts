import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {BubbleSort} from '../../../app/core/simulation/structures/array/bubble-sort';
import {InsertionSort} from '../../../app/core/simulation/structures/array/insertion-sort';
import {SelectionSort} from '../../../app/core/simulation/structures/array/selection-sort';

export class Selection implements Scene {
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
    this.array.sorting = new SelectionSort();
    await this.array.sort();
  }

  content(): string {
    return `
  <h1 class="scene-title">Selection sort</h1>
  <p>
    Selection sort is a simple sorting algorithm that maintains a sorted subarray,
    which is represented at the left side of the array. Iterating through the unsorted right subarray,
    the algorithm finds the maximum value there and simply puts it at the end of the
    left subarray.
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
    Among quadratic sorting algorithms (sorting algorithms with a simple average-case
    of <em>Θ(n<sup>2</sup>))</em>, selection sort almost always outperforms bubble sort.
    However, insertion sort is very similar.
  </p>
  <p>
    Finally, selection sort is greatly outperformed on larger arrays by divide-and-conquer
    algorithms such as mergesort or quicksort. However, insertion sort or selection sort
    are both typically faster for small arrays (i.e. fewer than 10–20 elements).
  </p>
    `;
  }

}
