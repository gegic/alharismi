import {DataHandler} from './handlers/data-handler';
import {NodeHandler} from './handlers/node-handler';
import {ArrayHandler} from './handlers/array-handler';
import {Camera} from '../camera';
import {BehaviorSubject} from 'rxjs';
import * as d3 from 'd3';
import {SimulationLoop} from './handlers/simulation-loop';
import {NodeDrawing} from './helpers/drawing/node-drawing';
import {ColorProvider} from './providers/color-provider';
import {NodeDrag} from './helpers/drag/node-drag';
import {NodeMouse} from './helpers/mouse/node-mouse';
import {ArrayDrawing} from './helpers/drawing/array-drawing';
import {ArrayCellDrawing} from './helpers/drawing/array-cell-drawing';
import {ArrayDrag} from './helpers/drag/array-drag';
import {ArrayCellMouse} from './helpers/mouse/array-cell-mouse';
import {ArrayMouse} from './helpers/mouse/array-mouse';
import {BstHandler} from './handlers/bst-handler';
import {BstDrawing} from './helpers/drawing/bst-drawing';
import {BstCellDrawing} from './helpers/drawing/bst-cell-drawing';
import {BstCellDrag} from './helpers/drag/bst-cell-drag';
import {BstCellMouse} from './helpers/mouse/bst-cell-mouse';
import {LinkDrawingHelper} from './helpers/drawing/link-drawing-helper';
import {BstMouse} from './helpers/mouse/bst-mouse';

export class Simulation {

  canvas?: d3.Selection<any, any, d3.BaseType, any>;

  loop?: SimulationLoop;

  nodeHandler?: NodeHandler;
  arrayHandler?: ArrayHandler;
  bstHandler?: BstHandler;

  camera?: Camera;

  constructor(canvas: d3.Selection<any, any, d3.BaseType, any>) {
    this.canvas = canvas;
  }

  startSimulation(svg: d3.Selection<any, any, any, any>): void {
    this.loop = new SimulationLoop();
    this.loop.setupForce();

    this.camera = new Camera(this.canvas);

    this.camera.setZoom(svg);
    const colorProvider = new ColorProvider();
    const nodeDrawing = new NodeDrawing(colorProvider);
    const nodeDrag = new NodeDrag(this);
    const nodeMouse = new NodeMouse(this);

    this.nodeHandler = new NodeHandler(
      nodeDrawing,
      nodeDrag,
      nodeMouse,
      this.canvas,
      this,
      colorProvider
    );

    const arrayDrawing = new ArrayDrawing();
    const arrayCellDrawing = new ArrayCellDrawing();
    const arrayDrag = new ArrayDrag();
    const arrayMouse = new ArrayMouse(this);
    const arrayCellMouse = new ArrayCellMouse(this);
    this.arrayHandler = new ArrayHandler(
      this,
      arrayDrawing,
      arrayCellDrawing,
      arrayDrag,
      arrayMouse,
      arrayCellMouse,
      this.canvas
    );

    this.bstHandler = new BstHandler(
      this,
      null,
      new BstDrawing(),
      new BstMouse(this),
      new BstCellDrawing(),
      new BstCellDrag(this),
      new BstCellMouse(this, colorProvider),
      new LinkDrawingHelper(),
      this.canvas
    );

    this.loop.setHandlers(this.nodeHandler, this.bstHandler, this.arrayHandler);
  }

  async get_level(): Promise<void> {
    const nodes = this.nodeHandler.generateNodes(11, null);
    const anotherNode = this.nodeHandler.create(25, 0, 0);
    this.nodeHandler.add(nodes);
    this.nodeHandler.add(anotherNode);
    const arr = this.arrayHandler.create(10, 0, 0);
    this.arrayHandler.add(arr);
    //
    // console.log(arr);

    const bst = this.bstHandler.create(0, 0, 0);
    this.bstHandler.add(bst);

    for (const n of nodes.slice(0, 3)) {
     await arr.insertAt(n, 0);
    }

  }
}
