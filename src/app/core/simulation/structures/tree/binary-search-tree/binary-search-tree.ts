import {SimulationNode} from '../../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../../basics/simulation-link';
import {SimulationGraph} from '../simulation-graph';
import {BstCell} from '../bst-cell';
import {BstCellMouse} from '../../../helpers/mouse/bst-cell-mouse';

export class BinarySearchTree extends SimulationGraph {
  id: number;

  x: number;
  y: number;

  z = -1;
  isValid = true;
  _data: (BstCell | undefined)[] = [];
  links: SimulationLink[] = [];
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
    root.descriptor = `bst_${this.id}`;
    root.isRoot = true;
    this.addCell(root);
  }

  addCell(cell: BstCell): void {
    this.setData(cell);
    this.size++;
  }

  deleteCell(cell: BstCell): void {
    this.links = this.links.filter((sl: SimulationLink) => sl.target !== cell && sl.source !== cell);
    this.removeData(cell);
    this.size--;
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
      .hierarchy(this.getData(1), (d: BstCell) => {
        const children: BstCell[] = [];
        const leftChild = this.getLeftChild(d);
        const rightChild = this.getRightChild(d);
        if (!!leftChild) {
          children.push(leftChild);
        }
        if (!!rightChild) {
          children.push(rightChild);
        }

        return children;
      });

    const treeMap = d3.tree()
      .nodeSize([200, 200]);

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

  }

  async find(value: number): Promise<BstCell | null> {

    if (this.size === 0) {
      return null;
    }

    let checkingCell = this.data[0];

    while (checkingCell) {
      if (!checkingCell.node) {
        return null;
      }
      const node = checkingCell.node;
      node.drawArrow = true;

      await new Promise(r => setTimeout(r, 600));

      node.drawArrow = false;

      if (node.value === value) {
        node.highlighted = true;
        await new Promise(r => setTimeout(r, 600));
        node.highlighted = false;
        return checkingCell;
      } else if (value < node.value) {
        checkingCell = this.getLeftChild(checkingCell);
      } else {
        checkingCell = this.getRightChild(checkingCell);
      }
    }
  }

  async delete(value: number): Promise<SimulationNode | null> {
    const found = await this.find(value);
    if (!found) {
      return null;
    }
    const leftChild = this.getLeftChild(found);
    const rightChild = this.getRightChild(found);

    if (!leftChild.node && !rightChild.node) {
      return await this.deleteLeaf(found, leftChild, rightChild);
    } else if (!leftChild.node || !rightChild.node) {
      return await this.deleteOnlyChild(found, leftChild, rightChild);
    } else {
      return await this.deleteTwoChildren(found, leftChild, rightChild);
    }
  }

  async deleteLeaf(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<SimulationNode> {
    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.alignForces();
    console.log(this._data);

    return target.removeNode();
  }

  async deleteOnlyChild(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<SimulationNode> {
    const parent = this.getParent(target);
    const takenCell = !!leftChild.node ? leftChild : rightChild;
    const freeCell = !leftChild.node ? leftChild : rightChild;
    this.deleteCell(freeCell);
    this.deleteCell(target);

    await this.switchSubtree(takenCell, target);

    const node = target.removeNode();

    if (!!node) {
      node.setTarget(this.x, this.y - 100);
    }

    await new Promise(r => setTimeout(r, 600));

    if (parent) {
      this.links.push(new SimulationLink(parent, takenCell));
    } else {
      takenCell.descriptor = target.descriptor;
      takenCell.isRoot = true;
    }
    this.alignForces();

    console.log(this._data);
    return node;
  }

  async deleteTwoChildren(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<SimulationNode> {
    const substituteCell = this.findMax(leftChild);
    const substituteNode = substituteCell.removeNode();

    const node = target.removeNode();
    node.setTarget(this.x, this.y - 100);

    substituteNode.setTarget(target.x, target.y);

    await new Promise(r => setTimeout(r, 600));

    target.setNode(substituteNode);

    const substituteLeft = this.getLeftChild(substituteCell);
    const substituteRight = this.getRightChild(substituteCell);


    // if (substituteCell === leftChild) {
    //   return;
    // }
    if (!substituteLeft.node && !substituteRight.node) {
      await this.deleteLeaf(substituteCell, substituteLeft, substituteRight);
    } else if (!substituteLeft.node || !substituteRight.node) {
      await this.deleteOnlyChild(substituteCell, substituteLeft, substituteRight);
    }
    console.log(this._data);

    return node;
  }

  async switchSubtree(sourceSubtreeRoot: BstCell, destinationCell: BstCell): Promise<void> {
    let parentId: number;

    const queue: number[] = [];

    const generator = this.bfTraversal(sourceSubtreeRoot);

    queue.push(destinationCell.id);

    while (queue.length > 0) {
      parentId = queue.shift();

      const next = generator.next();

      if (next.done) {
        return;
      }

      const cell: BstCell = next.value;

      const oldId = cell.id;
      this.removeData(cell);
      cell.id = parentId;
      this.setData(cell);

      if (this.getData(oldId * 2 + 1)) {
        queue.push(parentId * 2 + 1);
      }
      if (this.getData(oldId * 2)) {
        queue.push(parentId * 2);
      }
    }
  }

  findMax(sourceSubtreeRoot: BstCell): BstCell {
    let rightCell = sourceSubtreeRoot;
    let potentialRightCell = this.getRightChild(rightCell);
    while (!!potentialRightCell.node) {
      rightCell = potentialRightCell;
      potentialRightCell = this.getRightChild(rightCell);
    }

    return rightCell;
  }

  *bfTraversal(root: BstCell): Generator<BstCell> {
    const queue: BstCell[] = [];
    queue.push(root);

    while (queue.length > 0) {
      const cell = queue.shift();
      const rightChild = this.getRightChild(cell);
      const leftChild = this.getLeftChild(cell);

      yield cell;

      if (!!rightChild) {
        queue.push(rightChild);
      }
      if (!!leftChild) {
        queue.push(leftChild);
      }
    }
  }

  async insert(node: SimulationNode): Promise<void> {
    let checkingCell = this.data[0];

    while (checkingCell) {
      let side = 0;
      if (!checkingCell.node) {
        node.setTarget(checkingCell.x + side, checkingCell.y - 100);
        // * Math.floor(Math.log2(checkingCell.id))
        await new Promise(r => setTimeout(r, 600));
        await this.add(node, checkingCell);
        return;
      }

      const checkingNode = checkingCell.node;

      checkingNode.drawArrow = true;

      if (checkingNode.value === node.value) {
        checkingNode.drawArrow = false;
        return;
      } else if (checkingNode.value > node.value) {
        side = -100;
        checkingCell = this.getLeftChild(checkingCell);
        node.setTarget(checkingNode.x + side, checkingNode.y);
        await new Promise(r => setTimeout(r, 600));
      } else {
        side = 100;
        checkingCell = this.getRightChild(checkingCell);
        node.setTarget(checkingNode.x + side, checkingNode.y);
        await new Promise(r => setTimeout(r, 600));
      }
      checkingNode.drawArrow = false;
    }
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

  async fix(): Promise<void> {
    const invalidCell = this._data.find((c: BstCell | undefined) => !!c && !c.isValid);

    invalidCell.removeNode();
    const leftChild = this.getLeftChild(invalidCell);
    const rightChild = this.getRightChild(invalidCell);

    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.isValid = true;

    return;
  }

  private getParent(cell: BstCell): BstCell {
    return this.getData(Math.floor(cell.id / 2));
  }

  private getLeftChild(cell: BstCell): BstCell {
    if (!cell) {
      return undefined;
    }
    return this.getData(2 * cell.id);
  }

  private getRightChild(cell: BstCell): BstCell {
    if (!cell) {
      return undefined;
    }
    return this.getData(2 * cell.id + 1);
  }

  private setData(cell: BstCell): void {
    this._data[cell.id - 1] = cell;
  }

  private getData(index: number): BstCell {
    return this._data[index - 1];
  }

  private removeData(cell: BstCell): void {
    delete this._data[cell.id - 1];
  }

  get data(): BstCell[] {
    return this._data.filter((d: BstCell | undefined) => !!d);
  }
}
