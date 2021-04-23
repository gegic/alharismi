import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {SimulationNode} from '../../core/simulation/basics/simulation-node';
import {defaultRadius} from '../../core/consts';
import {SimulationLink} from '../../core/simulation/basics/simulation-link';
import {SimulationNodeDatum} from 'd3-force';
import {ticked} from '../../core/d3-utils/ticked';
import {SimulationText} from '../../core/simulation/basics/simulation-text';
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
  nodes = [];
  links: SimulationLink[];

  draggedNode: SimulationNode;

  @ViewChild('canvas')
  canvas: ElementRef<HTMLDivElement>;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {

    this.svg = d3.select(this.canvas.nativeElement).append('svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .style('background', '#282828');

    this.addFilters();
    this.setupSimulation();

  }

  openInPlayground(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([''])
    );

    window.open(url, '_blank');
  }

  addFilters(): void {
    this.svg.append('filter')
      .attr('id', 'blur')
      .append('feGaussianBlur')
      .attr('stdDeviation', 5);
  }

  setupSimulation(): void {
    const alpha = .5;
    const fpsTextElement = new SimulationText('FPS', parseInt(this.svg.attr('width'), 10) * 0.95,
      parseInt(this.svg.attr('height'), 10) * 0.95);
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
