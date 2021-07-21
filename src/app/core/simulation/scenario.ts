import {Scene} from './scene';
export class Scenario {
  name: string;
  description: string;
  scenes: (typeof Scene)[];
  cover: string;
  path: string;

  constructor(name: string, path: string, description: string) {
    this.name = name;
    this.path = path;
    this.description = description;
    this.cover = `../../scenarios/${name}/cover.png`;
  }
}
