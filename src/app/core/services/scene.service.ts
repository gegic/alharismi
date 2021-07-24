import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Scene} from '../simulation/scene';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, mergeMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Scenario} from '../simulation/scenario';
import {scenariosPath} from '../consts';

type JsonScene = {contentPath: string, setupPath: string, playPath: string, content?: string};

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  scene: BehaviorSubject<Scene | undefined> = new BehaviorSubject<Scene | undefined>(undefined);
  played: BehaviorSubject<string> = new BehaviorSubject('not_played');
  set: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
