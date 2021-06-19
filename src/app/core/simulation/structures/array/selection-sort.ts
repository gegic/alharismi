import {Sort} from './sort';
import {SimulationArray} from './simulation-array';

export class SelectionSort implements Sort {
  async sort(arr: SimulationArray): Promise<void> {


    for (let i = 0; i < arr.size; ++i) {
      let minIndex = i;
      arr.data[minIndex].highlight('#08ff00');
      await new Promise(r => setTimeout(r, 600));

      for (let j = i + 1; j < arr.size; ++j) {
        arr.data[j].highlight('#fdd828');
        await new Promise(r => setTimeout(r, 600));
        arr.data[j].resetColor();
        if (arr.data[j].node.value < arr.data[minIndex].node.value) {
          arr.data[minIndex].resetColor();
          minIndex = j;
          arr.data[minIndex].highlight('#08ff00');
          await new Promise(r => setTimeout(r, 600));
        }
      }

      arr.data[minIndex].resetColor();
      if (i !== minIndex) {
        await arr.swapNodes(arr.data[i], arr.data[minIndex]);
      }

      arr.data[i].highlight('#98dc73');
    }
  }

}
