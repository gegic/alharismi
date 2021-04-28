import {SimulationHandler} from './simulation-handler';
import {SimulationArray} from '../structures/array/simulation-array';
import {Selection} from 'd3-selection';
import {DrawableHandler} from './drawable-handler';
import * as d3 from 'd3';
import {ArrayCell} from '../structures/array/array-cell';
import contextMenu, {MenuItem} from 'd3-context-menu';
import {ArrayDrawing} from '../behaviors/drawing/array-drawing';
import {DrawingBehavior} from '../behaviors/drawing/drawing-behavior';
import {ArrayDrag} from '../behaviors/drag/array-drag';
import {ArrayContextMenu} from '../behaviors/context-menu/array-context-menu';

export class ArrayHandler implements DrawableHandler {

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
    return new SimulationArray(
      new ArrayDrawing(),
      new ArrayDrag(),
      new ArrayContextMenu(),
      this.maxId++,
      size,
      0,
      0,
      descriptor
    );
  }

  add(array: SimulationArray): void {
    this.arrays.push(array);
  }

  draw(): void {

    const arrayElements = this.canvas
      .selectAll('.array')
      .data(this.arrays, (arr: SimulationArray) => arr.id)
      .join(enter => enter.datum()?.enter(enter),
        update => update.datum()?.update(update),
        exit => exit.datum()?.exit(exit));

    arrayElements.lower();

  }

  async linearFindElement(arr: SimulationArray, value: number): Promise<void> {
    for (let i = 0; i < arr.size; ++i) {
      const cell = arr.data[i];
      if (!cell.node) {
        continue;
      }

      cell.node.drawArrow = true;
      cell.node.isValueVisible = true;
      this.simulationHandler.repaint();

      await new Promise(r => setTimeout(r, 1000));

      cell.node.drawArrow = false;

      if (cell.node.value === value) {
        cell.node.highlighted = true;
        this.simulationHandler.repaint();
        await new Promise(r => setTimeout(r, 1000));
        cell.node.highlighted = false;
        return;
      }
    }

    this.simulationHandler.repaint();
    alert(`Element with ${value} not found.`);
  }
}
