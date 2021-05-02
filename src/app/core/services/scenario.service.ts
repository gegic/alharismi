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
import {ColorProvider} from '../simulation/providers/color-provider';
import {SimulationLoop} from '../simulation/handlers/simulation-loop';
import {ArrayHandler} from '../simulation/handlers/array-handler';
import {Camera} from '../camera';
import {NodeDrawing} from '../simulation/helpers/drawing/node-drawing';
import {NodeDrag} from '../simulation/helpers/drag/node-drag';
import {NodeMouse} from '../simulation/helpers/mouse/node-mouse';
import {ArrayDrawing} from '../simulation/helpers/drawing/array-drawing';
import {ArrayCellDrawing} from '../simulation/helpers/drawing/array-cell-drawing';
import {ArrayDrag} from '../simulation/helpers/drag/array-drag';
import {ArrayMouse} from '../simulation/helpers/mouse/array-mouse';
import {ArrayCellMouse} from '../simulation/helpers/mouse/array-cell-mouse';
import {Simulation} from '../simulation/simulation';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  simulation?: Simulation;

  currentScenario: BehaviorSubject<Scenario | undefined> = new BehaviorSubject<Scenario | undefined>(undefined);
  scenarios: Scenario[];

  constructor(private httpClient: HttpClient) {
  }

  initSimulation(canvas: Selection<any, any, any, any>): void {
    this.simulation = new Simulation(canvas);
  }

  startSimulation(svg: Selection<any, any, any, any>): void {
    this.simulation?.startSimulation(svg);
  }

  getLevel(): void {
    this.simulation?.get_level();
  }

  getScenarios(): Observable<Scenario[]> {
    return this.httpClient.get<Scenario[]>(`${scenariosPath}/scenarios.json`);
  }


}
