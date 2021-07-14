import {SimulationNode} from '../basics/simulation-node';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {SimulationArray} from '../structures/array/simulation-array';
import {ArrayCell} from '../structures/array/array-cell';
import {PositionHelper} from '../helpers/position-helper';
import {ColorProvider} from '../providers/color-provider';
import {DrawableHandler} from './drawable-handler';
import {SimulationLoop} from './simulation-loop';
import contextMenu from 'd3-context-menu';
import {DrawingHelper} from '../helpers/drawing/drawing-helper';
import {DragHelper} from '../helpers/drag/drag-helper';
import {MouseHelper} from '../helpers/mouse/mouse-helper';
import {Simulation} from '../simulation';
import {Drawable} from '../drawable';

export class NodeHandler implements DrawableHandler<SimulationNode> {

  drawingHelper: DrawingHelper<SimulationNode>;
  dragHelper: DragHelper<SimulationNode>;
  mouseHelper: MouseHelper<SimulationNode>;

  simulation: Simulation;

  colorProvider: ColorProvider;

  maxId = 0;
  data: SimulationNode[] = [];

  canvas: Selection<any, any, any, any>;


  constructor(drawingHelper: DrawingHelper<SimulationNode>,
              dragHelper: DragHelper<SimulationNode>,
              mouseHelper: MouseHelper<SimulationNode>,
              canvas: Selection<any, any, any, any>,
              simulation: Simulation,
              colorProvider: ColorProvider) {
    this.drawingHelper = drawingHelper;
    this.dragHelper = dragHelper;
    this.mouseHelper = mouseHelper;
    this.canvas = canvas;
    this.simulation = simulation;
    this.colorProvider = colorProvider;
  }

  add(obj: undefined | Drawable | Drawable[]): SimulationNode | SimulationNode[] {

    let addingObj: undefined | SimulationNode | SimulationNode[];
    if (obj instanceof SimulationNode) {
      addingObj = obj as SimulationNode;
    } else if (Array.isArray(obj)) {
      addingObj = obj.map(el => el as SimulationNode);
    } else {
      addingObj = undefined;
    }
    let values: number[];
    if (Array.isArray(addingObj)) {
      values = addingObj.map(sn => sn.value);
      addingObj.forEach(d => {
        d.id = this.maxId++;
        this.data.push(d);
        // this.simulation.loop.nodes.push(d);
      });
    } else {
      if (!addingObj) {
        addingObj = new SimulationNode(this.generateRandomValue(), -1, 0, 0);
      }
      values = [addingObj.value];
      addingObj.id = this.maxId++;
      this.data.push(addingObj);
      // this.simulation.loop.nodes.push(obj);
    }

    this.colorProvider.setColorScheme(values);
    return addingObj;
  }

  generateRandomValue(n = 100, fractionDigits = 1): number {
    return parseFloat((Math.random() * n - n / 2).toFixed(fractionDigits));
  }

  draw(): void {
    this.data.sort((a, b) => b.nodeOrder - a.nodeOrder);
    this.canvas
      .selectAll('.node')
      .data(this.data, (d: SimulationNode) => d.id)
      .join(
        (enterElement) => this.enter(enterElement),
        (updateElement) => this.update(updateElement),
        (exitElement) => this.exit(exitElement)
      );
  }

  enter(enterElement: d3.Selection<d3.EnterElement, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    const nodeElement = this.drawingHelper.enter(enterElement);
    this.mouseHelper.addMouseInteraction(nodeElement.select('.node-circle'));
    this.dragHelper.addDragInteraction(nodeElement);

    return nodeElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    this.drawingHelper.update(updateElement);
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    this.drawingHelper.exit(exitElement);
    return exitElement;
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
    const dataIndex = this.data.indexOf(n);
    // const forceIndex = this.simulation.loop.nodes.indexOf(n);
    if (dataIndex !== -1) {
      this.data.splice(dataIndex, 1);
    }
    // if (forceIndex !== -1) {
    //   // this.simulation.loop.nodes.splice(forceIndex, 1);
    // }
  }

  generateNodes(n: number): SimulationNode[] {
    const nodes: SimulationNode[] = [];
    for (let i = 0; i < n; ++i) {
      const rand = this.generateRandomValue(n);
      if (nodes.some(d => d.value === rand)) {
        continue;
      }
      // const pos = this.positionHelper.createRandomPointOnCircumference([0, 0], 1);
      const node = new SimulationNode(rand, this.maxId++, 0, 0);
      nodes.push(node);
    }
    return nodes;
  }

  reset(): void {
    this.data = [];
  }
}
