import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';

export class Stack implements Scene {
  id = 0;
  isFirst: boolean;
  isLast: boolean;
  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'unplayable';
  set: boolean;
  setupPath: string;

  setup(simulation: Simulation): void {
  }

  play(simulation: Simulation): void {
  }

  content(): string {
    return `
  <h1 class="scene-title">Stack</h1>
  <p>
    Let's talk about <b>stacks</b>.
  </p>
  <p>
    A stack is a data structure that follows the principle of Last-In-First-Out (LIFO).
    This means the last element inserted inside the stack is removed first.
  </p>
  <p>
    A stack can be imagined as a pile of CDs. A new CD may be put on top of the pile, and
    thus it is the first one to be picked up later.
  </p>
  <p>
    In order to access a CD from the middle of the CD stack, it is necessary
    to pick all other discs that are placed over our target CD.
  </p>
  <p>
    In this section, we'll see how stacks can be implemented using arrays.
  </p>
  <p>
    Let's get started :)
  </p>
  `;
  }

  successContent(): string {
    return '';
  }

}
