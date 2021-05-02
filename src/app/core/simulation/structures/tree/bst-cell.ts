import {SimulationNodeDatum} from 'd3-force';
import {SimulationNode} from '../../basics/simulation-node';
import {SimulationArray} from '../array/simulation-array';
import {BinarySearchTree} from './binary-search-tree';
import {Binary} from '@angular/compiler';
import {SimulationLink} from '../../basics/simulation-link';

export class BstCell implements SimulationNodeDatum {
  radius = 50;

  descriptor?: string;
  isRoot = false;
  noCollision = false;
  isMouseOver = false;

  id: number | undefined;
  fx: number | null | undefined;
  fy: number | null | undefined;
  vx: number | undefined;
  vy: number | undefined;
  x: number | undefined;
  y: number | undefined;
  cx: number | undefined;
  cy: number | undefined;
  graphX: number | undefined;
  graphY: number | undefined;

  node?: SimulationNode;
  hoveringNode?: SimulationNode;
  tree: BinarySearchTree;

  constructor(tree: BinarySearchTree, id: number, x: number, y: number, descriptor?: string) {
    this.tree = tree;
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

  setNode(d: SimulationNode): void {
    this.node = d;
    this.node.fx = this.x;
    this.node.fy = this.y;
    this.node.pointerEvents = false;
    this.node.nodeOrder = 2;
  }

  removeNode(): SimulationNode {
    const d = this.node;
    this.node = undefined;
    d.fx = undefined;
    d.fy = undefined;
    d.pointerEvents = true;
    d.nodeOrder = 1;
    return d;
  }
}
