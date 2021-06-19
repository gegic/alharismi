import { Injectable } from '@angular/core';
import {VisParser} from '../vis-grammar/vis-parser';

@Injectable({
  providedIn: 'root'
})
export class VisService {

  parser: VisParser = new VisParser();

  constructor() { }

  
}
