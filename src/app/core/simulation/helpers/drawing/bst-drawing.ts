import {DrawingHelper} from './drawing-helper';
import * as d3 from 'd3';
import {BinarySearchTree} from '../../structures/tree/binary-search-tree';

export class BstDrawing implements DrawingHelper<BinarySearchTree> {

  enter(enterElement: d3.Selection<d3.EnterElement, BinarySearchTree, any, any>): d3.Selection<d3.BaseType, BinarySearchTree, any, any> {
    const treeElement = enterElement.append('g')
      .attr('class', 'bst');
    return treeElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, BinarySearchTree, any, any>): d3.Selection<d3.BaseType, BinarySearchTree, any, any> {
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, BinarySearchTree, any, any>): d3.Selection<d3.BaseType, BinarySearchTree, any, any> {
    return exitElement.remove();
  }
}
