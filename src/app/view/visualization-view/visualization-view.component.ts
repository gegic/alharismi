import {AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
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
import {MessageService} from 'primeng/api';
import {Skeleton} from 'primeng/skeleton';
import {debounceTime} from 'rxjs/operators';
@Component({
  selector: 'app-visualization-view',
  templateUrl: './visualization-view.component.html',
  styleUrls: ['./visualization-view.component.css']
})
export class VisualizationViewComponent implements AfterViewInit {

  private _speed = 1;
  isVisualizationLoading = true;
  widthHeight: [number, number] = [0, 0];


  svg: Selection<any, any, null, undefined>;

  @ViewChild('canvas')
  canvasElement: ElementRef<HTMLDivElement>;

  @ViewChild('skeleton')
  skeletonElement: ElementRef<HTMLDivElement>;

  constructor(private router: Router,
              private scenarioService: ScenarioService,
              private sceneService: SceneService,
              private messageService: MessageService) { }

  ngAfterViewInit(): void {
    this.widthHeight = [this.skeletonElement.nativeElement.offsetWidth, this.skeletonElement.nativeElement.offsetHeight - 10];

    this.setupSvg();
    const g = this.svg
      .append('g')
      .attr('class', 'canvas');

    this.scenarioService.initSimulation(g, this.widthHeight);
    this.scenarioService.startSimulation(this.svg);
    this.scenarioService.simulation.camera.focusSvg();
    this.scenarioService.simulation.interactable = false;
    this.readScene();
  }

  openInPlayground(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([''])
    );

    window.open(url, '_blank');
  }

  setupSvg(): void {
    this.svg = d3.select(this.canvasElement.nativeElement).append('svg')
      .attr('id', 'svgCanvas')
      .attr('height', this.widthHeight[1])
      .attr('width', this.widthHeight[0])
      .style('background', '#282828');

    ArrowheadHelper.addArrowhead(this.svg);

    this.svg.append('filter')
      .attr('id', 'blur')
      .append('feGaussianBlur')
      .attr('stdDeviation', 5);

  }

  async play(): Promise<void> {
    this.scene.played = 'playing';
    try {
      await this.scene.play(this.scenarioService.simulation);
    } catch (e: any) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: e});
    }
    this.scene.played = 'played';
  }

  readScene(): void {
    this.sceneService.scene.pipe(debounceTime(50)).subscribe(async sc => {
      this.isVisualizationLoading = true;
      await this.setScene(sc);
      this.isVisualizationLoading = false;
    });
  }

  async setScene(sc: Scene): Promise<void> {
    this.scenarioService.simulation.reset();
    await sc.setup(this.scenarioService.simulation);
  }

  async resetScene(): Promise<void> {
    await this.setScene(this.scene);
    this.scene.played = 'not_played';
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (!this.isVisualizationLoading) {
      this.widthHeight = [this.canvasElement.nativeElement.offsetWidth, this.canvasElement.nativeElement.offsetHeight - 10];
    } else {
      this.widthHeight = [this.skeletonElement.nativeElement.offsetWidth, this.skeletonElement.nativeElement.offsetHeight - 10];
    }
    d3.select('#svgCanvas')
      .attr('height', this.widthHeight[1])
      .attr('width', this.widthHeight[0]);

    this.scenarioService.updateWidthHeight(this.widthHeight);
  }

  get speed(): number {
    return this._speed;
  }

  set speed(val: number) {
    this._speed = val;
  }

  get scene(): Scene {
    return this.sceneService.scene.getValue();
  }

}
