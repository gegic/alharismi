import {DrawingHelper} from './drawing-helper';
import {SimulationArray} from '../../structures/array/simulation-array';
import * as d3 from 'd3';
import contextMenu, {MenuItem} from 'd3-context-menu';
import {ArrayCell} from '../../structures/array/array-cell';
import {DrawableHandler} from '../../handlers/drawable-handler';

export class ArrayDrawing implements DrawingHelper<SimulationArray> {

  enter(enterElement: d3.Selection<d3.EnterElement, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    const arrayElement = enterElement.append('g')
      .attr('class', 'array')
      .attr('transform', arr => `translate(${arr.x}, ${arr.y})`)
      .style('cursor', 'pointer');

    arrayElement
      .append('rect')
      .attr('class', 'array-bg')
      .attr('x', -25)
      .attr('y', -60)
      .attr('width', (arr: SimulationArray) => arr.size * (arr.cellWidth + arr.cellWidth / 20) + 45)
      .attr('height', 200)
      .attr('rx', 25)
      .attr('ry', 25)
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .attr('fill', (arr: SimulationArray) => arr.color)
      .style('opacity', .8)
      .lower();

    arrayElement
      .append('text')
      .attr('class', 'array-title')
      .attr('dx', arr => (arr.size * arr.cellWidth) / 2)
      .attr('dy', -25)
      .text(arr => arr.descriptor)
      .attr('font-size', 30)
      .style('fill', 'white')
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none');

    // arrayElement

    return arrayElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    updateElement
      .select('.array-bg')
      .attr('width', (arr: SimulationArray) => arr.size * (arr.cellWidth + arr.cellWidth / 20) + 45)
      .lower();

    updateElement
      .select('.array-title')
      .attr('dx', arr => (arr.size * arr.cellWidth) / 2)
      .text(arr => arr.descriptor);

    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    return exitElement.remove();
  }
}
