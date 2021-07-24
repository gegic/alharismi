import {Scenario} from '../../app/core/simulation/scenario';
import {StartScene} from './scenes/start';
import {Bubble} from './scenes/bubble';
import {Insertion} from './scenes/insertion';
import {Selection} from './scenes/selection';
import {Merge} from './scenes/merge';
import {Quick} from './scenes/quick';

const sortScenario = new Scenario('Sort', 'sort', 'Bubble, insertion, selection, merge and quick sort.');

sortScenario.scenes = [
  StartScene,
  Bubble,
  Insertion,
  Selection,
  Merge,
  Quick
];

export default sortScenario;
