import {SimulationArray} from './simulation-array';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';

export class SimulationStack extends SimulationArray {

  top: ArrayCell | null;

  constructor(id: number, x: number, y: number, descriptor?: string) {
    super(id, x, y, descriptor);
  }

  async push(node: SimulationNode, animate = true): Promise<void> {
    if (this.capacity === this.size) {
      throw new Error('Stack overflow');
    }

    await this.insertAt(node, this.size, animate);
    await this.setTop(animate);
  }

  async pop(animate = true): Promise<void> {
    if (this.size === 0) {
      throw new Error('No elements in the stack');
    }

    await this.deleteAt(this.size - 1);
    await this.setTop(animate);
  }

  async setTop(animate = true): Promise<void> {
    if (!!this.top) {
      this.top.resetColor();
    }
    if (this.size - 1 < 0) {
      return;
    }
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
    this.top = this.data[this.size - 1];
    this.top.highlight('#fdd828');
  }
}
