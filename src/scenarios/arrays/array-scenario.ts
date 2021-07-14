import {Scenario} from '../../app/core/simulation/scenario';
import {StartScene} from './start/start';
import {SearchScene} from './search/search';

const arrayScenario = new Scenario('Array', 'Finding, inserting, and deleting elements of an array');

arrayScenario.scenes = [
  StartScene,
  SearchScene,
];

export default arrayScenario;
