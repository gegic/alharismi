import {Scenario} from '../../app/core/simulation/scenario';
import {TreeScene} from './scenes/tree-scene';
import {Insertion} from './scenes/insertion';
import {Deletion} from './scenes/deletion';
import {HeapScene} from './scenes/heap-scene';
import {FindMin} from './scenes/find-min';

const heapScenario = new Scenario('Heap', 'heap', 'Extracting the minimum value, insertion and deletion.');
heapScenario.cover = 'scenarios/heap/cover.png';

heapScenario.scenes = [
  TreeScene,
  HeapScene,
  FindMin,
  Insertion,
  Deletion
];

export default heapScenario;
