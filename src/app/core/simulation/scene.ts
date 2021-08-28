import {Simulation} from './simulation';

export class Scene {
  id: number;
  isFirst: boolean;
  isLast: boolean;

  played: 'not_played' | 'playing' | 'played' | 'unplayable' = 'not_played';
  set = false;

  setup(simulation: Simulation): void {}
  play(simulation: Simulation): void {}
  content(): string {
    return '';
  }
  successContent(): string {
    return '';
  }
}
