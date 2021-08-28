import {Selection} from 'd3-selection';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';
import {SimulationNodeDatum} from 'd3-force';
import {Sort} from './sort';
import {Drawable} from '../../drawable';

export class SimulationArray implements SimulationNodeDatum, Drawable{

  cellWidth = 100;
  cellHeight = 100;

  id: number;
  capacity: number;
  size = 0;
  data: ArrayCell[];
  x: number;
  y: number;
  z: number;
  color: string;
  descriptor: string;
  sorting?: Sort;
  sorted = false;
  busy = false;

  constructor(id: number, x: number, y: number, descriptor?: string) {
    this.id = id;
    this.cellWidth = 100;
    this.cellWidth = 100;
    this.data = [];
    this.z = -2;
    this.color = 'black';
    this.x = x;
    this.y = y;
    this.descriptor = descriptor ?? `array${id}`;
  }

  add(nodes: SimulationNode[]): void {
    nodes.forEach((n, i) => this.data[i].addNode(n));
  }

  nodeAt(i: number): SimulationNode {
    if (i === this.data.length) {
      return null;
    }
    if (this.data[i].node) {
      return this.data[i].node;
    }
    else {
      return this.nodeAt(i + 1);
    }
  }

  setTransform(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.data.filter(d => d.node).forEach((d) => {
      d.node.move(this.x + d.x + d.width / 2, d.height / 2 + this.y);
    });
  }

  private makeGrid(count: number): void {
    let xpos = (this.cellWidth + this.cellWidth / 20) * this.data.length;

    const newSize = this.data.length + count;

    for (let column = this.data.length; column < newSize; column++) {
      this.data.push(new ArrayCell(this, xpos, 0, this.cellWidth, this.cellHeight, column));
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += this.cellWidth + this.cellWidth / 20; // and a little bit of margin
    }
  }

  setCapacity(size: number): void {
    this.capacity = size;
    if (size < this.data.length) {
      for (let i = size ; i < this.data.length; i++)
      {
        if (!this.data[i].node) {
          continue;
        }
        this.data[i].removeNode();
      }
      this.data = this.data.splice(0, size);
    }
    else {
      this.makeGrid(size - this.data.length);
    }
  }

  async linearSearch(value: number): Promise<void> {
    for (let i = 0; i < this.capacity; ++i) {
      const cell = this.data[i];
      if (!cell.node) {
        continue;
      }

      cell.highlight('#fdd828');
      await new Promise(r => setTimeout(r, 600));
      cell.resetColor();

      if (cell.node.value === value) {
        cell.highlight('#28fd5d');
        cell.node.highlighted = true;
        await new Promise(r => setTimeout(r, 1000));
        cell.resetColor();
        cell.node.highlighted = false;
        return;
      }
    }

    await new Promise(r => setTimeout(r, 300));
    throw new Error('Element not found');
  }

  async binarySearch(value: number): Promise<void> {
    if (!this.sorted) {
      throw new Error('Array is not sorted');
    }
    let low = 0;
    let high = this.size - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midCell = this.data[mid];
      const lowCell = this.data[low];
      const highCell = this.data[high];

      midCell.highlight('#fdd828');
      if (low !== high) {
        lowCell.highlight('#48fd28');
        highCell.highlight('#fd2828');
      }
      await new Promise(r => setTimeout(r, 1000));
      midCell.resetColor();
      lowCell.resetColor();
      highCell.resetColor();

      if (value === midCell.node.value) {
        midCell.highlight('#fdd828');
        midCell.node.highlighted = true;
        await new Promise(r => setTimeout(r, 1000));
        midCell.resetColor();
        midCell.node.highlighted = false;
        return;
      } else if (value > midCell.node.value) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    await new Promise(r => setTimeout(r, 300));
    throw new Error('Element not found');
  }

  async deleteAt(index: number): Promise<SimulationNode> {
    if (index >= this.data.length || !this.data[index].node) {
      throw new Error('Incorrect index');
    }

    const node = this.data[index].removeNode();

    node.setTarget(this.x - 100, this.y - 100);

    await this.move(index, false);
    return node;

  }

  async insertAt(node: SimulationNode, index: number, animate = true): Promise<void> {
    if (index >= this.data.length) {
      throw new Error('Incorrect index');
    }

    if (!!this.data[index].node) {
      await this.move(index, true, animate);
    }

    node.cx = this.data[index].x + this.x + this.cellWidth / 2;
    node.cy = this.data[index].y + this.y + this.cellHeight / 2;

    if (animate) {
      await new Promise(r => setTimeout(r, 600));
    }
    this.data[index].addNode(node);
    if (animate) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  async move(index: number, forward: boolean, animate = true): Promise<void> {
    let i = forward ? this.data.length - 1 : index + 1;
    const step = forward ? 1 : -1;

    while ((forward && i >= index) || (!forward && i < this.data.length)) {
      if (!this.data[i].node) {
        i -= step;
        continue;
      }

      const node = this.data[i].removeNode();

      if (i + step > this.data.length || i + step < 0) {
        continue;
      }

      node.cx = this.data[i + step].x + this.x + this.cellWidth / 2;
      node.cy = this.data[i + step].y + this.y + this.cellHeight / 2;
      if (animate) {
        await new Promise(r => setTimeout(r, 600));
      }
      this.data[i + step].addNode(node);
      if (animate) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

  }

  async removeEmptySpaces(): Promise<void> {
    for (let i = 0; i < this.size; ++i) {
      if (!this.data[i].node) {
        const currentCell = this.data[i];
        const takenCell = await this.findFirstTaken(i + 1);
        if (!takenCell) {
          return;
        }
        const node = takenCell.removeNode();
        node.setTarget(currentCell.absoluteX, currentCell.absoluteY - 100);
        await new Promise(r => setTimeout(r, 600));
        node.setTarget(currentCell.absoluteX, currentCell.absoluteY);
        await new Promise(r => setTimeout(r, 600));
        currentCell.addNode(node);
      }
    }
  }

  async findFirstTaken(index: number): Promise<ArrayCell | undefined> {
    for (index; index < this.capacity; ++index) {
      if (!!this.data[index].node) {
        this.data[index].highlight('#08ff00');
        await new Promise(r => setTimeout(r, 600));
        this.data[index].resetColor();
        return this.data[index];
      }
      this.data[index].highlight('#98dc73');
      await new Promise(r => setTimeout(r, 600));
      this.data[index].resetColor();
    }

    return undefined;
  }

  async sort(): Promise<void> {
    if (!this.sorting) {
      return;
    }
    await this.removeEmptySpaces();
    await this.sorting.sort(this);
    this.sorted = true;

    await new Promise(r => setTimeout(r, 1800));

    this.data.filter(d => !!d.node).forEach(d => d.resetColor());
  }

  async swapNodes(source: ArrayCell, destination: ArrayCell): Promise<void> {
    if (!source.node || !destination.node) {
      return;
    }
    const sourceNode = source.removeNode();
    const dstNode = destination.removeNode();

    const middleX = (destination.absoluteX + source.absoluteX) / 2;

    sourceNode.setTarget(middleX, destination.absoluteY - 75);
    dstNode.setTarget(middleX, source.absoluteY + 75);
    await new Promise(r => setTimeout(r, 600));

    sourceNode.setTarget(destination.absoluteX, destination.absoluteY);
    dstNode.setTarget(source.absoluteX, source.absoluteY);
    await new Promise(r => setTimeout(r, 600));

    source.addNode(dstNode);
    destination.addNode(sourceNode);
  }

  async moveNode(source: ArrayCell, destination: ArrayCell): Promise<void> {
    if (!source.node || !!destination.node) {
      return;
    }

    const middleX = (destination.absoluteX + source.absoluteX) / 2;

    const sourceNode = source.removeNode();
    sourceNode.setTarget(middleX, destination.absoluteY - 100);
    await new Promise(r => setTimeout(r, 600));
    sourceNode.setTarget(destination.absoluteX, destination.absoluteY);
    await new Promise(r => setTimeout(r, 600));

    destination.addNode(sourceNode);
  }
}
