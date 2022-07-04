import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';
import {ArrayCell} from '../../../app/core/simulation/structures/array/array-cell';
import {SimulationNode} from '../../../app/core/simulation/basics/simulation-node';
import {SimulationStack} from '../../../app/core/simulation/structures/array/simulation-stack';

export class Push implements Scene {
  id = 1;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set: boolean;
  setupPath: string;

  stack: SimulationStack;
  index = -1;
  elements = '';
  stackSize = -1;
  highlighedValue = -1;
  newElement = 23.11;

  async setup(simulation: Simulation): Promise<void> {
    const nodes = simulation.nodeHandler.generateNodes(6);
    simulation.nodeHandler.add(nodes);
    this.stack = simulation.objectFactory.create('stack', 0, 0, 10) as SimulationStack;
    simulation.arrayHandler.add(this.stack);

    for (const node of nodes) {
      await this.stack.push(node, false);
    }
    this.stack.descriptor = 'stack';
    this.stackSize = !!this.stack ? this.stack.size : 10;
    this.elements = this.stack.data.slice(0, this.stack.size).map(c => c.node.value).join(', ');
    this.highlighedValue = this.stack.top.node.value;
  }

  async play(simulation: Simulation): Promise<void> {
    const node = new SimulationNode(this.newElement, -1, this.stack.x, this.stack.y - 200);
    simulation.nodeHandler.add(node);
    await this.stack.push(node);
  }

  content(): string {
    return `
  <h1 class="scene-title">Stack - Push operation</h1>
  <p>
    Take a look at that array on the right-hand side. That's our stack with elements ${this.elements}.
  </p>
  <p>
    There are ${this.stackSize} elements in the stack.
    The highlighted element ${this.highlighedValue} is the <em>top element</em> of the stack.
  </p>
  <p>
    The first operation we're going to look into is <b>push</b> operation. That simply
    means appending an element to the end of this array.
  </p>
  <p>
    Let's see how elements are pushed to this stack by pushing ${this.newElement}.
  </p>
  `;
  }

  successContent(): string {
    return `
  <p>
    After successfully pushing ${this.newElement} to the stack, the <em>top</em> is now at the top of the stack.
  </p>
  <small>
    If the stack were full, the push operation would lead to a condition called <em>stack overflow</em>.
  </small>
    `;
  }

}
