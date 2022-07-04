import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';

export class SortedSearch implements Scene {
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
    nodes.sort((a, b) => a.value > b.value ? 1 : a.value === b.value ? 0 : -1);
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
    this.array.sorted = true;

    this.arrSize = !!this.array ? this.array.size : 10;
  }

  async play(simulation: Simulation): Promise<void> {
    await this.array.binarySearch(this.arrElement);
  }


  content(): string {

    return `
  <h1 class="scene-title">Binary search</h1>
  <p>
    Notice an array on the right-hand-side. It has ${this.arrSize} sorted elements,
    going from the lowest to the highest value.
  </p>
  <p>
    What do you think would be the best method to find a node with value ${this.arrElement}?
  </p>
  <p>
    Is there any advantage that sorted arrays have over unsorted ones?
  </p>
  <p>
    Press play to find out :)
  </p>
`;
  }

  successContent(): string {
    return `
  <p>
    This is called binary search. Binary Search is a searching algorithm for finding an element's position in a sorted array.
  </p>
  <p>
    Knowing where the middle of the array is, we are checking from that element.
    If our desired element happens to be lower than the middle element, we know that we only
    have to check the left portion of the array.
  </p>
  <p>
    Binary search begins by comparing an element in the middle of the array with the target value.
    If the target value matches the element, its position in the array is returned.
    If the target value is less than the element, the search continues in the lower half of the array.
    If the target value is greater than the element, the search continues in the upper half of the array.
    By doing this, the algorithm eliminates the half in which the target value cannot lie in each iteration.
  </p>
  <small>
    Remember: Binary search can be implemented only on a sorted list of items.
    If the elements are not sorted already, we need to sort them first.
  </small>
`;
  }
}
