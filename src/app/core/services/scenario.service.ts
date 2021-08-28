import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Scenario} from '../simulation/scenario';
import {HttpClient} from '@angular/common/http';
import {scenariosPath} from '../consts';
import {Selection} from 'd3-selection';
import {Simulation} from '../simulation/simulation';
import {scenarios} from '../../../scenarios/scenarios';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  simulation?: Simulation;

  currentScenario: BehaviorSubject<Scenario | undefined> = new BehaviorSubject<Scenario | undefined>(undefined);
  scenarios = scenarios;

  constructor(private httpClient: HttpClient) {
  }

  initSimulation(canvas: Selection<any, any, any, any>,
                 widthHeight: [number, number],
                 prompt: (header: string) => Promise<string>): void {
    this.simulation = new Simulation(canvas, prompt);
    this.simulation.widthHeight.next(widthHeight);
  }

  startSimulation(svg: Selection<any, any, any, any>): void {
    this.simulation?.startSimulation(svg);
  }

  updateWidthHeight(widthHeight: [number, number]): void {
    this.simulation.widthHeight.next(widthHeight);
  }

}
