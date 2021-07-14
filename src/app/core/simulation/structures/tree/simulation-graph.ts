import {SimulationLink} from '../../basics/simulation-link';
import {BstCell} from './bst-cell';
import {SimulationNode} from '../../basics/simulation-node';
import {SimulationNodeDatum} from 'd3-force';
import {LinkHelper} from '../../helpers/link-helper';
import {Drawable} from '../../drawable';

export class SimulationGraph implements SimulationNodeDatum, Drawable {
  id: number;

  x: number;
  y: number;

  z = -1;
  isValid = true;
  linkHelper = new LinkHelper();
  protected data: BstCell[] = [];
  maxId = 0;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  moveCell(cell: BstCell, xPos: number, yPos: number): void {
    cell.setTarget(cell.graphX, cell.graphY);
    return;
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {

    bstCell.setNode(d);
    d.lockedPlaceholder = bstCell;

  }

  getData(): BstCell[] {
    return this.data;
  }

  getLinks(): SimulationLink[] {
    return this.linkHelper.links;
  }
}
