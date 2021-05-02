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
  allowAddingChildToPlaceholder = true;
  data: BstCell[] = [];
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
    const root = new BstCell(this, this.size++, this.x, this.y);
    root.descriptor = `bst_${root.id}`;
    root.isRoot = true;
    this.addCell(root);
  }

  addCell(cell: BstCell): void {
    this.data.push(cell);
  }

  async remove(d: SimulationNode): Promise<void> {
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {
    if (d.lockedPlaceholder) {
      const dTree = d.lockedPlaceholder.tree;
      await dTree.remove(d);
    }

    bstCell.setNode(d);
    d.lockedPlaceholder = bstCell;

    this.addChildCells(bstCell);
    this.alignForces();
  }

  addChildCells(cell: BstCell): void {
    const cells = [
      new BstCell(this, this.size++, this.x, this.y),
      new BstCell(this, this.size++, this.x, this.y)
    ];

    cells.forEach((c: BstCell) => this.addCell(c));

    this.links.push(
      new SimulationLink(cell, cells[0]),
      new SimulationLink(cell, cells[1])
    );
  }

  setTransform(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.alignForces();
  }

  alignForces(): void {
    this.treeHierarchy = d3
      .hierarchy(this.data[0], (d: BstCell) => this.links.filter(sl => sl.source === d).map(sl => sl.target));

    const treeMap = d3.tree()
      .nodeSize([150, 150]);

    treeMap(this.treeHierarchy)
      .descendants().forEach((d: d3.HierarchyPointNode<BstCell>) => {
        d.x += this.x;
        d.y += this.y;

        d.data.graphMoved(d.x, d.y);
      });
  }

  moveCell(cell: BstCell, xPos: number, yPos: number): void {
    if (cell.isRoot) {
      this.setTransform(xPos, yPos);
      return;
    }
    if (!cell.node) {
      cell.setTarget(cell.graphX, cell.graphY);
      return;
    }
    const hnCell = this.treeHierarchy.descendants()
      .find((hn: d3.HierarchyNode<BstCell>) => hn.data === cell);

    if (!hnCell) {
      return null;
    }

    hnCell
      .descendants().filter(d => d.data !== cell)
      .forEach(hn => {
        hn.data.setTarget(hn.data.graphX, yPos + hn.data.graphY - cell.graphY);
      });

    cell.setTarget(cell.graphX, yPos);
  }
}
