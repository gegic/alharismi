import {BinaryTree} from '../binary-tree';
import {BstCell} from '../../bst-cell';
import {SimulationNode} from '../../../../basics/simulation-node';
import {SimulationLink} from '../../../../basics/simulation-link';
import {last} from 'rxjs/operators';

export class Heap extends BinaryTree {

  _data: (BstCell | undefined)[] = [];
  size = 0;

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  addCell(cell: BstCell, parent?: BstCell | null, left?: boolean): void {
    this.setCell(cell, ++this.size);
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {
    bstCell.setNode(d);
    d.lockedPlaceholder = bstCell;

    this.addNextCell(bstCell);
    this.alignForces();

    await new Promise(r => setTimeout(r, 600));

    await this.upHeap(bstCell, this.size - 2);

  }

  addNextCell(cell: BstCell): void {
    const nextCell = new BstCell(this, this.maxId++, cell.x, cell.y);

    this.addCell(nextCell);
    const [parent] = this.getParent(nextCell, this.size);
    if (!!parent) {
      this.links.push(new SimulationLink(parent, nextCell));
    }
  }

  async upHeap(cell: BstCell, index: number): Promise<void> {
    let [parent] = this.getParent(cell, index);
    const root = this.getRoot();
    while (cell !== root) {
      if (cell.node.value < parent.node.value) {
        await this.swapNodes(cell, parent);
      }
      cell = parent;
      index = Math.floor(index / 2);
      [parent] = this.getParent(cell, index);
    }
  }

  async deleteMin(): Promise<[SimulationNode, (BstCell | null), BstCell]> {
    const min = this.getRoot();
    if (!min.node) {
      return [null, null, null];
    }
    const node = min.node;
    const deletedCell = await this.deleteNodeFromCell(min);
    return [node, min, deletedCell];
  }

  async delete(value: number): Promise<[SimulationNode, (BstCell | null), BstCell]> {
    for (const cell of this._data) {
      if (!cell.node) {
        continue;
      }
      const checkingNode = cell.node;
      checkingNode.drawArrow = true;
      await new Promise(r => setTimeout(r, 600));
      checkingNode.drawArrow = false;
      if (checkingNode.value === value) {
        const deleted = await this.deleteNodeFromCell(cell);
        return [checkingNode, cell, deleted];
      }
    }
    return [null, null, null];
  }

  async deleteNodeFromCell(cell: BstCell): Promise<BstCell | null> {
    if (!cell.node) {
      return null;
    }
    const lastTakenCell = this.getLastTakenCell();
    if (lastTakenCell === cell) {
      const lastCell = this.getEmptyCell();
      const node = lastTakenCell.removeNode();
      node.setTarget(this.x, this.y - 200);
      this.deleteCell(lastCell);
      return lastCell;
    }
    await this.swapNodes(cell, lastTakenCell);
    lastTakenCell.removeNode();
    const emptyCell = this.getEmptyCell();
    this.deleteCell(emptyCell);
    await new Promise(r => setTimeout(r, 600));

    await this.downHeap(cell);
  }

  async downHeap(cell: BstCell): Promise<void> {
    while (!!cell && !!cell.node) {
      const minChild = this.getMinChild(cell);
      const currentNode = cell.node;
      const minNode = minChild.node;
      if (!currentNode || !minNode
        || minNode.value >= currentNode.value) {
        break;
      }
      await this.swapNodes(minChild, cell);
      cell = minChild;
    }
  }

  async swapNodes(first: BstCell, second: BstCell): Promise<void> {
    const lowerNode = first.removeNode();
    const higherNode = second.removeNode();
    const oldCellColor = first.color;
    const oldParentColor = second.color;
    first.color = '#98dc73';
    second.color = '#98dc73';
    lowerNode.setTarget(second.x - 100, second.y);
    higherNode.setTarget(first.x + 100, first.y);
    await new Promise(r => setTimeout(r, 600));
    lowerNode.setTarget(second.x, second.y);
    higherNode.setTarget(first.x, first.y);
    await new Promise(r => setTimeout(r, 300));
    second.setNode(lowerNode);
    first.setNode(higherNode);
    first.color = oldCellColor;
    second.color = oldParentColor;
    await new Promise(r => setTimeout(r, 600));
  }
  getMinChild(cell: BstCell): BstCell | null{
    const leftChild = this.getLeftChild(cell);
    const rightChild = this.getRightChild(cell);

    if ((!leftChild || !leftChild.node)
      && (!rightChild || !rightChild.node)) {
      return null;
    } else if ((!leftChild || !leftChild.node) && !!rightChild.node) {
      return rightChild; // technically impossible
    } else if ((!rightChild || !rightChild.node) && !!leftChild.node) {
      return leftChild;
    } else if (!!leftChild.node && !!rightChild) {
      if (leftChild.node.value < rightChild.node.value) {
        return leftChild;
      } else {
        return rightChild;
      }
    }
  }
  deleteCell(cell: BstCell): void {
    const lastCell = this.getEmptyCell();
    if (cell !== lastCell) {
      return;
    }
    this.links = this.links.filter((sl: SimulationLink) => sl.target !== lastCell);
    this.removeCell(this.size--);
  }

  async insert(node: SimulationNode): Promise<void> {
    const lastCell = this.getEmptyCell();

    node.setTarget(lastCell.x, lastCell.y);
    await new Promise(r => setTimeout(r, 600));
    await this.add(node, lastCell);
  }

  protected getParent(cell: BstCell, childIndex?: number): [BstCell, number] | [undefined, undefined] {
    if (!cell) {
      return [undefined, undefined];
    }
    if (childIndex) {
      childIndex = this.getTreeIndex(cell);
    }
    const parentIndex = Math.floor(childIndex / 2);
    const side = childIndex % 2;
    const parent = this.getCell(parentIndex);
    return [parent, side];
  }

  protected getLeftChild(cell: BstCell, index?: number): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    if (!index) {
      index = this.getTreeIndex(cell);
    }
    return this.getCell(2 * index);
  }

  protected getRightChild(cell: BstCell, index?: number): BstCell | undefined {
    if (!cell) {
      return undefined;
    }
    if (!index) {
      index = this.getTreeIndex(cell);
    }
    return this.getCell(2 * index + 1);
  }

  getRoot(): BstCell {
    return this._data[0];
  }

  protected setLeftChild(parent: BstCell, child: BstCell, parentIndex?: number): void {
    if (!parent) {
      return undefined;
    }
    if (!parentIndex) {
      parentIndex = this.getTreeIndex(parent);
    }
    this.setCell(child, 2 * parentIndex);
  }

  protected setRightChild(parent: BstCell, child: BstCell, parentIndex?: number): void {
    if (!parent) {
      return undefined;
    }
    if (!parentIndex) {
      parentIndex = this.getTreeIndex(parent);
    }
    this.setCell(child, 2 * parentIndex + 1);
  }

  getTreeIndex(cell: BstCell): number {
    if (!cell) {
      return -1;
    }
    return this._data.findIndex(c => c.id === cell.id) + 1;
  }

  private setCell(cell: BstCell, treeIndex: number): void {
    this._data[treeIndex - 1] = cell;
  }

  private getCell(treeIndex: number): BstCell {
    return this._data[treeIndex - 1];
  }

  private removeCell(treeIndex: number): void {
    delete this._data[treeIndex - 1];
  }

  getData(): BstCell[] {
    return this._data.filter(bcu => !!bcu);
  }

  getEmptyCell(): BstCell {
    return this.getCell(this.size);
  }

  getLastTakenCell(): BstCell {
    return this.getCell(this.size - 1);
  }

  protected detachChildren(cell: BstCell): void {
  }

  protected detachParent(cell: BstCell): void {
  }

}
