import {SimulationNode} from '../../../../basics/simulation-node';
import {BstCell} from '../../bst-cell';
import {BinarySearchTree} from '../binary-search-tree/binary-search-tree';
import {BstCellDrag} from '../../../../helpers/drag/bst-cell-drag';
import {SimulationLink} from '../../../../basics/simulation-link';
import {root} from 'rxjs/internal-compatibility';
import {BstCellDrawing} from '../../../../helpers/drawing/bst-cell-drawing';

export class AvlTree extends BinarySearchTree {

  heights: { [cellId: number]: number; } = {};

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {
    await super.add(d, bstCell);
    this.checkBalance(bstCell);
  }

  async delete(value: number): Promise<[SimulationNode, BstCell | null, BstCell]> {
    const [node, affectedCell, deletedCell] = await super.delete(value);

    this.checkBalance(affectedCell);
    return [node, affectedCell, deletedCell];
  }


  /**
   * Updates the heights of the starting cell and all of its ancestors and checks if all nodes are balanced.
   * If an unbalanced node shows up, performs operations of balancing.
   * @param cell - The starting cell.
   * @private
   */
  private checkBalance(cell: BstCell): void {
    const upTreeGenerator = this.upTree(cell);
    let iterator = upTreeGenerator.next();
    if (iterator.done) {
      this.heights[cell.id] = 0;
      return;
    }

    while (!iterator.done) {
      const currentCell: BstCell = iterator.value[0];

      if (this.heights[currentCell.id] === undefined) {
        this.heights[currentCell.id] = 0;
        iterator = upTreeGenerator.next();
        continue;
      }
      if (!currentCell.node) {
        delete this.heights[currentCell.id];
        iterator = upTreeGenerator.next();
        continue;
      }
      const leftChild = this.getLeftChild(currentCell);
      const rightChild = this.getRightChild(currentCell);
      const leftHeight = this.getHeight(leftChild);
      const rightHeight = this.getHeight(rightChild);

      this.heights[currentCell.id] = 1 + Math.max(leftHeight, rightHeight);

      const balance = leftHeight - rightHeight;

      if (!currentCell.node) {
        iterator = upTreeGenerator.next();
        continue;
      }

      if (balance > 1) {
        const leftsLeft = this.getLeftChild(leftChild);
        const leftsRight = this.getRightChild(leftChild);
        const leftBalance = this.getHeight(leftsLeft) - this.getHeight(leftsRight);

        if (leftBalance < 0) {
          this.leftRotation(leftChild);
          this.rightRotation(currentCell);
        } else {
          this.rightRotation(currentCell);
        }
      } else if (balance < -1) {
        const rightsLeft = this.getLeftChild(rightChild);
        const rightsRight = this.getRightChild(rightChild);
        const rightBalance = this.getHeight(rightsLeft) - this.getHeight(rightsRight);

        if (rightBalance > 0) {
          this.rightRotation(rightChild);
          this.leftRotation(currentCell);
        } else {
          this.leftRotation(currentCell);
        }
      }

      iterator = upTreeGenerator.next();
    }
  }

  private leftRotation(rotationRoot: BstCell): void {
    const newRoot = this.getRightChild(rotationRoot);
    const t = this.getLeftChild(newRoot);
    // Perform rotation

    this.linkHelper.removeLink(newRoot, t);
    this.setRightChild(rotationRoot, t);
    this.linkHelper.addLink(rotationRoot, t);

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    this.linkHelper.removeLink(rootParent, rotationRoot);
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.descriptor = undefined;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.linkHelper.addLink(rootParent, newRoot);
    }

    this.linkHelper.removeLink(rotationRoot, newRoot);
    this.setLeftChild(newRoot, rotationRoot);
    this.linkHelper.addLink(newRoot, rotationRoot);

    this.heights[rotationRoot.id] = this.getUpdatedHeight(rotationRoot);
    this.heights[newRoot.id] = this.getUpdatedHeight(newRoot);

    this.alignForces();
  }

  private rightRotation(rotationRoot: BstCell): void {
    const newRoot = this.getLeftChild(rotationRoot);
    const t = this.getRightChild(newRoot);
    // Perform rotation

    this.linkHelper.removeLink(newRoot, t);
    this.setLeftChild(rotationRoot, t);
    this.linkHelper.addLink(rotationRoot, t);

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    this.linkHelper.removeLink(rootParent, rotationRoot);
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.descriptor = undefined;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.linkHelper.addLink(rootParent, newRoot);
    }

    this.linkHelper.removeLink(rotationRoot, newRoot);
    this.setRightChild(newRoot, rotationRoot);
    this.linkHelper.addLink(newRoot, rotationRoot);

    this.heights[rotationRoot.id] = this.getUpdatedHeight(rotationRoot);
    this.heights[newRoot.id] = this.getUpdatedHeight(newRoot);

    this.alignForces();
  }

  private getUpdatedHeight(cell: BstCell): number {
    const leftChild = this.getLeftChild(cell);
    const rightChild = this.getRightChild(cell);
    const leftHeight = this.getHeight(leftChild);
    const rightHeight = this.getHeight(rightChild);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  private getHeight(cell: BstCell): number {
    const height: number | undefined = !!cell ? this.heights[cell.id] : -1;
    return height ?? -1;
  }

  // def rotateLeft(self,rotRoot):
  //   newRoot = rotRoot.rightChild
  //
  //   ----
  //   rotRoot.rightChild = newRoot.leftChild
  //   if newRoot.leftChild != None:
  //     newRoot.leftChild.parent = rotRoot
  //   ....
  //
  //   newRoot.parent = rotRoot.parent
  //   if rotRoot.isRoot():
  //     self.root = newRoot
  //   else:
  //     if rotRoot.isLeftChild():
  //       rotRoot.parent.leftChild = newRoot
  //     else:
  //       rotRoot.parent.rightChild = newRoot
  //   newRoot.leftChild = rotRoot
  //   rotRoot.parent = newRoot
  //   rotRoot.balanceFactor = rotRoot.balanceFactor + 1 - min(newRoot.balanceFactor, 0)
  //   newRoot.balanceFactor = newRoot.balanceFactor + 1 + max(rotRoot.balanceFactor, 0)
}
