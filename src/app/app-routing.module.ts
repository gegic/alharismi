import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainFrameComponent} from './view/main-frame/main-frame.component';
import {RouterModule, Routes} from '@angular/router';
import {ScenarioGridComponent} from './view/scenario-grid/scenario-grid.component';
import {SceneViewComponent} from './view/scene-view/scene-view.component';
import {PlaygroundComponent} from './view/playground/playground.component';

const routes: Routes = [
  {
    path: '',
    component: MainFrameComponent,
    children:
      [
        {
          path: '',
          component: ScenarioGridComponent
        },
        {
          path: 'visualize/:path',
          redirectTo: 'visualize/:path/0'
        },
        {
          path: 'visualize/:path/:sceneIndex',
          component: SceneViewComponent
        },
        {
          path: 'playground',
          component: PlaygroundComponent
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
