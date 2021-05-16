import {SimulationNode} from '../../../basics/simulation-node';
import * as d3 from 'd3';
import {SimulationLink} from '../../../basics/simulation-link';
import {SimulationGraph} from '../simulation-graph';
import {BstCell} from '../bst-cell';
import {BstCellMouse} from '../../../helpers/mouse/bst-cell-mouse';
import {BstCellDrag} from '../../../helpers/drag/bst-cell-drag';

export class BinarySearchTree extends SimulationGraph {

  treeHierarchy?: d3.HierarchyNode<BstCell>;
  children: { [id: number]: [BstCell | undefined, BstCell | undefined] } = {};
  parents: { [id: number]: [BstCell, number] } = {};

  constructor(id: number, x: number, y: number) {
    super();
    this.id = id;
    this.x = x;
    this.y = y;
  }

  setRoot(): void {
    const root = new BstCell(this, this.maxId++, this.x, this.y);
    root.isRoot = true;
    root.descriptor = `bst_${this.id}`;
    this.addCell(root, null);
  }

  addCell(cell: BstCell, parent: BstCell | null, left = true): void {
    this.data.push(cell);
    // this.setLeftChild(parent, cell)
    if (left) {
      this.setLeftChild(parent, cell);
    } else {
      this.setRightChild(parent, cell);
    }
  }

  deleteCell(cell: BstCell): void {
    this.links = this.links.filter((sl: SimulationLink) => sl.target !== cell && sl.source !== cell);
    this.data = this.data.filter(c => c !== cell);
    this.detachChildren(cell);
    this.detachParent(cell);
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
    const leftChild = new BstCell(this, this.maxId++, cell.x, cell.y);
    const rightChild = new BstCell(this, this.maxId++, cell.x, cell.y);

    this.addCell(leftChild, cell, false);
    this.addCell(rightChild, cell, true);

    this.links.push(
      new SimulationLink(cell, leftChild),
      new SimulationLink(cell, rightChild)
    );
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;

    this.alignForces();
  }

  alignForces(): void {
    this.treeHierarchy = d3
      .hierarchy(this.getRoot(), (d: BstCell) => {
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

    if (this.data.length === 0) {
      return null;
    }

    let checkingCell = this.getRoot();

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

  /**
   * Finds and deletes a node with the passed value.
   * @param value - Value used to find a node and then delete it.
   * @return nodeCellPromise - A promise of an array consisting of simulation node, and
   * a cell that was the first one affected by the occurred deletion.
   * The cell is null if the deleted node didn't have a parent, i.e. it was the root.
   */
  async delete(value: number): Promise<[SimulationNode, BstCell | null]> {
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
      return await this.deleteTwoChildren(found, leftChild);
    }
  }

  async deleteLeaf(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<[SimulationNode, BstCell | null]> {
    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.alignForces();

    const parent = this.getParent(target)[0];
    return [target.removeNode(), target];
  }

  async deleteOnlyChild(target: BstCell, leftChild: BstCell, rightChild: BstCell): Promise<[SimulationNode, BstCell | null]> {
    const parent = this.getParent(target)[0];
    const takenCell = !!leftChild.node ? leftChild : rightChild;
    const freeCell = !leftChild.node ? leftChild : rightChild;
    this.deleteCell(freeCell);
    this.deleteCell(target);

    if (leftChild === target) {
      this.setLeftChild(parent, takenCell);
    } else {
      this.setRightChild(parent, takenCell);
    }

    const node = target.removeNode();

    if (!!node) {
      node.setTarget(this.x, this.y - 100);
    }

    await new Promise(r => setTimeout(r, 600));

    if (parent) {
      this.links.push(new SimulationLink(parent, takenCell));
    } else {
      this.setLeftChild(null, takenCell);
      takenCell.descriptor = target.descriptor;
      takenCell.isRoot = true;
    }
    this.alignForces();

    console.log(this.data);
    return [node, takenCell];
  }

  async deleteTwoChildren(target: BstCell, leftChild: BstCell): Promise<[SimulationNode, BstCell | null]> {
    const substituteCell = this.findMax(leftChild);
    const substituteNode = substituteCell.removeNode();

    const node = target.removeNode();
    node.setTarget(this.x, this.y - 100);

    substituteNode.setTarget(target.x, target.y);

    await new Promise(r => setTimeout(r, 600));

    target.setNode(substituteNode);

    const substituteLeft = this.getLeftChild(substituteCell);
    const substituteRight = this.getRightChild(substituteCell);

    let startingCell: BstCell | null = null;
    if (!substituteLeft.node && !substituteRight.node) {
      startingCell = (await this.deleteLeaf(substituteCell, substituteLeft, substituteRight))[1];
    } else if (!substituteLeft.node || !substituteRight.node) {
      startingCell = (await this.deleteOnlyChild(substituteCell, substituteLeft, substituteRight))[1];
    }

    return [node, startingCell];
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


  async insert(node: SimulationNode): Promise<void> {
    let checkingCell = this.getRoot();

    while (checkingCell) {
      let side = 0;
      if (!checkingCell.node) {
        node.setTarget(checkingCell.x + side, checkingCell.y - 100);
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

  async fix(): Promise<void> {
    const invalidCell = this.data.find((c: BstCell) => !!c && !c.isValid);

    invalidCell.removeNode();
    const leftChild = this.getLeftChild(invalidCell);
    const rightChild = this.getRightChild(invalidCell);

    this.deleteCell(leftChild);
    this.deleteCell(rightChild);

    this.isValid = true;

    return;
  }

  getData(): BstCell[] {
    return this.data.filter(d => !!d);
  }

  /**
   * Generator which traverses the tree in a breadth-first manner.
   * @param root
   */
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

  /**
   * Reaches root by traversing a tree from the starting cell upwards.
   * @param cell - The starting cell.
   * @yields [currentCell, parent] - The cell that generator is currently checking and its parent.
   */
  *upTree(cell: BstCell): Generator<[BstCell, BstCell]> {
    let parent = this.getParent(cell)[0];
    let currentCell = cell;
    while (!!currentCell) {
      yield [currentCell, parent];
      currentCell = parent;
      parent = this.getParent(parent)[0];
    }
  }

  protected checkEntry(cell: BstCell): boolean {
    const upTreeGenerator = this.upTree(cell);
    let iterator = upTreeGenerator.next();
    if (iterator.done) {
      return true;
    }

    while (!iterator.done) {
      const [child, parent] = iterator.value;

      if (!parent) {
        return true;
      }

      const isLeftChild = this.children[parent.id][0] === child;
      // if the left child
      if (isLeftChild) {
        if (cell.node.value > parent.node.value) {
          return false;
        }
      } else {
        if (cell.node.value < parent.node.value) {
          return false;
        }
      }
      iterator = upTreeGenerator.next();
    }

    return true;
  }

  /**
   * Returns the parent of the passed cell,
   * or undefined if this cell didn't have any parents.
   * @param cell
   * @protected
   */
  protected getParent(cell: BstCell): [BstCell, number] | [undefined, undefined] {
    if (!cell) {
      return [undefined, undefined];
    }
    return this.parents[cell.id];
  }

  protected getLeftChild(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    const children = this.children[cell.id];
    if (!children) {
      return undefined;
    }
    return children[0];
  }

  /**
   * Sets the child cell as the left child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected setLeftChild(parent: BstCell, child: BstCell): void {
    this.detachParent(child);

    const parentId = !!parent ? parent.id : -1;
    if (!this.children[parentId]) {
      this.children[parentId] = [undefined, undefined];
    }
    this.children[parentId][0] = child;
    this.parents[child.id] = [parent, 0];
  }

  protected getRightChild(cell: BstCell): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    const children = this.children[cell.id];
    if (!children) {
      return undefined;
    }
    return children[1];
  }

  /**
   * Sets the child cell as the right child of the parent cell.
   * @param parent
   * @param child
   * @protected
   */
  protected setRightChild(parent: BstCell, child: BstCell): void {
    this.detachParent(child);

    const parentId = !!parent ? parent.id : -1;
    if (!this.children[parentId]) {
      this.children[parentId] = [undefined, undefined];
    }
    this.children[parentId][1] = child;
    this.parents[child.id] = [parent, 1];
  }

  /**
   * Detaches cell from its children.
   * @param cell
   * @protected
   */
  protected detachChildren(cell: BstCell): void {
    if (!this.children[cell.id]) {
      return;
    }
    for (const cellsChild of this.children[cell.id]) {
      if (!cellsChild) {
        continue;
      }
      if (this.parents[cellsChild.id][0] === cell) {
        delete this.parents[cellsChild.id];
      }
    }
    delete this.children[cell.id];
  }

  /**
   * Detaches cell from its parent.
   * @param cell
   * @protected
   */
  protected detachParent(cell: BstCell): void {

    if (!this.parents[cell.id]) {
      return;
    }
    const [parent, childIndex] = this.parents[cell.id];
    const parentId = !!parent ? parent.id : -1;
    if (this.children[parentId][childIndex] === cell) {
      this.children[parentId][childIndex] = undefined;
    }
    delete this.parents[cell.id];
  }

  private getRoot(): BstCell {
    return this.children[-1][0];
  }
}
