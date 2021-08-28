import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {ScenarioService} from '../../core/services/scenario.service';
import {ArrowheadHelper} from '../../core/simulation/helpers/arrowhead-helper';
import {SceneService} from '../../core/services/scene.service';
import {Scene} from '../../core/simulation/scene';
import {MessageService} from 'primeng/api';
import {debounceTime} from 'rxjs/operators';
import {PlaygroundService} from '../../core/services/playground.service';
import {DialogService} from 'primeng/dynamicdialog';
import {PromptComponent} from '../prompt/prompt.component';

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
              private playgroundService: PlaygroundService,
              private messageService: MessageService,
              private dialogService: DialogService) { }

  ngAfterViewInit(): void {

    setTimeout(() => this.init(), 600);
  }
  init(): void {
    this.widthHeight = [this.skeletonElement.nativeElement.offsetWidth, this.skeletonElement.nativeElement.offsetHeight - 10];

    this.setupSvg();
    const g = this.svg
      .append('g')
      .attr('class', 'canvas');

    this.scenarioService.initSimulation(g, this.widthHeight, this.promptString(this.dialogService));
    this.scenarioService.startSimulation(this.svg);
    this.scenarioService.simulation.camera.focusSvg();
    this.scenarioService.simulation.interactable = false;
    this.readScene();
  }

  openInPlayground(): void {
    this.router.navigate(['playground']);
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
      console.log(e);
    }
    this.scene.played = 'played';
    this.sceneService.played.next('played');
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
    this.sceneService.set.next(true);
  }

  async resetScene(): Promise<void> {
    await this.setScene(this.scene);
    this.scene.played = 'not_played';
    this.sceneService.played.next('not_played');
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

  promptString(dialogService: DialogService): (header: string) => Promise<string> {
    return async (header: string) => {
      const ref = dialogService.open(PromptComponent, {
        header,
        baseZIndex: 1000,
        width: '50%'
      });
      return await ref.onClose.toPromise();
    };
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
