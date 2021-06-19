import {Sort} from './sort';
import {SimulationArray} from './simulation-array';

export class BubbleSort implements Sort {
  async sort(arr: SimulationArray): Promise<void> {

      for (let i = 0; i < arr.size; ++i) {
        for (let j = 0; j < arr.size - i - 1; ++j) {
          arr.data[j].highlight('#fdd828');
          arr.data[j + 1].highlight('#fdd828');
          await new Promise(r => setTimeout(r, 600));
          arr.data[j].resetColor();
          arr.data[j + 1].resetColor();
          if (arr.data[j].node.value > arr.data[j + 1].node.value) {
            await arr.swapNodes(arr.data[j], arr.data[j + 1]);
          }
        }

        arr.data[arr.size - i - 1].highlight('#98dc73');
      }

  }
    /*

    # loop to access each array element
    for i in range(len(array)):

      # loop to compare array elements
      for j in range(0, len(array) - i - 1):

        # compare two adjacent elements
        # change > to < to sort in descending order
        if array[j] > array[j + 1]:

          # swapping elements if elements
          # are not in the intended order
          temp = array[j]
          array[j] = array[j+1]
          array[j+1] = temp

     */

}
