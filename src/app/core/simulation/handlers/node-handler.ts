import {SimulationNode} from '../basics/simulation-node';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {SimulationArray} from '../structures/array/simulation-array';
import {ArrayCell} from '../structures/array/array-cell';
import {PositionHelper} from '../helpers/position-helper';
import {ColorHelper} from '../helpers/color-helper';
import {DrawableHandler} from './drawable-handler';
import {SimulationHandler} from './simulation-handler';
import contextMenu, {MenuItem} from 'd3-context-menu';
import {NodeDrawing} from '../behaviors/drawing/node-drawing';
import {NodeMouse} from '../behaviors/mouse/node-mouse';
import {NodeContextMenu} from '../behaviors/context-menu/node-context-menu';
import {NodeDrag} from '../behaviors/drag/node-drag';

export class NodeHandler implements DrawableHandler {

  positionHelper: PositionHelper;
  colorHelper: ColorHelper;
  simulationHandler: SimulationHandler;

  maxId = 0;
  decimalDigits = 0;

  nodes: SimulationNode[] = [];
  invisibleNodes: SimulationNode[] = [];

  canvas: Selection<any, any, any, any>;

  constructor(positionHelper: PositionHelper,
              colorHelper: ColorHelper,
              canvas: Selection<any, any, any, any>,
              simulationHandler: SimulationHandler) {
    this.positionHelper = positionHelper;
    this.colorHelper = colorHelper;
    this.canvas = canvas;
    this.simulationHandler = simulationHandler;
  }

  add(obj: undefined | SimulationNode | SimulationNode[]): SimulationNode | SimulationNode[] {
    let values: number[];
    if (Array.isArray(obj)) {
      values = obj.map(sn => sn.value);
      obj.forEach(d => this.nodes.push(d));
    } else {
      if (!obj) {
        obj = new SimulationNode(
          new NodeDrawing(),
          new NodeMouse(),
          new NodeDrag(this.simulationHandler),
          new NodeContextMenu(),
          this.generateRandomValue(),
          this.maxId++,
          0,
          0
        );
      }
      values = [obj.value];
      this.nodes.push(obj);
    }

    this.colorHelper.setColorScheme(values);
    return obj;
  }

  generateRandomValue(n = 100): number {
    return parseFloat((Math.random() * n - n / 2).toFixed(this.decimalDigits));
  }

  draw(): void {

    this.simulationHandler.simulation.nodes(this.nodes.concat(this.invisibleNodes));

    this.canvas
      .selectAll('.node')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(this.performEnter,
        this.performUpdate,
        this.performExit);
  }

  performEnter(enterElement: d3.Selection<d3.EnterElement, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    if (enterElement.data().length === 1) {

    }
    return undefined;
  }

  performUpdate(updateElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    if (updateElement.data().length > 0) {
      return updateElement.datum().update(updateElement);
    }
    return undefined;
  }

  performExit(exitElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    if (exitElement.data().length > 0) {
      return exitElement.datum().exit(exitElement);
    }
    return undefined;
  }

  remove(obj: SimulationNode | SimulationNode[]): void {
    if (Array.isArray(obj)) {
      obj.forEach(d => this.removeNode(d));
    } else {
      this.removeNode(obj);
    }
    this.draw();
  }

  private removeNode(n): void {
    const index = this.nodes.indexOf(n);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }

  getRandomNode(noRoot: boolean): SimulationNode {
    const randomNodes = this.nodes.filter(d => !d.isPlaceholder && !(d.children && !d.parent));
    return randomNodes[Math.floor(Math.random() * (randomNodes.length - 1))];
  }

  generateNodes(n: number, onClick: (nodeInfo: SimulationNode) => void): SimulationNode[] {
    const nodes: SimulationNode[] = [];
    for (let i = 0; i < n; ++i) {
      const rand = this.generateRandomValue();
      if (nodes.some(d => d.value === rand)) {
        continue;
      }
      const pos = this.positionHelper.createRandomPointOnCircumference([0, 0], 1);
      const node = new SimulationNode(
        new NodeDrawing(),
        new NodeMouse(),
        new NodeDrag(this.simulationHandler),
        new NodeContextMenu(),
        rand,
        this.maxId++,
        pos[0] + 0,
        pos[1] + 0
      );
      nodes.push(node);
    }
    nodes.forEach(c => {
      c.onClick = onClick;
    });
    return nodes;
  }
}
