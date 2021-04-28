import {DrawingBehavior} from './drawing-behavior';
import {SimulationArray} from '../../structures/array/simulation-array';
import * as d3 from 'd3';
import {ArrayCell} from '../../structures/array/array-cell';
import contextMenu from 'd3-context-menu';


export class ArrayDrawing implements DrawingBehavior<SimulationArray> {

  color = 'black';

  enter(enterElement: d3.Selection<d3.EnterElement, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    const arrayElement = enterElement.append('g')
      .attr('class', 'array')
      .attr('transform', arr => `translate(${arr.x}, ${arr.y})`)
      .style('cursor', 'pointer')
      .call(d3.drag()
        .on('drag', (arr: SimulationArray, i, arrays) => arr.dragging(i, arrays))
        .on('start', (arr: SimulationArray, i, arrays) => arr.dragStart(i, arrays))
        .on('end', (arr: SimulationArray, i, arrays) => arr.dragEnd(i, arrays)))
      .on('contextmenu', (arr: SimulationArray) => contextMenu(arr.getContextMenu()));

    arrayElement
      .append('rect')
      .attr('class', 'array-bg')
      .attr('x', -25)
      .attr('y', -60)
      .attr('width', (arr: SimulationArray) => arr.size * (arr.cellWidth + arr.cellWidth / 20) + 45)
      .attr('height', 200)
      .attr('rx', 25)
      .attr('ry', 25)
      .attr('stroke', 'white')
      .attr('stroke-dasharray', '10')
      .attr('stroke-width', '3')
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

    arrayElement
      .selectAll('.array-cell')
      .data((d: SimulationArray) => d.data, (cell: ArrayCell) => cell.index)
      .join(cellEnter => cellEnter.datum().enter(cellEnter));

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

    updateElement
      .selectAll('.array-cell')
      .data((d: SimulationArray) => d.data, (cell: ArrayCell) => cell.index)
      .join(enterCell => enterCell.datum()?.enter(enterCell),
        updateCell => updateCell.datum()?.update(updateCell),
        exitCell => exitCell.datum()?.exit(exitCell));

    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    return exitElement.remove();
  }




}
