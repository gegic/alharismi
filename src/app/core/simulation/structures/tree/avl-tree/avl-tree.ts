import {SimulationNode} from '../../../basics/simulation-node';
import {BstCell} from '../bst-cell';
import {BinarySearchTree} from '../binary-search-tree/binary-search-tree';
import {BstCellDrag} from '../../../helpers/drag/bst-cell-drag';
import {SimulationLink} from '../../../basics/simulation-link';
import {root} from 'rxjs/internal-compatibility';

export class AvlTree extends BinarySearchTree {

  heights: { [cellId: number]: number; } = {};

  constructor(id: number, x: number, y: number) {
    super(id, x, y);
  }

  async add(d: SimulationNode, bstCell: BstCell): Promise<void> {
    await super.add(d, bstCell);
    this.checkBalance(bstCell);
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
      // RR case
      // if (!!rightChild && !!rightChild.node &&
      //   balance < -1 && currentValue > rightChild.node.value) {
      //   this.leftRotation(currentCell);
      // }
      // // LL case
      // if (!!leftChild && !!leftChild.node &&
      //   balance > 1 && currentValue < leftChild.node.value) {
      //   this.rightRotation(currentCell);
      // }
      // // LR case
      // if (!!leftChild && !!leftChild.node &&
      //   balance > 1 && currentValue > leftChild.node.value) {
      //   node.left = leftRotate(node.left);
      //   return rightRotate(node);
      // }
      //
      // // RL case
      // if (!!rightChild && !!rightChild.node &&
      //   balance < -1 && currentValue < rightChild.node.value) {
      //   node.right = rightRotate(node.right);
      //   return leftRotate(node);
      // }

      iterator = upTreeGenerator.next();
    }
  }

  private leftRotation(rotationRoot: BstCell): void {
    const newRoot = this.getRightChild(rotationRoot);
    const t = this.getLeftChild(newRoot);
    // Perform rotation

    let removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === newRoot && sl.target === t);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setRightChild(rotationRoot, t);
    this.links.push(new SimulationLink(rotationRoot, t));

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rootParent && sl.target === rotationRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.links.push(new SimulationLink(rootParent, newRoot));
    }

    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rotationRoot && sl.target === newRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setLeftChild(newRoot, rotationRoot);
    this.links.push(new SimulationLink(newRoot, rotationRoot));

    this.heights[rotationRoot.id] = this.getUpdatedHeight(rotationRoot);
    this.heights[newRoot.id] = this.getUpdatedHeight(newRoot);

    this.alignForces();
  }

  private rightRotation(rotationRoot: BstCell): void {
    const newRoot = this.getLeftChild(rotationRoot);
    const t = this.getRightChild(newRoot);
    // Perform rotation

    let removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === newRoot && sl.target === t);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setLeftChild(rotationRoot, t);
    this.links.push(new SimulationLink(rotationRoot, t));

    const [rootParent, childIndex] = this.getParent(rotationRoot);
    this.detachParent(rotationRoot);
    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rootParent && sl.target === rotationRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    if (!rootParent) {
      newRoot.isRoot = true;
      newRoot.descriptor = rotationRoot.descriptor;
      rotationRoot.isRoot = false;
    }
    if (childIndex === 0) {
      this.setLeftChild(rootParent, newRoot);
    } else {
      this.setRightChild(rootParent, newRoot);
    }
    if (!!rootParent) {
      this.links.push(new SimulationLink(rootParent, newRoot));
    }

    removeIndex = this.links.findIndex((sl: SimulationLink) => sl.source === rotationRoot && sl.target === newRoot);
    if (removeIndex !== -1) {
      this.links.splice(removeIndex, 1);
    }
    this.setRightChild(newRoot, rotationRoot);
    this.links.push(new SimulationLink(newRoot, rotationRoot));

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
