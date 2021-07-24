import {Scenario} from '../../app/core/simulation/scenario';
import {RedBlack} from './scenes/red-black';
import {InsertionFirstCase} from './scenes/insertion-first-case';
import {InsertionSecondCase} from './scenes/insertion-second-case';
import {InsertionThirdCase} from './scenes/insertion-third-case';
import {DeletionFirstCase} from './scenes/deletion-first-case';
import {DeletionSecondCase} from './scenes/deletion-second-case';
import {DeletionThirdCase} from './scenes/deletion-third-case';

const rbScenario = new Scenario('Red-black tree', 'rb-avl',
  'Insertion, deletion and searching in a Red-black tree ');

rbScenario.scenes = [
  RedBlack,
  InsertionFirstCase,
  InsertionSecondCase,
  InsertionThirdCase,
  DeletionFirstCase,
  DeletionSecondCase,
  DeletionThirdCase
];

export default rbScenario;
