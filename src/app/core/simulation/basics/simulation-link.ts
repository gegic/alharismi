import {SimulationLinkDatum} from 'd3-force';
import {BstCell} from '../structures/tree/bst-cell';

export class SimulationLink implements SimulationLinkDatum<BstCell> {
  strokeWidth = 10;
  z = -1;
  isSliceable = true;

  id: number | undefined;
  source: BstCell;
  target: BstCell;

  constructor(source: BstCell, target: BstCell) {
    this.source = source;
    this.target = target;
  }

}
