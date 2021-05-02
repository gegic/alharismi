import * as d3 from 'd3';
import {MenuItem} from 'd3-context-menu';
import {DrawableHandler} from '../../handlers/drawable-handler';

export interface DrawingHelper<SimulationObject> {
  enter(enterElement: d3.Selection<d3.EnterElement, SimulationObject, any, any>): d3.Selection<d3.BaseType, SimulationObject, any, any>;
  update(updateElement: d3.Selection<d3.BaseType, SimulationObject, any, any>): d3.Selection<d3.BaseType, SimulationObject, any, any>;
  exit(exitElement: d3.Selection<d3.BaseType, SimulationObject, any, any>): d3.Selection<d3.BaseType, SimulationObject, any, any>;
}
