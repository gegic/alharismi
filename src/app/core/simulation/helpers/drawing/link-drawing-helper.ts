import {DrawingHelper} from './drawing-helper';
import {SimulationLink} from '../../basics/simulation-link';
import * as d3 from 'd3';

export class LinkDrawingHelper implements DrawingHelper<SimulationLink> {
  enter(enterElement: d3.Selection<d3.EnterElement, SimulationLink, any, any>): d3.Selection<d3.BaseType, SimulationLink, any, any> {

    const linkElement = enterElement
      .append('line')
      .attr('class', 'link')
      .attr('stroke', 'white')
      .attr('stroke-width', 10)
      .attr('stroke-opacity', 0.6);
      // .on('mouseover', function (d) {
      //   if (!temp.linksCutable || d.target.data.isPlaceholder) return
      //   d3.select(this)
      // })
      // .on('mouseout', function (d) {
      //   if (!temp.linksCutable || d.target.data.isPlaceholder) return
      //   d3.select(this)
      // })
      // .on('click', function (d) {
      //   temp.cutLink(d)
      // })
    return linkElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, SimulationLink, any, any>): d3.Selection<d3.BaseType, SimulationLink, any, any> {
    return updateElement;
  }


  exit(exitElement: d3.Selection<d3.BaseType, SimulationLink, any, any>): d3.Selection<d3.BaseType, SimulationLink, any, any> {
    return exitElement.remove();
  }
}
