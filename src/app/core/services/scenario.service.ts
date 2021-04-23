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
import {fpsCounter} from '../decorators/fps-counter';
import {Selection} from 'd3-selection';
import {SimulationText} from '../simulation/basics/simulation-text';
import {SimulationLink} from '../simulation/basics/simulation-link';
import {SimulationArray} from '../simulation/structures/array/simulation-array';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  nodes?: Selection<any, any, d3.BaseType, any>;
  texts?: Selection<any, any, d3.BaseType, any>;
  links?: Selection<any, any, d3.BaseType, any>;
  bstLinks?: Selection<any, any, d3.BaseType, any>;
  arrows?: Selection<any, any, d3.BaseType, any>;
  arrays?: Selection<any, any, d3.BaseType, any>;

  dataHandler: BehaviorSubject<DataHandler | undefined> = new BehaviorSubject<DataHandler | undefined>(undefined);
  currentScenario: BehaviorSubject<Scenario | undefined> = new BehaviorSubject<Scenario | undefined>(undefined);
  scenarios: Scenario[];

  constructor(private httpClient: HttpClient) { }

  getScenarios(): Observable<Scenario[]> {
    return this.httpClient.get<Scenario[]>(`${scenariosPath}/scenarios.json`);
  }

  setupSimulation(): void {
    d3.forceSimulation([])
      .force('charge',
        d3.forceManyBody()
          .strength(-300)
          .distanceMin(10)
      )
      .force('x',
        d3.forceX()
          .x((d: SimulationNode) => d.cx)
          .strength(0.15)
      )
      .force('y',
        d3.forceY()
          .y((d: SimulationNode) => d.cy)
          .strength(0.1)
      )
      .force(
        'link',
        d3.forceLink([])
          .distance(10)
          .strength(1)
      )
      .force(
        'collision',
        d3.forceCollide().radius(defaultRadius)
      )
      .alphaTarget(.5)
      .on('tick', this.ticked);
  }

  @fpsCounter(60)
  ticked(): void {
    this.nodes
      .attr('cx', (d: SimulationNode) => d.x)
      .attr('cy', (d: SimulationNode) => d.y);

    this.texts
      ?.attr('x', (d: SimulationText) => d.x)
      ?.attr('y', (d: SimulationText) => d.y);

    this.links
      ?.attr('x1', (d: SimulationLink) => d.source.x)
      ?.attr('y1', (d: SimulationLink) => d.source.y)
      ?.attr('x2', (d: SimulationLink) => d.target.x)
      ?.attr('y2', (d: SimulationLink) => d.target.y);

    this.bstLinks
      ?.attr('x1', (d: SimulationLink) => d.source.x)
      ?.attr('y1', (d: SimulationLink) => d.source.y)
      ?.attr('x2', (d: SimulationLink) => d.target.x)
      ?.attr('y2', (d: SimulationLink) => d.target.y);

    this.arrows
      ?.attr('x1', (d: SimulationNode) => d.x)
      ?.attr('y1', (d: SimulationNode) => d.y - 150)
      ?.attr('x2', (d: SimulationNode) => d.x)
      ?.attr('y2', (d: SimulationNode) => d.y - 100);

    this.arrays
      ?.attr('x', (d: SimulationArray) => d.x)
      ?.attr('y', (d: SimulationArray) => d.y);
  }

  repaint(): void {

    // this.dataHandler.drawFigures();
    // window.buttonHandler.draw()
    // window.linkHandler.draw() // must be after dataHandler has drawn
    // window.circleManager.draw()

    const svg = d3.select('svg');
    svg.lower();

    // if (window.camera) setTimeout(() => window.camera.reFocus(), 50)

    this.nodes = svg.selectAll('.circle, .button');
    this.texts = svg.selectAll('.circlenames, .circlevalues, .rootnames, .textnode, .buttontext, .textarea');
    this.links = svg.selectAll('.default_link');
    this.bstLinks = svg.selectAll('.BST_line');
    this.arrows = svg.selectAll('.circlearrow');
    this.arrays = svg.selectAll('.array');
  }

}
