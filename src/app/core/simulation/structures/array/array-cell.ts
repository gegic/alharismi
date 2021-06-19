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
  defaultColor = '#E2E8CE';
  color = '#E2E8CE';
  rx = 25;
  ry = 25;

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
    this.parent.sorted = false;
    this.parent.size++;
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
    this.parent.sorted = false;
    this.parent.size--;
    return node;
  }

  toString(): string {
    return `[${this.id}]`;
  }

  setDefaultColor(color: string): void {
    this.defaultColor = color;
  }

  highlight(color: string): void {
    this.color = color;
  }

  resetColor(): string {
    this.color = this.defaultColor;
    return this.color;
  }

  get absoluteX(): number {
    return this.parent.x + this.x + this.width / 2;
  }

  get absoluteY(): number {
    return this.parent.y + this.y + this.height / 2;
  }
}
