import {SimulationHandler} from './simulation-handler';
import {SimulationArray} from '../structures/array/simulation-array';
import {Selection} from 'd3-selection';
import {PositionHelper} from '../helpers/position-helper';
import {DrawableHandler} from './drawable-handler';
import * as d3 from 'd3';
import {SimulationNode} from '../basics/simulation-node';
import {ArrayCell} from '../structures/array/array-cell';

export class ArrayHandler implements DrawableHandler {
  positionHelper: PositionHelper;
  simulationHandler: SimulationHandler;

  maxId = 0;

  arrays: SimulationArray[] = [];

  canvas: Selection<any, any, any, any>;

  constructor(simulationHandler: SimulationHandler,
              canvas: Selection<any, any, any, any>) {
    this.simulationHandler = simulationHandler;
    this.canvas = canvas;
  }

  createArray(size: number, descriptor?: string): SimulationArray {
    return new SimulationArray(this.maxId++, size, 0, 0, descriptor);
  }

  add(array: SimulationArray): void {
    this.arrays.push(array);
  }

  draw(): void {

    const arrayElements = this.canvas
      .selectAll('.array')
      .data(this.arrays, (arr: SimulationArray) => arr.id)
      .join(enter => {
        const arrayElement = enter.append('g')
          .attr('class', 'array')
          .attr('transform', arr => `translate(${arr.x}, ${arr.y})`)
          .style('cursor', 'pointer')
          .call(d3.drag()
            .on('drag', (arr: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>) =>
              this.arrayDragged(arr, i, arrays))
            .on('start', (_, i, arrays) =>
              d3.select(arrays[i]).style('cursor', 'grabbing'))
            .on('end', (_, i, arrays) =>
              d3.select(arrays[i]).style('cursor', null)));

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

        const cells = arrayElement
          .selectAll('.array-cell')
          .data((d: SimulationArray) => d.data, (cell: ArrayCell) => cell.index)
          .join('g')
          .attr('class', 'array-cell');

        cells
          .append('text')
          .attr('class', d => 'array-cell-name')
          .attr('dx', (d) => d.x + d.width / 2)
          .attr('dy', 125)
          .text((d: ArrayCell) => d.toString())
          .attr('font-size', 25)// font size
          .style('fill', 'white')
          .style('text-anchor', 'middle');

        cells
          .append('rect')
          .attr('class', d => 'array-cell-container')
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr('rx', 25)
          .attr('ry', 25)
          .attr('width', d => d.width)
          .attr('height', d => d.height)
          .style('fill', d => d.color)
          .style('opacity', .5)
          .style('stroke-width', 5)
          .on('mouseover', (d: ArrayCell) => this.arrayCellMouseOver(d))
          .on('mouseout', (d: ArrayCell) => this.arrayCellMouseOut(d));
        return arrayElement;
      });

    arrayElements.lower();

  }

  arrayDragged(arr: SimulationArray, i: number, arrays: Element[] | ArrayLike<Element>): void {
    arr.setTransform(d3.event.x, d3.event.y);
    this.simulationHandler.repaint();
  }

  arrayCellMouseOver(d: ArrayCell): void {
    d.isMouseOver = true;

    // if dragging node and cell not holding node, then attach it to array cell
    if (!this.simulationHandler.draggedNode) {
      return;
    }

    this.simulationHandler.draggedNode.hoveringGrid = d;

    d.hoveringNode = this.simulationHandler.draggedNode;
    this.simulationHandler.draggedNode.fx = d.parent.x + d.x + d.width / 2;
    this.simulationHandler.draggedNode.fy = d.height / 2 + d.parent.y;

    // now check if array is valid and color it accordingly
  }

  arrayCellMouseOut(d: ArrayCell): void {
    d.isMouseOver = false;

    if (!this.simulationHandler.draggedNode) {
      return;
    }
    if (d.hoveringNode !== d.node) {
      d.hoveringNode = d.node;
    }
    else {
      d.hoveringNode = undefined;
    }

    this.simulationHandler.draggedNode.hoveringGrid = null;
  }
}
