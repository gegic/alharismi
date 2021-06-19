import {Sort} from './sort';
import {SimulationArray} from './simulation-array';
import {ArrayCell} from './array-cell';

export class MergeSort implements Sort {
  async sort(arr: SimulationArray): Promise<void> {
    await this.mergeSort(arr, arr.data.slice(0, arr.size));
  }

  async mergeSort(arr: SimulationArray, data: ArrayCell[]): Promise<void> {
    if (data.length > 1) {
      const mid = Math.floor(data.length / 2);

      data.forEach(c => c.highlight('#fd8b28'));
      await new Promise(r => setTimeout(r, 1200));
      data.forEach(c => c.resetColor());
      await new Promise(r => setTimeout(r, 600));

      const left = data.slice(0, mid);
      const right = data.slice(mid);

      await this.mergeSort(arr, left);
      await this.mergeSort(arr, right);

      let i = 0;
      let j = 0;
      let k = 0;

      left.forEach(c => c.highlight('#fde828'));
      // left.forEach(c => c.resetColor());

      right.forEach(c => c.highlight('#ff5858'));
      // await new Promise(r => setTimeout(r, 1200));
      // right.forEach(c => c.resetColor());

      const leftNodes = left.map(lCell => {
        const node = lCell.removeNode();
        node.setTarget(lCell.absoluteX - 50, lCell.absoluteY + 100);
        return node;
      });

      const rightNodes = right.map(rCell => {
        const node = rCell.removeNode();
        node.setTarget(rCell.absoluteX + 50, rCell.absoluteY + 100);
        return node;
      });
      await new Promise(r => setTimeout(r, 1200));

      while (i < leftNodes.length && j < rightNodes.length) {
        if (leftNodes[i].value < rightNodes[j].value) {
          leftNodes[i].setTarget(data[k].absoluteX, data[k].absoluteY);
          data[k].highlight('#98dc73');
          await new Promise(r => setTimeout(r, 1200));
          data[k].addNode(leftNodes[i]);
          ++i;
        } else {
          rightNodes[j].setTarget(data[k].absoluteX, data[k].absoluteY);
          data[k].highlight('#98dc73');
          await new Promise(r => setTimeout(r, 1200));
          data[k].addNode(rightNodes[j]);
          ++j;
        }
        ++k;
      }

      while (i < left.length) {
        leftNodes[i].setTarget(data[k].absoluteX, data[k].absoluteY);
        data[k].highlight('#98dc73');
        await new Promise(r => setTimeout(r, 1200));
        data[k].addNode(leftNodes[i]);
        ++i;
        ++k;
      }

      while (j < right.length) {
        rightNodes[j].setTarget(data[k].absoluteX, data[k].absoluteY);
        data[k].highlight('#98dc73');
        await new Promise(r => setTimeout(r, 1200));
        data[k].addNode(rightNodes[j]);
        ++j;
        ++k;
      }
    }
  }

}
