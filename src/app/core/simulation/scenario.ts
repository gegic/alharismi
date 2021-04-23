import {Scene} from './scene';
export class Scenario {
  name: string;
  path: string;
  description: string;
  scenes: string[];
  cover: string;
  setup: () => void;

  constructor(jsonScenario: {name: string, path: string, description: string, scenes: string[]}) {
    this.name = jsonScenario.name;
    this.path = jsonScenario.path;
    this.description = jsonScenario.description;
    this.scenes = jsonScenario.scenes;
    this.cover = `../../scenarios/${jsonScenario.path}/cover.png`;
  }
}
