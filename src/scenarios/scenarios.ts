import {Scenario} from '../app/core/simulation/scenario';
import arrayScenario from './arrays/array-scenario';
import stackQueueScenario from './stack-queue/stack-queue-scenario';
import linkedListScenario from './linked-list/linked-list-scenario';

export const scenarios: Scenario[] = [
  arrayScenario,
  stackQueueScenario,
  linkedListScenario
];
