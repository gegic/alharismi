import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScenarioService} from '../../core/services/scenario.service';
import {SceneService} from '../../core/services/scene.service';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Scenario} from '../../core/simulation/scenario';
import {Scene} from '../../core/simulation/scene';

@Component({
  selector: 'app-scene-view',
  templateUrl: './scene-view.component.html',
  styleUrls: ['./scene-view.component.css']
})
export class SceneViewComponent implements OnInit {

  isContentLoading = true;

  scenarioPath: string;
  sceneIndex: number;

  constructor(private scenarioService: ScenarioService,
              private sceneService: SceneService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.isContentLoading = true;
      if (!val.path || !val.sceneIndex) {
        this.router.navigate(['']);
      }
      this.scenarioPath = val.path;
      this.sceneIndex = parseInt(val.sceneIndex, 10);
      this.prepareScene();
    });
  }

  prepareScene(): void {

    const scenario = this.scenarioService.scenarios.find(sc => sc.path === this.scenarioPath);
    if (!!scenario && scenario.scenes.length < 1) {
      this.router.navigate(['']);
    }
    this.scenarioService.currentScenario.next(scenario);
    const sceneClass = this.scenes[this.sceneIndex];
    const scene = new sceneClass();
    scene.isFirst = this.sceneIndex === 0;
    scene.isLast = this.sceneIndex === this.scenes.length - 1;
    this.sceneService.scene.next(scene);
    this.sceneService.played.next(scene.played);
    this.sceneService.set.next(false);
    this.isContentLoading = false;
  }

  showNext(): void {
    if (this.sceneIndex < this.scenes.length - 1) {
      this.router.navigate([`../${(this.sceneIndex + 1).toString()}`], {relativeTo: this.activatedRoute});
    }
  }

  showPrevious(): void {
    if (this.sceneIndex > 0) {
      this.router.navigate([`../${(this.sceneIndex - 1).toString()}`], {relativeTo: this.activatedRoute});
    }
  }

  finish(): void {
    this.router.navigate(['']);
  }

  get scenes(): (typeof Scene)[] {
    return this.scenarioService.currentScenario.getValue().scenes;
  }

  get scene(): Scene | undefined {
    return this.sceneService.scene.getValue();
  }

}
