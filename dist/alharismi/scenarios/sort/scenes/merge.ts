import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {BubbleSort} from '../../../app/core/simulation/structures/array/bubble-sort';
import {InsertionSort} from '../../../app/core/simulation/structures/array/insertion-sort';
import {SelectionSort} from '../../../app/core/simulation/structures/array/selection-sort';
import {MergeSort} from '../../../app/core/simulation/structures/array/merge-sort';

export class Merge implements Scene {
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
    this.array.sorting = new MergeSort();
    await this.array.sort();
  }

  content(): string {
    return `
  <h1 class="scene-title">Merge sort</h1>
  <p>
    Merge Sort is one of the most popular sorting algorithms that is based on the
    principle of Divide and Conquer Algorithm.
  </p>
  <p>
    Here, a problem is divided into multiple sub-problems. Each sub-problem is solved
    individually. Finally, sub-problems are combined to form the final solution.
  </p>
  <p>
    Using the Divide and Conquer technique, we divide a problem into subproblems.
    When the solution to each subproblem is ready, we 'combine' the results from the
    subproblems to solve the main problem.
  </p>

  <p>
    Suppose we had to sort an array <em>A</em>. A subproblem would be to sort a sub-section of
    this array starting at index <em>p</em> and ending at index <em>r</em>, denoted as <em>A[p..r]</em>.
  </p>

  <p>
    If <em>q</em> is the half-way point between <em>p</em> and <em>r</em>, then we can split the subarray <em>A[p..r]</em> into two
    arrays <em>A[p..q]</em> and <em>A[q+1, r]</em>.
  </p>
  <p>
    In the conquer step, we try to sort both the subarrays <em>A[p..q]</em> and <em>A[q+1, r]</em>. If we haven't yet reached the base case,
    we again divide both these subarrays and try to sort them.
  </p>
  <p>
    When the conquer step reaches the base step and we get two sorted subarrays <em>A[p..q]</em>
    and <em>A[q+1, r]</em> for array <em>A[p..r]</em>, we combine the results by creating
    a sorted array <em>A[p..r]</em> from two sorted subarrays <em>A[p..q]</em> and <em>A[q+1, r]</em>.
  </p>
  <p>
    Press play to sort the elements
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    In sorting n objects, merge sort has an average and worst-case performance of <em>O(n log n)</em>.
  </p>
    `;
  }

}
