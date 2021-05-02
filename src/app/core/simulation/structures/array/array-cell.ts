import {SimulationNode} from '../../basics/simulation-node';
import {SimulationArray} from './simulation-array';

export class ArrayCell {
  x: number;
  y: number;
  width: number;
  height: number;
  id: number;
  node?: SimulationNode;
  hoveringNode?: SimulationNode;
  parent: SimulationArray;
  isMouseOver = false;

  constructor(parent: SimulationArray, x: number, y: number, width: number, height: number, id: number) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }

  addNode(node: SimulationNode): void {
    this.node = node;
    this.hoveringNode = node;
    node.lockedGrid = this;
    node.hoveringGrid = this;
    node.fx = this.parent.x + this.x + this.width / 2;
    node.fy = this.height / 2 + this.parent.y;
    node.pointerEvents = true;
    node.noCollision = true;
    node.nodeOrder = 2;
    node.x = this.parent.x + this.x + this.width / 2;
    node.y = this.height / 2 + this.parent.y;
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
    node.nodeOrder = 1;
    node.noCollision = false;
    return node;
  }

  toString(): string {
    return `${parent.name}[${this.id}]`;
  }

}
