import {SimulationArray} from './simulation-array';
import {ArrayCell} from './array-cell';
import {SimulationNode} from '../../basics/simulation-node';

export class SimulationQueue extends SimulationArray {
  left: ArrayCell | undefined;
  right: ArrayCell | undefined;

  async enqueue(node: SimulationNode, animate = true): Promise<void> {
    if (this.capacity === this.size) {
      throw new Error('Queue is full');
    }
    let insertPosition: number;
    if (this.right) {
      insertPosition = (this.right.id + 1) % this.capacity;
    } else {
      insertPosition = 0;
    }

    await this.insertAt(node, insertPosition, animate);
    await this.setRight(insertPosition, animate);
    if (!this.left) {
      await this.setLeft(insertPosition, animate);
    }
  }

  async setRight(position: number, animate = true): Promise<void> {
    if (!!this.right && this.right !== this.left) {
      this.right.resetColor();
    } else if (!!this.right) {
      this.right.highlight('#a0ff6f');
    }
    if (this.size - 1 < 0) {
      return;
    }
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
    this.right = this.data[position];
    this.right.highlight('#ff9494');
  }

  async dequeue(animate = true): Promise<void> {
    if (this.size === 0) {
      throw new Error('Queue is empty');
    }

    const node = this.left.removeNode();
    --this.size;
    node.setTarget(this.x, this.y - 200);
    const newPosition = (this.left.id + 1) % this.capacity;

    await this.setLeft(newPosition, animate);
  }

  async setLeft(position: number, animate = true): Promise<void> {
    if (!!this.left) {
      this.left.resetColor();
    }
    if (this.size - 1 < 0) {
      return;
    }
    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
    this.left = this.data[position];
    this.left.highlight('#a0ff6f');
  }
}
