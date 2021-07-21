import {Simulation} from './simulation';
import {play} from '../vis-grammar/vis-lexer';

export class Scene {
  id: number;
  setupPath: string;
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
