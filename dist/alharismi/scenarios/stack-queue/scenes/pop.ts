import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {SimulationStack} from '../../../app/core/simulation/structures/array/simulation-stack';

export class Pop implements Scene {
  id = 2;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  stack: SimulationStack;
  index = -1;
  elements = '';
  stackSize = -1;
  highlightedElement: ArrayCell;
  poppedValue = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.stack = simulation.objectFactory.create('stack', 0, 0, 10) as SimulationStack;
    simulation.arrayHandler.add(this.stack);

    for (const node of nodes) {
      await this.stack.push(node, false);
    }
    this.stack.descriptor = 'stack';
    this.poppedValue = this.stack.top.node.value;
    this.stackSize = !!this.stack ? this.stack.size : 10;
    this.elements = this.stack.data.slice(0, this.stackSize).map(c => c.node.value).join(', ');
  }

  async play(simulation: Simulation): Promise<void> {
    await this.stack.pop();
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
    Pop simply means the last element ${this.poppedValue} from the top
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
    After successfully popping from the stack, we have received back the value ${this.poppedValue} from
    the stack.
  </p>
    `;
  }

}
