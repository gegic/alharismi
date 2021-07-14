import {Scene} from './scene';
export class Scenario {
  name: string;
  description: string;
  scenes: (typeof Scene)[];
  cover: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.cover = `../../scenarios/${name}/cover.png`;
  }
}
