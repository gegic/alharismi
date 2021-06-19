import {Sort} from './sort';
import {SimulationArray} from './simulation-array';
import {ArrayCell} from './array-cell';

export class QuickSort implements Sort {
  async sort(arr: SimulationArray): Promise<void> {
    await this.quickSort(arr, arr.data.slice(0, arr.size), 0, arr.size - 1);
  }

  async quickSort(arr: SimulationArray, data: ArrayCell[], low: number, high: number): Promise<void> {
    if (low < high) {
      data.slice(low, high + 1).forEach(c => c.highlight('#ff6257'));
      await new Promise(r => setTimeout(r, 1200));
      data.slice(low, high + 1).forEach(c => c.resetColor());
      await new Promise(r => setTimeout(r, 600));

      const pivot = await this.partition(arr, data, low, high);

      await this.quickSort(arr, data, low, pivot - 1);
      await this.quickSort(arr, data, pivot, high);
    }
  }

  async partition(arr: SimulationArray, data: ArrayCell[], low: number, high: number): Promise<number> {
    const pivot = data[high];
    const pivotNode = pivot.removeNode();
    pivotNode.setTarget(pivot.absoluteX, pivot.absoluteY + 100);
    pivot.highlight('#ff8441');
    await new Promise(r => setTimeout(r, 600));

    let i = low - 1;

    for (let j = low; j < high; ++j) {
      data[j].highlight('#fdd828');
      await new Promise(r => setTimeout(r, 600));
      if (data[j].node.value <= pivotNode.value) {
        if (i >= 0) {
          data[i].resetColor();
        }
        ++i;
        data[i].highlight('#41d9ff');
        await new Promise(r => setTimeout(r, 600));
        if (i !== j) {
          await arr.swapNodes(data[i], data[j]);
        }
      }
      if (i !== j) {
        data[j].resetColor();
      } else {
        data[j].highlight('#41d9ff');
      }
    }
    if (i >= 0) {
      data[i].resetColor();
    }
    pivot.resetColor();
    if (i + 1 !== high) {
      await arr.moveNode(data[i + 1], data[high]);
    }
    pivotNode.setTarget(data[i + 1].absoluteX, data[i + 1].absoluteY);
    await new Promise(r => setTimeout(r, 600));
    data[i + 1].addNode(pivotNode);
    return i + 1;
  }
  /*
    # Quick sort in Python

    # function to find the partition position
    def partition(array, low, high):

      # choose the rightmost element as pivot
      pivot = array[high]

      # pointer for greater element
      i = low - 1

      # traverse through all elements
      # compare each element with pivot
      for j in range(low, high):
        if array[j] <= pivot:
          # if element smaller than pivot is found
          # swap it with the greater element pointed by i
          i = i + 1

          # swapping element at i with element at j
          (array[i], array[j]) = (array[j], array[i])

      # swap the pivot element with the greater element specified by i
      (array[i + 1], array[high]) = (array[high], array[i + 1])

      # return the position from where partition is done
      return i + 1

    # function to perform quicksort
    def quickSort(array, low, high):
      if low < high:

        # find pivot element such that
        # element smaller than pivot are on the left
        # element greater than pivot are on the right
        pi = partition(array, low, high)

        # recursive call on the left of pivot
        quickSort(array, low, pi - 1)

        # recursive call on the right of pivot
        quickSort(array, pi + 1, high)


   */
}
