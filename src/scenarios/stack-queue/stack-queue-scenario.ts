import {Scenario} from '../../app/core/simulation/scenario';
import {Stack} from './scenes/stack';
import {Push} from './scenes/push';
import {Pop} from './scenes/pop';
import {Enqueue} from './scenes/enqueue';
import {Queue} from './scenes/queue';
import {Dequeue} from './scenes/dequeue';
import {CircularQueue} from './scenes/circular-queue';

const stackQueueScenario = new Scenario('Stack and queue', 'stack-queue', 'Array implementations of stack and queue.');
stackQueueScenario.cover = 'scenarios/stack-queue/cover.png';
stackQueueScenario.scenes = [
  Stack,
  Push,
  Pop,
  Queue,
  Enqueue,
  Dequeue,
  CircularQueue
];

export default stackQueueScenario;
