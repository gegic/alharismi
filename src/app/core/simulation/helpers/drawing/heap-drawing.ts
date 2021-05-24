import {DrawingHelper} from './drawing-helper';
import * as d3 from 'd3';
import {Heap} from '../../structures/tree/binary-tree/heap/heap';

export class HeapDrawing implements DrawingHelper<Heap> {

  enter(enterElement: d3.Selection<d3.EnterElement, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    const treeElement = enterElement.append('g')
      .attr('class', 'heap');
    return treeElement;
  }

  update(updateElement: d3.Selection<d3.BaseType, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, Heap, any, any>): d3.Selection<d3.BaseType, Heap, any, any> {
    return exitElement.remove();
  }
}
