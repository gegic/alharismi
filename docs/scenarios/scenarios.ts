import {Scenario} from '../app/core/simulation/scenario';
import arrayScenario from './arrays/array-scenario';
import stackQueueScenario from './stack-queue/stack-queue-scenario';
import linkedListScenario from './linked-list/linked-list-scenario';
import heapScenario from './heap/heap-scenario';
import bstScenario from './binary-search-tree/bst-scenario';
import rbScenario from './rb-tree/rb-scenario';
import sortScenario from './sort/sort-scenario';

export const scenarios: Scenario[] = [
  arrayScenario,
  linkedListScenario,
  stackQueueScenario,
  sortScenario,
  heapScenario,
  bstScenario,
  rbScenario
];
