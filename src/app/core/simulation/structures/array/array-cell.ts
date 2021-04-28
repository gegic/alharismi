import {SimulationNode} from '../../basics/simulation-node';
import {SimulationArray} from './simulation-array';

export class ArrayCell {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  color: string;
  node?: SimulationNode;
  hoveringNode?: SimulationNode;
  parent: SimulationArray;

  constructor(parent: SimulationArray, x: number, y: number, width: number, height: number, index: number) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.index = index;
    this.color = 'gainsboro';
  }

  isMouseOver = false;

  addNode(node: SimulationNode): void {
    this.node = node;
    this.hoveringNode = node;
    node.lockedGrid = this;
    node.hoveringGrid = this;
    node.fx = this.parent.x + this.x + this.width / 2;
    node.fy = this.height / 2 + this.parent.y;
  }

  removeNode(): SimulationNode | null {
    if (!this.node) {
      return null;
    }
    const node = this.node;
    node.lockedGrid = undefined;
    node.hoveringGrid = undefined;
    this.node = undefined;
    this.hoveringNode = undefined;
    node.fx = undefined;
    node.fy = undefined;
    return node;
  }

  toString(): string {
    return `${parent.name}[${this.index}]`;
  }

}
