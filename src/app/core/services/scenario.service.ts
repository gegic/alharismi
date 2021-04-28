import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {Scenario} from '../simulation/scenario';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {Scene} from '../simulation/scene';
import {HttpClient} from '@angular/common/http';
import {defaultRadius, scenariosPath} from '../consts';
import {DataHandler} from '../simulation/handlers/data-handler';
import * as d3 from 'd3';
import {SimulationNode} from '../simulation/basics/simulation-node';
import {Selection} from 'd3-selection';
import {SimulationText} from '../simulation/basics/simulation-text';
import {SimulationLink} from '../simulation/basics/simulation-link';
import {SimulationArray} from '../simulation/structures/array/simulation-array';
import {NodeHandler} from '../simulation/handlers/node-handler';
import {PositionHelper} from '../simulation/helpers/position-helper';
import {ColorHelper} from '../simulation/helpers/color-helper';
import {SimulationHandler} from '../simulation/handlers/simulation-handler';
import {ArrayHandler} from '../simulation/handlers/array-handler';
import {Camera} from '../simulation/camera';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  dataHandler?: DataHandler;
  nodeHandler?: NodeHandler;
  arrayHandler?: ArrayHandler;
  camera?: Camera;
  simulationHandler?: SimulationHandler;
  canvas: BehaviorSubject<Selection<any, any, d3.BaseType, any> | undefined> =
    new BehaviorSubject<Selection<any, any, d3.BaseType, any> | undefined>(undefined);

  currentScenario: BehaviorSubject<Scenario | undefined> = new BehaviorSubject<Scenario | undefined>(undefined);
  scenarios: Scenario[];

  constructor(private httpClient: HttpClient) {
  }

  startSimulation(svg: Selection<any, any, any, any>): void {
    const positionHelper = new PositionHelper();
    this.simulationHandler = new SimulationHandler();
    this.nodeHandler = new NodeHandler(
      positionHelper,
      new ColorHelper(),
      this.canvas.getValue(),
      this.simulationHandler
    );

    this.arrayHandler = new ArrayHandler(
      this.simulationHandler,
      this.canvas.getValue(),
    );

    this.camera = new Camera(this.canvas.getValue());
    this.camera.setZoom(svg);

    this.simulationHandler.setHandlers(this.nodeHandler, this.arrayHandler);
    this.simulationHandler.setupSimulation();
  }

  getScenarios(): Observable<Scenario[]> {
    return this.httpClient.get<Scenario[]>(`${scenariosPath}/scenarios.json`);
  }

  get_level(): void {
    const nodes = this.nodeHandler.generateNodes(10, this.isLevelComplete);
    this.nodeHandler.add(nodes);
    this.nodeHandler.draw();
    const arr = this.arrayHandler.createArray(10);
    arr.setLength(10);
    this.arrayHandler.add(arr);
    this.simulationHandler.repaint();
  }

  isLevelComplete(ni: SimulationNode): void {
    if (ni) {
      // ni.clicked();.
    }
    if (ni && !ni.lockedGrid) {
      ni.fx = undefined;
      ni.fy = undefined;
    }
    // const complete = this.currentLevel.isComplete(n)
    // if (complete) {
    //   this.currentLevel.complete = true
    //   this.getReadyForNextLevel(n)
    // }
  }

}
