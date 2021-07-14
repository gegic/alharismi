import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {SimulationNode} from '../../core/simulation/basics/simulation-node';
import {SimulationLink} from '../../core/simulation/basics/simulation-link';
import {ScenarioService} from '../../core/services/scenario.service';
import {ArrowheadHelper} from '../../core/simulation/helpers/arrowhead-helper';
import {SceneService} from '../../core/services/scene.service';
import {Scene} from '../../core/simulation/scene';
@Component({
  selector: 'app-visualization-view',
  templateUrl: './visualization-view.component.html',
  styleUrls: ['./visualization-view.component.css']
})
export class VisualizationViewComponent implements AfterViewInit {

  private _speed = 1;
  private _isVisualizationLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  width = 500;
  height = 500;

  svg: Selection<any, any, null, undefined>;

  @ViewChild('canvas')
  canvasElement: ElementRef<HTMLDivElement>;

  constructor(private router: Router,
              private scenarioService: ScenarioService,
              private sceneService: SceneService) { }

  ngAfterViewInit(): void {

    this.setupSvg();
    const g = this.svg
      .append('g')
      .attr('class', 'canvas');
    this.scenarioService.initSimulation(g);
    this.scenarioService.startSimulation(this.svg);
    this.sceneService.scene.subscribe(scene => {
      this.scenarioService.simulation.reset();
      scene.setup(this.scenarioService.simulation);
    });
  }

  openInPlayground(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([''])
    );

    window.open(url, '_blank');
  }

  setupSvg(): void {
    this.svg = d3.select(this.canvasElement.nativeElement).append('svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .style('background', '#282828');

    ArrowheadHelper.addArrowhead(this.svg);

    this.svg.append('filter')
      .attr('id', 'blur')
      .append('feGaussianBlur')
      .attr('stdDeviation', 5);
  }

  get speed(): number {
    return this._speed;
  }

  set speed(val: number) {
    this._speed = val;
  }

  get isVisualizationLoading(): boolean {
    return this._isVisualizationLoading.getValue();
  }

  @Input()
  set isVisualizationLoading(val: boolean) {
    this._isVisualizationLoading.next(val);
  }
}
