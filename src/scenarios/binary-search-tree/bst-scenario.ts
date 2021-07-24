import {Scenario} from '../../app/core/simulation/scenario';
import {BstScene} from './scenes/bst-scene';
import {Search} from './scenes/search';
import {Imbalance} from './scenes/imbalance';
import {Insertion} from './scenes/insertion';
import {DeletionNoChildren} from './scenes/deletion-no-children';
import {DeletionOneChild} from './scenes/deletion-one-child';
import {DeletionTwoChildren} from './scenes/deletion-two-children';

const bstScenario = new Scenario('Binary search tree', 'binary-search-tree',
  'Insertion, deletion and searching in a binary search tree');

bstScenario.scenes = [
  BstScene,
  Search,
  Imbalance,
  Insertion,
  DeletionNoChildren,
  DeletionOneChild,
  DeletionTwoChildren
];

export default bstScenario;
