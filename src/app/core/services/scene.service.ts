import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {Scene} from '../simulation/scene';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, mergeMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Scenario} from '../simulation/scenario';
import {scenariosPath} from '../consts';

type JsonScene = {contentPath: string, scriptPath: string, content?: string};

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  scene: BehaviorSubject<Scene | undefined> = new BehaviorSubject<Scene | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }

  getScene(scenarioPath: string, scenePath: string): Observable<Scene> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.httpClient
      .get<JsonScene>(`${scenariosPath}/${scenarioPath}/${scenePath}/${scenePath}.json`)
      .pipe(
        mergeMap(sc => {
          return this.httpClient
            .get(`${scenariosPath}/${scenarioPath}/${scenePath}/${sc.contentPath}`, {headers, responseType: 'text'})
            .pipe(map(content => { sc.content = content; return sc; }));
        }),
        map(sc => new Scene(sc))
      );
  }
}
