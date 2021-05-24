import {DrawingHelper} from './drawing-helper';
import * as d3 from 'd3';
import {LinkedList} from '../../structures/tree/linked-list/linked-list';

export class LinkedListDrawing implements DrawingHelper<LinkedList> {

  enter(enterElement: d3.Selection<d3.EnterElement, LinkedList, any, any>): d3.Selection<d3.BaseType, LinkedList, any, any> {
    const treeElement = enterElement.append('g')
      .attr('class', 'linked-list');
    return treeElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, LinkedList, any, any>): d3.Selection<d3.BaseType, LinkedList, any, any> {
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, LinkedList, any, any>): d3.Selection<d3.BaseType, LinkedList, any, any> {
    return exitElement.remove();
  }
}
