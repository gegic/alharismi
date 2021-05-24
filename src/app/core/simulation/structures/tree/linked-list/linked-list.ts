import {SimulationGraph} from '../simulation-graph';
import {BstCell} from '../bst-cell';
import {SimulationNode} from '../../../basics/simulation-node';
import {SimulationLink} from '../../../basics/simulation-link';

export interface Reference {
  prev: number | undefined;
  next: number | undefined;
}

export class LinkedList extends SimulationGraph {

  linkDistance = 100;
  double: boolean;
  pointers: { [id: number]: Reference} = {};
  constructor(id: number, x: number, y: number, double = false) {
    super(id, x, y);
    this.double = double;
  }

  init(): void {
    const head = new BstCell(this, -1, this.x, this.y, 'Head');
    head.isRoot = true;
    this.addCell(head, null);
    if (this.double) {
      const tail = new BstCell(this, -2, this.x, this.y, 'Tail');
      this.addCell(tail, head);
      this.links.push(new SimulationLink(head, tail));
      this.links.push(new SimulationLink(tail, head));
    }
  }

  addCell(cell: BstCell, predecessor: BstCell | null): void {
    this.data.push(cell);
    this.pointers[cell.id] = {next: undefined, prev: undefined};
    if (predecessor) {
      const successor = this.getSuccessor(predecessor);

      this.pointers[predecessor.id].next = cell.id;
      if (successor) {
        this.pointers[cell.id].next = successor.id;
        const foundIndex = this.links.findIndex((sl: SimulationLink) => sl.source.id === predecessor.id && sl.target.id === successor.id);
        if (foundIndex !== -1) {
          this.links.splice(foundIndex, 1);
        }
        this.links.push(new SimulationLink(cell, successor));
      }
      this.links.push(new SimulationLink(predecessor, cell));
      if (this.double) {
        this.pointers[cell.id].prev = predecessor.id;
        if (successor) {
          this.pointers[successor.id].prev = cell.id;

          const foundIndex = this.links.findIndex((sl: SimulationLink) => sl.target.id === predecessor.id && sl.source.id === successor.id);
          if (foundIndex !== -1) {
            this.links.splice(foundIndex, 1);
          }
          this.links.push(new SimulationLink(successor, cell));
        }
        this.links.push(new SimulationLink(cell, predecessor));
      }
    }
    this.alignForces();
  }

  alignForces(): void {
    const head = this.getHead();
    let predecessor = head;
    predecessor.graphMoved(this.x, this.y);
    let successor = this.getSuccessor(head);
    while (successor) {
      successor.graphMoved(predecessor.graphX + this.linkDistance, predecessor.graphY);
      predecessor = successor;
      successor = this.getSuccessor(successor);
    }
  }

  async add(d: SimulationNode, headCell: BstCell): Promise<void> {
    headCell.setNode(d);
    d.lockedPlaceholder = headCell;
    let nextCell = new BstCell(this, this.maxId++, headCell.x, headCell.y);
    this.addCell(nextCell, headCell);
    this.alignForces();
    await new Promise(r => setTimeout(r, 300));
    nextCell = this.getSuccessor(headCell);
    d = headCell.removeNode();
    d.setTarget(headCell.x, headCell.y - 100);
    d.setTarget(nextCell.x, nextCell.y);
    await new Promise(r => setTimeout(r, 600));
    nextCell.setNode(d);
  }

  /**
   * Sets horizontal and vertical position of the linked list.
   * @param x - Horizontal position.
   * @param y - Vertical position.
   */
  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.alignForces();
  }

  /**
   * Moves the whole tree if the cell is head, otherwise
   * returns the cell to its previous position
   * @param cell - Moved cell.
   * @param xPos - Horizontal position of the cell.
   * @param yPos - Vertical position of the cell.
   */
  moveCell(cell: BstCell, xPos: number, yPos: number): void {
    if (cell.isRoot) {
      this.setPosition(xPos, yPos);
      return;
    }
    else {
      cell.setTarget(cell.graphX, cell.graphY);
      return;
    }
  }

  protected getSuccessor(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    const successorId = this.pointers[cell.id].next;
    if (successorId === -1) {
      return undefined;
    }
    return this.data.find((c: BstCell) => c.id === successorId);
  }

  protected getHead(): BstCell {
    return this.getCellById(-1);
  }

  protected getCellById(id: number): BstCell | undefined {
    return this.data.find((c: BstCell) => c.id === id);
  }
}
