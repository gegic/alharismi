import {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';

export type d3Element = SVGCircleElement | Element | d3.EnterElement | Document | Window | null;

export interface MouseHelper<SimulationObject> {
  mouseOver?(d: SimulationObject, i?: number, nodes?: d3Element[] | ArrayLike<d3Element>): void;
  mouseOut?(d: SimulationObject, i?: number, nodes?: d3Element[] | ArrayLike<d3Element>): void;
  contextMenu?(d?: SimulationObject, i?: number, nodes?: d3Element[] | ArrayLike<d3Element>): void;

  addMouseInteraction(element: d3.Selection<d3.BaseType, SimulationObject, any, any>):
    d3.Selection<d3.BaseType, SimulationObject, any, any>;
}
