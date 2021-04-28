import * as d3 from 'd3';

export interface DrawingBehavior<DrawableObject> {
  color: string;
  enter(enterElement: d3.Selection<d3.EnterElement, DrawableObject, any, any>): d3.Selection<d3.BaseType, DrawableObject, any, any>;
  update(updateElement: d3.Selection<d3.BaseType, DrawableObject, any, any>): d3.Selection<d3.BaseType, DrawableObject, any, any>;
  exit(exitElement: d3.Selection<d3.BaseType, DrawableObject, any, any>): d3.Selection<d3.BaseType, DrawableObject, any, any>;
}
