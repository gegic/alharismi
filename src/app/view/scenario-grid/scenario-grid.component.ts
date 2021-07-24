import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ScenarioService} from '../../core/services/scenario.service';
import {Scenario} from '../../core/simulation/scenario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scenario-grid',
  templateUrl: './scenario-grid.component.html',
  styleUrls: ['./scenario-grid.component.css']
})
export class ScenarioGridComponent implements OnInit {

  constructor(private scenarioService: ScenarioService,
              private router: Router) { }

  ngOnInit(): void {
  }

  visualize(event: MouseEvent, scenario: Scenario): void {
    event.stopPropagation();
    this.scenarioService.currentScenario.next(scenario);
    this.router.navigate(['visualize', scenario.path, 0]);
  }

  playground(): void {
    event.stopPropagation();
    this.router.navigate(['playground']);
  }

  get scenarios(): Scenario[] {
    return this.scenarioService.scenarios;
  }
}
