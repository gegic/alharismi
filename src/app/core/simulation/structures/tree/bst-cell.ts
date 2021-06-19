import {SimulationNodeDatum} from 'd3-force';
import {SimulationNode} from '../../basics/simulation-node';
import {SimulationArray} from '../array/simulation-array';
import {BinarySearchTree} from './binary-tree/binary-search-tree/binary-search-tree';
import {Binary} from '@angular/compiler';
import {SimulationLink} from '../../basics/simulation-link';
import {SimulationGraph} from './simulation-graph';

export class BstCell implements SimulationNodeDatum {
  radius = 50;

  defaultColor = '#E2E8CE';
  color = '#E2E8CE';
  descriptor?: string;
  isRoot = false;
  noCollision = false;
  isMouseOver = false;
  isValid = true;

  id: number | undefined;
  fx: number | null | undefined;
  fy: number | null | undefined;
  vx: number | undefined;
  vy: number | undefined;
  _x: number | undefined;
  _y: number | undefined;
  cx: number | undefined;
  cy: number | undefined;
  graphX: number | undefined;
  graphY: number | undefined;

  node?: SimulationNode;
  hoveringNode?: SimulationNode;
  graph: SimulationGraph;

  constructor(tree: SimulationGraph, id: number, x: number, y: number, descriptor?: string) {
    this.graph = tree;
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
    this.graphX = x;
    this.graphY = y;
    this.id = id;
    this.descriptor = descriptor;
  }

  setTarget(x: number, y: number): void {
    this.cx = x;
    this.cy = y;
  }

  graphMoved(x: number, y: number): void {
    this.setTarget(x, y);
    this.graphX = x;
    this.graphY = y;
  }

  fixedMove(x: number, y: number): void {
    this.fx = x;
    this.fy = y;
  }

  setNode(d: SimulationNode): void {
    this.node = d;
    this.node.fx = this.x;
    this.node.fy = this.y;
    this.node.noCollision = true;
    this.node.pointerEvents = false;
    this.node.nodeOrder = 2;
  }

  removeNode(): SimulationNode {
    const d = this.node;
    if (!d) {
      return null;
    }
    this.node = undefined;
    d.fx = undefined;
    d.fy = undefined;
    d.noCollision = false;
    d.pointerEvents = true;
    d.hoveringPlaceholder = undefined;
    d.lockedPlaceholder = undefined;
    d.nodeOrder = 1;
    return d;
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

  get x(): number {
    return this._x;
  }

  set x(val: number) {
    this._x = val;
    if (this.node) {
      this.node.x = val;
    }
  }

  get y(): number {
    return this._y;
  }

  set y(val: number) {
    this._y = val;
    if (this.node) {
      this.node.y = val;
    }
  }
}
