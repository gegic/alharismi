import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../basics/simulation-link';
import {SimulationGraph} from './simulation-graph';
import {BstCell} from './bst-cell';
import {BstCellDrag} from '../../helpers/drag/bst-cell-drag';
import {BstCellMouse} from '../../helpers/mouse/bst-cell-mouse';
import {SimulationLoop} from '../../handlers/simulation-loop';

export class BinarySearchTree extends SimulationGraph {
  id: number;

  x: number;
  y: number;

  z = -1;
  isValid = true;
  _data: (BstCell | undefined)[] = [];
  incomingLinks: SimulationLink[] = [];
  outgoingLinks: SimulationLink[] = [];
  size = 0;

  treeHierarchy?: d3.HierarchyNode<BstCell>;

  constructor(id: number, x: number, y: number) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
    this.setRoot();
  }

  setRoot(): void {
    const root = new BstCell(this, 1, this.x, this.y);
    root.descriptor = `bst_${root.id}`;
    root.isRoot = true;
    this.addCell(root);
  }

  addCell(cell: BstCell): void {
    this.setData(cell);
    this.size++;
  }

  async remove(d: SimulationNode): Promise<void> {
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {

    bstCell.setNode(d);
    d.lockedPlaceholder = bstCell;

    this.addChildCells(bstCell);
    this.alignForces();

    const isValid = this.checkEntry(bstCell);

    if (!isValid) {
      this.isValid = false;
      bstCell.isValid = false;
    }
  }

  addChildCells(cell: BstCell): void {
    const cells = [
      new BstCell(this, 2 * cell.id, cell.x, cell.y),
      new BstCell(this, 2 * cell.id + 1, cell.x, cell.y)
    ];

    cells.forEach((c: BstCell) => this.addCell(c));

    this.links.push(
      new SimulationLink(cell, cells[0]),
      new SimulationLink(cell, cells[1])
    );
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.alignForces();
  }

  alignForces(): void {
    this.treeHierarchy = d3
      .hierarchy(this.getData(1), (d: BstCell) => this.links.filter(sl => sl.source === d).map(sl => sl.target));

    const treeMap = d3.tree()
      .nodeSize([110, 110]);

    treeMap(this.treeHierarchy)
      .descendants().forEach((d: d3.HierarchyPointNode<BstCell>) => {
        d.x += this.x;
        d.y += this.y;

        d.data.graphMoved(d.x, d.y);
      });
  }

  moveCell(cell: BstCell, xPos: number, yPos: number): void {
    if (cell.isRoot) {
      this.setPosition(xPos, yPos);
      return;
    }
    else {
      cell.setTarget(cell.graphX, cell.graphY);
      return;
    }

    // SOME OTHER BEHAVIOR :D won't use it

    // const hnCell = this.treeHierarchy.descendants()
    //   .find((hn: d3.HierarchyNode<BstCell>) => hn.data === cell);
    //
    // if (!hnCell) {
    //   return null;
    // }
    //
    // cell.setTarget(cell.graphX, yPos);
    //
    // hnCell
    //   .descendants().filter(d => d.data !== cell)
    //   .forEach(hn => {
    //     hn.data.setTarget(hn.data.graphX, yPos + hn.data.graphY - cell.graphY);
    //   });

  }

  private checkEntry(cell: BstCell): boolean {
    let parent = this.getParent(cell);
    let child = cell;
    while (!!parent) {
      // if the left child
      if (child.id % 2 === 0) {
        if (cell.node.value > parent.node.value) {
          return false;
        }
      } else {
        if (cell.node.value < parent.node.value) {
          return false;
        }
      }
      child = parent;
      parent = this.getParent(parent);
    }

    return true;
  }

  private getParent(cell: BstCell): BstCell {
    return this.getData(Math.floor(cell.id / 2));
  }

  private getLeftChild(cell: BstCell): BstCell {
    return this.getData(2 * cell.id);
  }

  private getRightChild(cell: BstCell): BstCell {
    return this.getData(2 * cell.id + 1);
  }

  private setData(cell: BstCell): void {
    this._data[cell.id - 1] = cell;
  }

  private getData(index: number): BstCell {
    return this._data[index - 1];
  }

  get data(): BstCell[] {
    return this._data.filter((d: BstCell | undefined) => !!d);
  }
}
