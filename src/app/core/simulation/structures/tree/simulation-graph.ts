import {SimulationLink} from '../../basics/simulation-link';
import {BstCell} from './bst-cell';
import {SimulationNode} from '../../basics/simulation-node';
import {SimulationNodeDatum} from 'd3-force';

export class SimulationGraph implements SimulationNodeDatum {
  id: number;

  x: number;
  y: number;

  z = -1;
  isValid = true;
  protected data: BstCell[] = [];
  protected links: SimulationLink[] = [];
  maxId = 0;

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
    return this.links;
  }
}
