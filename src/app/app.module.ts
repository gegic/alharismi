import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainFrameComponent } from './view/main-frame/main-frame.component';
import {MenubarModule} from 'primeng/menubar';
import { NavbarComponent } from './view/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {ButtonModule} from 'primeng/button';
import {MessageService, SharedModule} from 'primeng/api';
import { ScenarioGridComponent } from './view/scenario-grid/scenario-grid.component';
import {CardModule} from 'primeng/card';
import { SceneViewComponent } from './view/scene-view/scene-view.component';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {InputNumberModule} from 'primeng/inputnumber';
import {HttpClientModule} from '@angular/common/http';
import {ContentViewComponent} from './view/content-view/content-view.component';
import {SkeletonModule} from 'primeng/skeleton';
import { VisualizationViewComponent } from './view/visualization-view/visualization-view.component';
import {ToastModule} from 'primeng/toast';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    AppComponent,
    MainFrameComponent,
    NavbarComponent,
    ScenarioGridComponent,
    SceneViewComponent,
    ContentViewComponent,
    VisualizationViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenubarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    SharedModule,
    CardModule,
    RippleModule,
    OverlayPanelModule,
    InputTextModule,
    SliderModule,
    InputNumberModule,
    SkeletonModule,
    ToastModule,
    ScrollPanelModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
