import {SimulationNodeDatum} from 'd3-force';
import {Drawable} from '../drawable';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import {ArrayCell} from '../structures/array/array-cell';
import * as d3 from 'd3';
import {NodeDrawing} from '../behaviors/drawing/node-drawing';
import {NodeContextMenu} from '../behaviors/context-menu/node-context-menu';
import {MenuItem} from 'd3-context-menu';
import {DrawingBehavior} from '../behaviors/drawing/drawing-behavior';
import {ContextMenuBehavior} from '../behaviors/context-menu/context-menu-behavior';
import {d3Element, MouseBehavior} from '../behaviors/mouse/mouse-behavior';
import {DragBehavior} from '../behaviors/drag/drag-behavior';

export class SimulationNode implements SimulationNodeDatum {
  radius = defaultRadius;
  isValueVisible = true;
  isPlaceholder = false;
  noCollision = false;
  isInteractable = true;
  drawArrow = false;
  highlighted = false;
  z = 0;
  // TODO
  // TODO
  lockedGraph = undefined;
  lockedGrid?: ArrayCell;
  hoveringGrid?: ArrayCell;
  dragStartX?: number;
  dragStartY?: number;
  parent?: SimulationNode;
  children?: SimulationNode[];
  onClick?: (nodeInfo: SimulationNode) => void;

  drawingBehavior: DrawingBehavior<SimulationNode>;
  mouseBehavior: MouseBehavior<SimulationNode>;
  dragBehavior: DragBehavior<SimulationNode>;
  contextMenu: ContextMenuBehavior;

  id: number | undefined;
  fx: number | null | undefined;
  fy: number | null | undefined;
  vx: number | undefined;
  vy: number | undefined;
  x: number | undefined;
  y: number | undefined;
  cx: number | undefined;
  cy: number | undefined;
  element: Selection<any, any, HTMLElement, any>;
  value: number;

  constructor(drawingBehavior: DrawingBehavior<SimulationNode>,
              mouseBehavior: MouseBehavior<SimulationNode>,
              dragBehavior: DragBehavior<SimulationNode>,
              contextMenu: ContextMenuBehavior,
              value: number,
              id: number,
              x: number,
              y: number) {
    this.drawingBehavior = drawingBehavior;
    this.mouseBehavior = mouseBehavior;
    this.contextMenu = contextMenu;
    this.dragBehavior = dragBehavior;
    this.value = value;
    this.id = id;
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
  }

  clicked(): void {
    if (!!this.onClick) {
      this.onClick(this);
      return;
    }
    if (this.isPlaceholder || !this.isInteractable || this.isValueVisible) {
      return;
    }
    this.isValueVisible = true;
  }

  setTransform(x: number, y: number): void {
    this.cx = x;
    this.cy = y;
    this.x = x;
    this.y = y;
  }

  getContextMenu(): MenuItem[] {
    return this.contextMenu.getContextMenu();
  }

  enter(enterElement: Selection<d3.EnterElement, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    return this.drawingBehavior.enter(enterElement);
  }

  update(updateElement: Selection<d3.BaseType, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    return this.drawingBehavior.update(updateElement);
  }

  exit(exitElement: Selection<d3.BaseType, SimulationNode, any, any>): Selection<d3.BaseType, SimulationNode, any, any> {
    return this.drawingBehavior.exit(exitElement);
  }


  mouseOver(i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    this.mouseBehavior.mouseOver(this, i, nodes);
  }

  mouseOut(i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    this.mouseBehavior.mouseOut(this, i, nodes);
  }

  dragStart(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragStart(this, i, nodes);
  }

  dragging(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragging(this, i, nodes);
  }

  dragEnd(i: number, nodes: Element[] | ArrayLike<Element>): void {
    this.dragBehavior.dragEnd(this, i, nodes);
  }

  set color(color: string) {
    this.drawingBehavior.color = color;
  }

  get color(): string {
    return this.drawingBehavior.color;
  }

}
