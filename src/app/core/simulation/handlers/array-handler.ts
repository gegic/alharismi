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

  createArray(size: number, descriptor: string): SimulationArray {
    return new SimulationArray(this.maxId++, size, descriptor, 0, 0);
  }

  add(array: SimulationArray): void {
    this.arrays.push(array);
  }

  draw(): void {
    const arrayElements = this.canvas
      .selectAll('.array')
      .data(this.arrays, (arr: SimulationArray) => arr.id)
      .join('g')
        .attr('class', 'array')
        .attr('transform', arr => `translate(${arr.x}, ${arr.y})`);
    arrayElements.selectAll()
      .call(d3.drag().on('drag', (arr, i, arrays) => this.arrayDragged(arr as SimulationArray, i, arrays)));

    arrayElements.append('text')
      .attr('dx', arr => (arr.size * arr.cellWidth) / 2)
      .attr('dy', -25)
      .text(arr => arr.descriptor)
      .attr('font-size', 30)// font size
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none');

    const cells = arrayElements.selectAll('.array-cell')
      .data(d => d.data)
      .join('g');
      //   .on('contextmenu', d3.contextMenu(arrayContextMenu))

    cells.append('text')
      .attr('class', 'array-text')
      .attr('dx', (d) => d.x + d.width / 2)
      .attr('dy', 125)
      .text(d => d.toString())
      .attr('font-size', 25)// font size
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none');

    const rectangles = cells.append('rect')
      .attr('class', 'array-cell')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .attr('rx', 25)
      .attr('ry', 25)
      .attr('width', d => d.width)
      .attr('height', d => d.height)
      .style('fill', d => d.color)
      .style('opacity', 0)
      .style('stroke-width', 5)
      .on('mouseover', function (d) {

      })
      .on('mouseout', function (d) {

      })
      .transition().duration(500).style('opacity', 0.5)
    cells.lower()
  }

  arrayDragged(arr: SimulationArray, i: number, nodes: Element[] | ArrayLike<Element>): void {
    arr.setTransform(d3.event.x, d3.event.y);
    this.simulationHandler.repaint();
  }

  arrayCellMouseOver(d: ArrayCell): void {
    d.isMouseOver = true;

    // if dragging node and cell not holding node, then attach it to array cell
    if (!this.simulationHandler.draggedNode) {
      return;
    }

    this.simulationHandler.draggedNode.lock = d

    d.hovering_node = draggedNode
    draggedNode.fx = temp.x + d.x + d.width / 2
    draggedNode.fy = d.height / 2 + temp.y
    // now check if array is valid and color it accordingly
  }

  arrayCellMouseOut(d: ArrayCell): void {
    d.isMouseOver = false;

    if (!this.simulationHandler.draggedNode) {
      return;
    }
    if (d.hovering_node !== d.locked_node) {
      d.hovering_node = d.locked_node
    }
    else d.hovering_node = undefined

    draggedNode.hovering_grid = null
  }
}
