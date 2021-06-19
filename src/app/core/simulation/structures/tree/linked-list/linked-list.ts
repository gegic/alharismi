import {SimulationGraph} from '../simulation-graph';
import {BstCell} from '../bst-cell';
import {SimulationNode} from '../../../basics/simulation-node';
import {SimulationLink} from '../../../basics/simulation-link';

export interface Reference {
  prev: number | undefined;
  next: number | undefined;
}

export class LinkedList extends SimulationGraph {

  linkDistance = 150;
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
    const tail = new BstCell(this, -2, this.x, this.y, 'Tail');
    this.addCell(tail, head);
  }

  addCell(cell: BstCell, predecessor: BstCell | null): void {
    this.data.push(cell);
    this.pointers[cell.id] = {next: undefined, prev: undefined};
    if (predecessor) {
      const successor = this.getSuccessor(predecessor);

      this.pointers[predecessor.id].next = cell.id;
      if (successor) {
        this.pointers[cell.id].next = successor.id;
        this.linkHelper.removeLink(predecessor, successor);
        this.linkHelper.addLink(cell, successor, this.double ? -20 : 0);
      }
      this.linkHelper.addLink(predecessor, cell, this.double ? -20 : 0);
      if (this.double) {
        this.pointers[cell.id].prev = predecessor.id;
        if (successor) {
          this.pointers[successor.id].prev = cell.id;
          this.linkHelper.removeLink(successor, predecessor);
          this.linkHelper.addLink(successor, cell, 20);
        }
        this.linkHelper.addLink(cell, predecessor, 20);
      } else if (successor && successor.id === -2) {
        this.pointers[successor.id].prev = cell.id;
      } else if (cell.id === -2) {
        this.pointers[cell.id].prev = predecessor.id;
      }
    }
    this.alignForces();
  }

  async popFirst(): Promise<void> {
    const head = this.getHead();
    const toDelete = this.getSuccessor(head);
    if (toDelete.id === -2) {
      return;
    }
    const node = toDelete.removeNode();
    node.setTarget(this.x, this.y - 200);
    await this.deleteCell(toDelete, head);
    this.alignForces();
  }

  async popLast(): Promise<void> {
    const tail = this.getTail();
    const toDelete = this.getPredecessor(tail);
    if (toDelete.id === -2) {
      return;
    }
    const node = toDelete.removeNode();
    node.setTarget(this.x, this.y - 200);
    const predecessor = await this.findPredecessor(toDelete);
    await this.deleteCell(toDelete, predecessor);
    this.alignForces();
  }

  async delete(index: number): Promise<void> {
    if (index > this.data.length - 2 || index < 0) {
      throw new Error('Invalid index');
    }
    let predecessor = this.getHead();
    let cell = this.getSuccessor(predecessor);

    for (let i = 0; i < index; ++i) {
      if (this.double && predecessor) {
        predecessor.highlight('#98dc73');
      }
      cell.highlight('#FF5A5A94');
      await new Promise(r => setTimeout(r, 600));
      if (predecessor) {
        predecessor.resetColor();
      }
      cell.resetColor();
      cell = this.getSuccessor(cell);
      if (this.double) {
        predecessor = cell;
      }
    }

    if (this.double) {
      predecessor = this.getPredecessor(cell);
      predecessor.highlight('#98dc73');
    }
    const node = cell.removeNode();
    node.setTarget(this.x, this.y - 200);
    await new Promise(r => setTimeout(r, 600));
    predecessor.resetColor();
    await this.deleteCell(cell, predecessor);
    this.alignForces();
  }

  async deleteCell(cell: BstCell, predecessor: BstCell): Promise<void> {
    const deletionIndex = this.data.findIndex(c => c.id === cell.id);
    this.data.splice(deletionIndex, 1);
    const successor = this.getSuccessor(cell);
    this.pointers[predecessor.id].next = successor.id;
    this.linkHelper.removeLink(predecessor, cell);
    this.linkHelper.removeLink(cell, successor);
    this.linkHelper.addLink(predecessor, successor, this.double ? -20 : 0);
    if (this.double) {
      this.pointers[successor.id].prev = predecessor.id;
      this.linkHelper.removeLink(cell, predecessor);
      this.linkHelper.removeLink(successor, cell);
      this.linkHelper.addLink(successor, predecessor, 20);
    } else if (successor.id === -2) {
      this.pointers[successor.id].prev = predecessor.id;
    }
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

  async prepend(d: SimulationNode): Promise<void> {
    const head = this.getHead();
    d.setTarget(head.x, head.y);
    await new Promise(r => setTimeout(r, 600));
    await this.addToHead(d, head);
  }

  async append(d: SimulationNode): Promise<void> {
    const tail = this.getTail();
    d.setTarget(tail.x, tail.y);
    await new Promise(r => setTimeout(r, 600));
    await this.addToTail(d, tail);
  }

  async insert(d: SimulationNode, index: number): Promise<void> {
    if (index > this.data.length - 2 || index < 0) {
      throw new Error('Invalid index');
    }
    let startingCell = this.getHead();
    for (let i = 0; i < index; ++i) {
      startingCell.highlight('#98dc73');
      d.setTarget(startingCell.x, startingCell.y - 200);
      await new Promise(r => setTimeout(r, 600));
      startingCell.resetColor();
      startingCell = this.getSuccessor(startingCell);
      await new Promise(r => setTimeout(r, 600));
    }

    startingCell.highlight('#98dc73');
    d.setTarget(startingCell.x + this.linkDistance / 2, startingCell.y - 60);
    await new Promise(r => setTimeout(r, 600));
    startingCell.resetColor();
    const newCell = new BstCell(this, this.maxId++, startingCell.x, startingCell.y);
    await new Promise(r => setTimeout(r, 300));
    await this.addCell(newCell, startingCell);
    newCell.setNode(d);
  }

  async add(d: SimulationNode, addingCell: BstCell): Promise<void> {
    if (addingCell.id === -1) {
      await this.addToHead(d, addingCell);
    } else if (addingCell.id === -2) {
      await this.addToTail(d, addingCell);
    }
  }

  async addToHead(d: SimulationNode, headCell: BstCell): Promise<void> {
    headCell.setNode(d);
    d.lockedPlaceholder = headCell;
    let nextCell = new BstCell(this, this.maxId++, headCell.x, headCell.y);
    this.addCell(nextCell, headCell);
    this.alignForces();
    await new Promise(r => setTimeout(r, 300));
    nextCell = this.getSuccessor(headCell);
    await this.passNode(d, headCell, nextCell);
  }

  async addToTail(d: SimulationNode, tailCell: BstCell): Promise<void> {
    tailCell.setNode(d);
    d.lockedPlaceholder = tailCell;
    const predecessor = this.getPredecessor(tailCell);
    let previousCell = new BstCell(this, this.maxId++, tailCell.x, tailCell.y);
    this.addCell(previousCell, predecessor);
    this.alignForces();
    await new Promise(r => setTimeout(r, 300));
    previousCell = this.getPredecessor(tailCell);
    await this.passNode(d, tailCell, previousCell);
  }

  async passNode(d: SimulationNode, source: BstCell, target: BstCell): Promise<void> {
    d = source.removeNode();
    d.setTarget(source.x, source.y - 100);
    d.setTarget(target.x, target.y);
    await new Promise(r => setTimeout(r, 600));
    target.setNode(d);
    d.lockedPlaceholder = target;
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
    if (successorId === undefined) {
      return undefined;
    }
    return this.data.find((c: BstCell) => c.id === successorId);
  }

  async findPredecessor(cell: BstCell): Promise<BstCell | undefined> {
    if (cell.id === -1) {
      return undefined;
    } else if (this.double || cell.id === -2) {
      const pred = this.getPredecessor(cell);
      pred.highlight('#98dc73');
      await new Promise(r => setTimeout(r, 600));
      pred.resetColor();
      return pred;
    }
    let predecessor = this.getHead();
    while (predecessor) {
      const potentialCell = this.getSuccessor(predecessor);
      predecessor.highlight('#98dc73');
      await new Promise(r => setTimeout(r, 600));
      predecessor.resetColor();

      if (potentialCell.id === cell.id) {
        return predecessor;
      }
      predecessor = potentialCell;
    }
  }

  protected getPredecessor(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    if (this.double || cell.id === -2) {
      const predecessorId = this.pointers[cell.id].prev;
      if (predecessorId === undefined) {
        return undefined;
      }
      return this.data.find((c: BstCell) => c.id === predecessorId);
    }
    return undefined;
  }

  protected getHead(): BstCell {
    return this.getCellById(-1);
  }

  protected getTail(): BstCell {
    return this.getCellById(-2);
  }

  protected getCellById(id: number): BstCell | undefined {
    return this.data.find((c: BstCell) => c.id === id);
  }
}
