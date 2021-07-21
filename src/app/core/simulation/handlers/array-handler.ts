import {SimulationLoop} from './simulation-loop';
import {SimulationArray} from '../structures/array/simulation-array';
import {Selection} from 'd3-selection';
import {PositionHelper} from '../helpers/position-helper';
import {DrawableHandler} from './drawable-handler';
import * as d3 from 'd3';
import {SimulationNode} from '../basics/simulation-node';
import {ArrayCell} from '../structures/array/array-cell';
import contextMenu from 'd3-context-menu';
import {DrawingHelper} from '../helpers/drawing/drawing-helper';
import {DragHelper} from '../helpers/drag/drag-helper';
import {ArrayCellDrawing} from '../helpers/drawing/array-cell-drawing';
import {ArrayCellMouse} from '../helpers/mouse/array-cell-mouse';
import {MouseHelper} from '../helpers/mouse/mouse-helper';
import {Simulation} from '../simulation';
import {Drawable} from '../drawable';

export class ArrayHandler implements DrawableHandler<SimulationArray> {

  drawingHelper: DrawingHelper<SimulationArray>;
  dragHelper: DragHelper<SimulationArray>;
  mouseHelper: MouseHelper<SimulationArray>;
  arrayCellDrawingHelper: DrawingHelper<ArrayCell>;
  arrayCellMouseHelper: MouseHelper<ArrayCell>;
  simulation: Simulation;

  maxId = 0;

  data: SimulationArray[] = [];
  canvas: Selection<any, any, any, any>;

  constructor(simulation: Simulation,
              drawingHelper: DrawingHelper<SimulationArray>,
              arrayCellDrawingHelper: DrawingHelper<ArrayCell>,
              dragHelper: DragHelper<SimulationArray>,
              mouseHelper: MouseHelper<SimulationArray>,
              arrayCellMouseHelper: MouseHelper<ArrayCell>,
              canvas: Selection<any, any, any, any>) {
    this.drawingHelper = drawingHelper;
    this.arrayCellDrawingHelper = arrayCellDrawingHelper;
    this.dragHelper = dragHelper;
    this.mouseHelper = mouseHelper;
    this.arrayCellMouseHelper = arrayCellMouseHelper;
    this.simulation = simulation;
    this.canvas = canvas;
  }

  add(obj: SimulationArray | Drawable): void {
    if (!(obj instanceof SimulationArray)) {
      return;
    }
    const array = obj as SimulationArray;

    array.id = this.maxId++;
    this.data.push(array);
  }

  draw(): void {

    const arrayElements = this.canvas
      .selectAll('.array')
      .data(this.data, (arr: SimulationArray) => arr.id)
      .join(enterElement => this.enter(enterElement),
            updateElement => this.update(updateElement),
        exitElement => this.exit(exitElement));

    arrayElements.lower();

  }

  enter(enterElement: d3.Selection<d3.EnterElement, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    const arrElement = this.drawingHelper.enter(enterElement);
    this.mouseHelper.addMouseInteraction(arrElement);
    this.dragHelper.addDragInteraction(arrElement);
    arrElement
      .selectAll('.array-cell')
      .data((d: SimulationArray) => d.data, (cell: ArrayCell) => cell.id)
      .join(enterCell => {
        const cellElement = this.arrayCellDrawingHelper.enter(enterCell);
        this.arrayCellMouseHelper.addMouseInteraction(cellElement);
        return cellElement;
      });
    return arrElement;
  }


  update(updateElement: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    this.drawingHelper.update(updateElement);
    updateElement
      .selectAll('.array-cell')
      .data((d: SimulationArray) => d.data, (cell: ArrayCell) => cell.id)
      .join(enterCell => {
          const cellElement = this.arrayCellDrawingHelper.enter(enterCell);
          this.arrayCellMouseHelper.addMouseInteraction(cellElement);
          return cellElement;
        },
          updateCell => this.arrayCellDrawingHelper.update(updateCell),
        exitCell => this.arrayCellDrawingHelper.exit(exitCell));
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, SimulationArray, any, any>): d3.Selection<d3.BaseType, SimulationArray, any, any> {
    return this.drawingHelper.exit(exitElement);
  }

  reset(): void {
    this.maxId = 0;
    this.data = [];
  }
}
