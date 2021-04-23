import {Selection} from 'd3-selection';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';

export class SimulationArray {

  size: number;
  cellWidth: number;
  cellHeight: number;
  data: ArrayCell[];
  x: number;
  y: number;
  z: number;
  color: string;
  isStatic: boolean;
  descriptor: string;
  name: string;
  container?: Selection<any, any, any, any>;

  constructor(size: number, descriptor: string, x: number, y: number, name = 'Array'){
    this.size = size;
    this.cellWidth = 100;
    this.cellWidth = 100;
    this.data = [];
    this.x = x - (size * this.cellWidth) / 2;
    this.y = y - (this.cellHeight / 2);
    this.z = -2;
    this.color = 'gainsboro';
    this.isStatic = false;
    // this.makeGrid()
    this.descriptor = descriptor;
    this.name = name;
  }

  setTransform(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.container.attr('transform', 'translate(' + (this.x) + ',' + this.y + ')'); // set start position
    // this.data.filter((d: ArrayCell) => !!d.node).forEach((d: ArrayCell) => {
    //   d.node.fx = this.x + d.x + d.wi / 2
    //   d.node.fy = d.height / 2 + temp.y
    // })
  }
}
