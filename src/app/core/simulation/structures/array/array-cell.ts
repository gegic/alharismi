import {SimulationNode} from '../../basics/simulation-node';

export class ArrayCell {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  color: string;
  node?: SimulationNode;

  constructor(x: number, y: number, width: number, height: number, index: number) {
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
    node.lockedGrid = this;
  }

  removeNode(): SimulationNode | null {
    if (!this.node) {
      return null;
    }
    const node = this.node;
    node.lockedGrid = undefined;
    this.node = undefined;
    return node;
  }
}
