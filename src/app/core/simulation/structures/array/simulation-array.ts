import {Selection} from 'd3-selection';
import {SimulationNode} from '../../basics/simulation-node';
import {ArrayCell} from './array-cell';

export class SimulationArray {

  id: number;
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

  constructor(id: number, size: number, descriptor: string, x: number, y: number, name = 'Array'){
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
    // this.makeGrid()
    this.descriptor = descriptor;
    this.name = name;
  }

  delete(): void {
    if (this.container) {
      this.container.transition().duration(500).style('opacity', 0).remove();
    }
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
    this.container.attr('transform', 'translate(' + (this.x) + ',' + this.y + ')'); // set start position
    this.data.filter((d: ArrayCell) => !!d.node).forEach((d: ArrayCell) => {
      d.node.fx = this.x + d.x + d.width / 2;
      d.node.fy = d.height / 2 + this.y;
    });
  }
}
