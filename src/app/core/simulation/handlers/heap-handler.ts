import {DrawableHandler} from './drawable-handler';
import {SimulationNode} from '../basics/simulation-node';
import * as d3 from 'd3';
import {DragHelper} from '../helpers/drag/drag-helper';
import {DrawingHelper} from '../helpers/drawing/drawing-helper';
import {MouseHelper} from '../helpers/mouse/mouse-helper';
import {SimulationArray} from '../structures/array/simulation-array';
import {ArrayCell} from '../structures/array/array-cell';
import {BstCell} from '../structures/tree/bst-cell';
import {Simulation} from '../simulation';
import {BstCellDrag} from '../helpers/drag/bst-cell-drag';
import {BstCellMouse} from '../helpers/mouse/bst-cell-mouse';
import {LinkDrawingHelper} from '../helpers/drawing/link-drawing-helper';
import {SimulationLink} from '../basics/simulation-link';
import {Heap} from '../structures/tree/binary-tree/heap/heap';

export class HeapHandler implements DrawableHandler<Heap> {

  dragHelper: DragHelper<Heap>;
  drawingHelper: DrawingHelper<Heap>;
  mouseHelper: MouseHelper<Heap>;
  simulation: Simulation;

  bstCellDrawingHelper: DrawingHelper<BstCell>;
  bstCellDragHelper: DragHelper<BstCell>;
  bstCellMouseHelper: MouseHelper<BstCell>;

  linkDrawingHelper: DrawingHelper<SimulationLink>;
  data: Heap[] = [];
  maxId = 0;
  canvas: d3.Selection<any, any, any, any>;

  constructor(simulation: Simulation,
              dragHelper: DragHelper<Heap>,
              drawingHelper: DrawingHelper<Heap>,
              mouseHelper: MouseHelper<Heap>,
              bstCellDrawingHelper: DrawingHelper<BstCell>,
              bstCellDragHelper: DragHelper<BstCell>,
              bstCellMouseHelper: MouseHelper<BstCell>,
              linkDrawingHelper: DrawingHelper<SimulationLink>,
              canvas: d3.Selection<any, any, any, any>) {
    this.simulation = simulation;
    this.dragHelper = dragHelper;
    this.drawingHelper = drawingHelper;
    this.mouseHelper = mouseHelper;
    this.bstCellDrawingHelper = bstCellDrawingHelper;
    this.bstCellDragHelper = bstCellDragHelper;
    this.bstCellMouseHelper = bstCellMouseHelper;
    this.linkDrawingHelper = linkDrawingHelper;
    this.canvas = canvas;
  }

  add(tree: Heap): void {
    tree.id = this.maxId++;
    tree.setRoot();
    this.data.push(tree);
  }

  draw(): void {
    const treeElements = this.canvas
      .selectAll('.heap')
      .data(this.data, (tree: Heap) => tree.id)
      .join(enterElement => this.enter(enterElement),
        updateElement => this.update(updateElement),
        exitElement => this.exit(exitElement));

    treeElements.lower();
  }


  enter(enterElement: d3.Selection<d3.EnterElement, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    const treeElement = this.drawingHelper.enter(enterElement);
    this.mouseHelper.addMouseInteraction(treeElement);
    treeElement
      .selectAll('.bst-cell')
      .data((d: Heap) => d.getData(), (cell: BstCell) => cell.id)
      .join(enterCell => {
        const cellElement = this.bstCellDrawingHelper.enter(enterCell);
        this.bstCellDragHelper.addDragInteraction(cellElement);
        this.bstCellMouseHelper.addMouseInteraction(cellElement);
        return cellElement;
      });

    treeElement
      .selectAll('.link')
      .data((d: Heap) => d.getLinks(), (link: SimulationLink) => `${link.source.id}_${link.target.id}`)
      .join(enterLink => {
        const linkElement = this.linkDrawingHelper.enter(enterLink);
        linkElement.lower();
        return linkElement;
      });
    return treeElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    this.drawingHelper.update(updateElement);
    updateElement
      .selectAll('.bst-cell')
      .data((d: Heap) => d.getData(), (cell: BstCell) => cell.id)
      .join(enterCell => {
          const cellElement = this.bstCellDrawingHelper.enter(enterCell);
          this.bstCellDragHelper.addDragInteraction(cellElement);
          this.bstCellMouseHelper.addMouseInteraction(cellElement);
          return cellElement;
        },
        updateCell => this.bstCellDrawingHelper.update(updateCell),
        exitCell => this.bstCellDrawingHelper.exit(exitCell));

    updateElement
      .selectAll('.link')
      .data((d: Heap) => d.getLinks(), (link: SimulationLink) => `${link.target.id}_${link.target.id}`)
      .join(enterLink => {
        const linkElement = this.linkDrawingHelper.enter(enterLink);
        linkElement.lower();
        return linkElement;
      },
        updateLink => this.linkDrawingHelper.update(updateLink).lower(),
        exitLink => this.linkDrawingHelper.exit(exitLink));
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    return this.drawingHelper.exit(exitElement);
  }

  reset(): void {
    this.maxId = 0;
    this.data = [];
  }

}
