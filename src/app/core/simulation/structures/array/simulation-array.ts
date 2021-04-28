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
    this.size = size;
    this.cellWidth = 100;
    this.cellWidth = 100;
    this.data = [];
    this.x = x - (size * this.cellWidth) / 2;
    this.y = y - (this.cellHeight / 2);
    this.z = -2;
    this.color = 'gainsboro';
    this.isStatic = false;
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
      d.node.fx = this.x + d.x + d.width / 2;
      d.node.fy = d.height / 2 + this.y;
    });
  }

  makeGrid(count: number): void {
    let xpos = (this.cellWidth + this.cellWidth / 20) * this.data.length;

    const newSize = this.data.length + count;

    for (let column = this.data.length; column < newSize; column++) {
      this.data.push(new ArrayCell(this, xpos, 0, this.cellWidth, this.cellHeight, column));
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += this.cellWidth + this.cellWidth / 20; // and a little bit of margin
    }
  }

  setLength(length: number): void {
    this.size = length;

    if (length < this.data.length) {
      for (let i = length ; i < this.data.length; i++)
      {
        if (!this.data[i].node) {
          continue;
        }
        const c = this.data[i].node;
        c.fx = null;
        c.fy = null;
      }
      this.data = this.data.splice(0, length);
    }
    else {
      this.makeGrid(length - this.data.length);
    }
  }
}
