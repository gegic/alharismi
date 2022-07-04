import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {BubbleSort} from '../../../app/core/simulation/structures/array/bubble-sort';
import {InsertionSort} from '../../../app/core/simulation/structures/array/insertion-sort';
import {SelectionSort} from '../../../app/core/simulation/structures/array/selection-sort';
import {MergeSort} from '../../../app/core/simulation/structures/array/merge-sort';
import {QuickSort} from '../../../app/core/simulation/structures/array/quick-sort';

export class Quick implements Scene {
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
    this.array.sorting = new QuickSort();
    await this.array.sort();
  }

  content(): string {
    return `
  <h1 class="scene-title">Quick sort</h1>
  <p>Quicksort is a sorting algorithm based on the divide and conquer approach where</p>

  <p>An array is divided into subarrays by selecting a pivot element (element selected from the array).</p>

  <p>While dividing the array, the pivot element should be positioned in such a way that elements less than pivot are kept on the left side and elements greater than pivot are on the right side of the pivot.
  The left and right subarrays are also divided using the same approach. This process continues until each subarray contains a single element.</p>

  <p>At this point, elements are already sorted. Finally, elements are combined to form a sorted array.</p>
  <p>
    Press play to sort the elements
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    Although the worst case time complexity of QuickSort is O(n<sup>2</sup>) which is more
    than many other sorting algorithms like Merge Sort and Heap Sort, QuickSort is faster
    in practice, because its inner loop can be efficiently implemented on
    most architectures, and in most real-world data. QuickSort can be implemented
    in different ways by changing the choice of pivot, so that the worst case rarely
    occurs for a given type of data. However, merge sort is generally considered better
    when data is huge and stored in external storage.
  </p>
    `;
  }

}
