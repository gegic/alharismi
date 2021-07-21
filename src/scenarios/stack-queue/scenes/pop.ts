import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';

export class Pop implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  stack: SimulationArray;
  index = -1;
  elements = '';
  stackSize = -1;
  highlightedElement: ArrayCell;
  poppedValue = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.stack = simulation.objectFactory.create('array', 0, 0, 10) as SimulationArray;
    simulation.arrayHandler.add(this.stack);

    for (let i = 0; i < nodes.length; ++i) {
      await this.stack.insertAt(nodes[i], i, false);
    }
    this.index = this.stack.size - 1;
    this.highlightedElement = this.stack.data[this.index];
    this.highlightedElement.highlight('#fdd828');
    this.poppedValue = this.highlightedElement.node.value;
    this.stackSize = !!this.stack ? this.stack.size : 10;
    this.elements = this.stack.data.slice(0, this.index).map(c => c.node.value).join(', ');
  }

  async play(simulation: Simulation): Promise<void> {
    this.highlightedElement.resetColor();
    await this.stack.deleteAt(this.index);
    this.highlightedElement = this.stack.data[this.index - 1];
    this.highlightedElement.highlight('#fdd828');
  }

  content(): string {
    return `
  <h1 class="scene-title">Stack - Pop operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's our stack with elements ${this.elements}.
  </p>
  <p>
    There are ${this.stackSize} elements in the stack.
    The highlighted element ${this.poppedValue} is the <em>top element</em> of the stack.
  </p>
  <p>
    The operation that will be performed now is the second crucial operation for stacks.
    It is called <b>pop</b>.
  </p>
  <p>
    Pop simply means the last element ${this.poppedValue} at index [${this.index}]
    will be deleted from the array, and an element left to it will become the new <em>top</em>.
  </p>
  <p>
    Let's see how elements are popped from this stack..
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    After successfully popping from the stack, the <em>top</em> is now at the index
    [${this.index - 1}] and we have received back the value ${this.poppedValue} from
    stack.
  </p>
    `;
  }

}
