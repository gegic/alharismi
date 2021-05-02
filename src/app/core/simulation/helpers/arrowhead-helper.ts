import * as d3 from 'd3';
import {Selection} from 'd3-selection';

export class ArrowheadHelper {
  static addArrowhead(svg: Selection<any, any, any, any>): void {
    const path = d3.path();
    path.moveTo(0, 0);
    path.lineTo(10, 5);
    path.lineTo(0, 10);
    path.closePath();

    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 0)
      .attr('refY', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', path.toString())
      .style('fill', 'white')
      .style('stroke', 'none');
  }
}
