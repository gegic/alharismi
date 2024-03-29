import {DrawingHelper} from './drawing-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {DrawableHandler} from '../../handlers/drawable-handler';
import * as d3 from 'd3';

export class ArrayCellDrawing implements DrawingHelper<ArrayCell> {

  enter(enterElement: d3.Selection<d3.EnterElement, ArrayCell, any, any>): d3.Selection<d3.BaseType, ArrayCell, any, any> {
    const arrayCell = enterElement.append('g')
      .attr('class', 'array-cell');

    arrayCell
      .append('text')
      .attr('class', 'array-cell-name')
      .attr('dx', (d) => d.x + d.width / 2)
      .attr('dy', 125)
      .text((d: ArrayCell) => d.toString())
      .attr('font-size', 25)// font size
      .style('fill', 'white')
      .style('text-anchor', 'middle');

    arrayCell
      .append('rect')
      .attr('class', 'array-cell-container')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('rx', d => d.rx)
      .attr('ry', d => d.ry)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .style('fill', d => d.color)
      .style('opacity', .9)
      .style('stroke-width', 5);

    return arrayCell;
  }

  update(updateElement: d3.Selection<d3.BaseType, ArrayCell, any, any>): d3.Selection<d3.BaseType, ArrayCell, any, any> {

    updateElement
      .select('.array-cell-name')
      .attr('dx', (d) => d.x + d.width / 2)
      .text((d: ArrayCell) => d.toString());

    updateElement
      .select('.array-cell-container')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', d => d.height);

    updateElement
      .select('.array-cell-container')
      .style('fill', d => d.defaultColor)
      .transition()
      .duration(600)
      .ease(d3.easeExpOut)
      .attr('rx', d => d.rx)
      .attr('ry', d => d.ry)
      .style('fill', d => d.color);

    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, ArrayCell, any, any>): d3.Selection<d3.BaseType, ArrayCell, any, any> {
    return exitElement.remove();
  }


}
