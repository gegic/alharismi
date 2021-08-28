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
import {debounceTime, take} from 'rxjs/operators';
import {PlaygroundService} from '../../core/services/playground.service';
import {PromptComponent} from '../prompt/prompt.component';
import {DialogService} from 'primeng/dynamicdialog';
@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements AfterViewInit {

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
              private messageService: MessageService,
              private dialogService: DialogService) { }

  ngAfterViewInit(): void {

    setTimeout(() => this.init(), 600);
  }

  init(): void {
    this.widthHeight = [window.innerWidth, window.innerHeight - 70];

    this.setupSvg();
    const g = this.svg
      .append('g')
      .attr('class', 'canvas');


    this.scenarioService.initSimulation(g, this.widthHeight, this.promptString(this.dialogService));
    this.scenarioService.startSimulation(this.svg);
    this.scenarioService.simulation.camera.focusSvg();
    this.sceneService.scene.subscribe(async sc => {
      this.isVisualizationLoading = true;
      if (!!sc) {
        await sc.setup(this.scenarioService.simulation);
      }
      this.isVisualizationLoading = false;
    });
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

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.widthHeight = [window.innerWidth, window.innerHeight - 70];
    d3.select('#svgCanvas')
      .attr('height', this.widthHeight[1])
      .attr('width', this.widthHeight[0]);

    this.scenarioService.updateWidthHeight(this.widthHeight);
  }


  promptString(dialogService: DialogService): (header: string) => Promise<string> {
    return (header: string) => {
      const ref = dialogService.open(PromptComponent, {
        header,
        baseZIndex: 1000,
      });
      return ref.onClose.pipe(take(1)).toPromise();
    };
  }


  get speed(): number {
    return this._speed;
  }

  set speed(val: number) {
    this._speed = val;
  }

}
