import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';

export type d3Element = SVGCircleElement | Element | d3.EnterElement | Document | Window | null;

export interface MouseBehavior<SimulationObject> {

  mouseOver(d: SimulationObject, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void;

  mouseOut(d: SimulationObject, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void;

}
