import {Scenario} from '../../../app/core/simulation/scenario';
import {Scene} from '../../../app/core/simulation/scene';
import {Simulation} from '../../../app/core/simulation/simulation';
import {SimulationArray} from '../../../app/core/simulation/structures/array/simulation-array';

export class Queue implements Scene {
  id = 3;
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
  <h1 class="scene-title">Queue</h1>
  <p>
    Let's talk about <b>queues</b>.
  </p>
  <p>
    A queue is a data structure that follows the principle of First-In-First-Out (FIFO).
    This means the first element inserted inside the queue is removed first.
  </p>
  <p>
    A queue can be imagined as a train going through a tunnel. The first car that
    entered the tunnel is going to be the first one to exit it.
  </p>
  <p>
    In order to see a train car from the middle of the train exit the tunnel, it is necessary
    to observe all the cars that entered the tunnel prior to the target car.
  </p>
  <p>
    In this section, we'll see how queues can be implemented using arrays.
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
