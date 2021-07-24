import {Scenario} from '../../app/core/simulation/scenario';
import {LinkedListScene} from './scenes/linked-list-scene';
import {Prepend} from './scenes/prepend';
import {Append} from './scenes/append';
import {Insertion} from './scenes/insertion';
import {PopFirst} from './scenes/pop-first';
import {PopLast} from './scenes/pop-last';
import {Deletion} from './scenes/deletion';

const linkedListScenario = new Scenario('Linked list', 'linked-list', 'Prepending, appending, insertion and removing the elements');

linkedListScenario.scenes = [
  LinkedListScene,
  Prepend,
  Append,
  Insertion,
  PopFirst,
  PopLast,
  Deletion
];

export default linkedListScenario;
