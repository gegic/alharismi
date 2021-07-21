import {Scenario} from '../../app/core/simulation/scenario';
import {StartScene} from './scenes/start';
import {SearchScene} from './scenes/search';
import {UnsuccessfulSearch} from './scenes/unsuccessful-search';
import {InsertionEnd} from './scenes/insertion-end';
import {InsertionMiddle} from './scenes/insertion-middle';
import {InsertionBeginning} from './scenes/insertion-beginning';
import {DeletionEnd} from './scenes/deletion-end';
import {DeletionMiddle} from './scenes/deletion-middle';
import {DeletionBeginning} from './scenes/deletion-beginning';
import {SortedSearch} from './scenes/sorted-search';

const arrayScenario = new Scenario('Array', 'array', 'Search, insertion, and deletion of elements of an array.');

arrayScenario.scenes = [
  StartScene,
  SearchScene,
  UnsuccessfulSearch,
  InsertionEnd,
  InsertionMiddle,
  InsertionBeginning,
  DeletionEnd,
  DeletionMiddle,
  DeletionBeginning,
  SortedSearch
];

export default arrayScenario;
