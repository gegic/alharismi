import {Scenario} from '../../app/core/simulation/scenario';
import {LinkedListScene} from './scenes/linked-list-scene';
import {Prepend} from './scenes/prepend';
import {Append} from './scenes/append';
import {Insertion} from './scenes/insertion';
import {PopFirst} from './scenes/pop-first';
import {PopLast} from './scenes/pop-last';

const linkedListScenario = new Scenario('Linked lists', 'linked-list', 'Operations on singly and doubly linked lists');

linkedListScenario.scenes = [
  LinkedListScene,
  Prepend,
  Append,
  Insertion,
  PopFirst,
  PopLast
];

export default linkedListScenario;
