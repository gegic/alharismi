import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {BubbleSort} from '../../../app/core/simulation/structures/array/bubble-sort';
import {InsertionSort} from '../../../app/core/simulation/structures/array/insertion-sort';

export class Insertion implements Scene {
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
    this.array.sorting = new InsertionSort();
    await this.array.sort();
  }

  content(): string {
    return `
  <h1 class="scene-title">Insertion sort</h1>
  <p>
    Insertion sort is a simple sorting algorithm that maintains a sorted sub-list,
    which is represented at the left side of the array. Iterating through the right subarray,
    each element is chosen and then but in the left sub-list, but only between one element
    which has a lower and the other which has a higher value.
  </p>
  <p>
   The array elements are compared with each other sequentially and then arranged simultaneously
   in some particular order. The analogy can be understood from the style we arrange a deck
   of cards. This sort works on the principle of inserting an element at a particular position,
   hence the name Insertion Sort.
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
    The best case input is an array that is already sorted. In this case insertion sort
    has a linear running time (i.e., <em>O(n)</em>). During each iteration, the first remaining
    element of the input is only compared with the right-most element of the sorted
    subsection of the array.
  </p>
  <p>
     The simplest worst case input is an array sorted in reverse order. The set of all
     worst case inputs consists of all arrays where each element is the smallest or
     second-smallest of the elements before it. In these cases every iteration of the
     inner loop will scan and shift the entire sorted subsection of the array before
     inserting the next element. This gives insertion sort a quadratic running time
     (i.e., <em>O(n<sup>2</sup>)</em>).
  </p>
  <p>
     The average case is also quadratic, which makes insertion sort impractical for sorting
     large arrays. However, insertion sort is one of the fastest algorithms for sorting very
     small arrays, even faster than quicksort; indeed, good quicksort implementations use
     insertion sort for arrays smaller than a certain threshold, also when arising as
     subproblems; the exact threshold must be determined experimentally and depends on the machine,
     but is commonly around ten.
  </p>
    `;
  }

}
