import {Sort} from './sort';
import {SimulationArray} from './simulation-array';

export class InsertionSort implements Sort {
  async sort(arr: SimulationArray): Promise<void> {
    arr.data[0].highlight('#98dc73');

    for (let i = 1; i < arr.size; ++i) {
      const node = arr.data[i].removeNode();
      node.setTarget(arr.data[i].absoluteX, arr.data[i].absoluteY - 150);

      await new Promise(r => setTimeout(r, 1200));

      let j = i - 1;
      while (j >= 0) {
        arr.data[j].highlight('#fdd828');
        await new Promise(r => setTimeout(r, 1200));
        node.setTarget(arr.data[j].absoluteX, arr.data[j].absoluteY - 150);
        arr.data[j].highlight('#98dc73');
        if (node.value >= arr.data[j].node.value) {
          break;
        }
        await arr.moveNode(arr.data[j], arr.data[j + 1]);
        --j;
      }
      node.setTarget(arr.data[j + 1].absoluteX, arr.data[j + 1].absoluteY);
      await new Promise(r => setTimeout(r, 1200));
      arr.data[j + 1].addNode(node);
      arr.data[i].highlight('#98dc73');
    }
  }

}
