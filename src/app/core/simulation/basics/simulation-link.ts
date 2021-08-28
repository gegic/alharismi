import {SimulationLinkDatum} from 'd3-force';
import {BstCell} from '../structures/tree/bst-cell';

export class SimulationLink implements SimulationLinkDatum<BstCell> {
  strokeWidth = 10;
  z = -1;

  id: number | undefined;
  source: BstCell;
  target: BstCell;

  yDisplacement: number;

  constructor(source: BstCell, target: BstCell, yDisplacement = 0) {
    this.source = source;
    this.target = target;
    this.yDisplacement = yDisplacement;
  }

}
