import {Selection} from 'd3-selection';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';

export class SimulationArray {

  cellWidth = 100;
  cellHeight = 100;

  id: number;
  size: number;
  data: ArrayCell[];
  x: number;
  y: number;
  z: number;
  color: string;
  isStatic: boolean;
  descriptor: string;

  constructor(id: number, size: number, x: number, y: number, descriptor?: string){
    this.id = id;
    this.cellWidth = 100;
    this.cellWidth = 100;
    this.data = [];
    this.x = x - (size * this.cellWidth) / 2;
    this.y = y - (this.cellHeight / 2);
    this.z = -2;
    this.color = 'black';
    this.isStatic = false;
    this.descriptor = descriptor ?? `array${id}`;
    this.setSize(size);
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

  setSize(size: number): void {
    this.size = size;

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

  async linearFindElement(value: number): Promise<void> {
    for (let i = 0; i < this.size; ++i) {
      const cell = this.data[i];
      if (!cell.node) {
        continue;
      }

      cell.node.drawArrow = true;
      cell.node.isValueVisible = true;

      // // this.simulation.repaint();

      await new Promise(r => setTimeout(r, 600));

      cell.node.drawArrow = false;

      if (cell.node.value === value) {
        cell.node.highlighted = true;
        // this.simulation./repaint();
        await new Promise(r => setTimeout(r, 1000));
        cell.node.highlighted = false;
        return;
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

    this.move(index, false);

    return node;

  }

  async insertAt(node: SimulationNode, index: number): Promise<void> {
    if (index >= this.data.length) {
      throw new Error('Incorrect index');
    }

    await this.move(index, true);

    node.cx = this.data[index].x + this.x + this.cellWidth / 2;
    node.cy = this.data[index].y + this.y + this.cellHeight / 2;

    await new Promise(r => setTimeout(r, 600));
    this.data[index].addNode(node);
    await new Promise(r => setTimeout(r, 300));
  }

  async move(index: number, forward: boolean): Promise<void> {
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
      await new Promise(r => setTimeout(r, 600));
      this.data[i + step].addNode(node);
      await new Promise(r => setTimeout(r, 300));    }

  }
}
