import {DrawingHelper} from './drawing-helper';
import * as d3 from 'd3';
import contextMenu, {MenuItem} from 'd3-context-menu';
import {ColorProvider} from '../../providers/color-provider';
import {BstCell} from '../../structures/tree/bst-cell';

export class BstCellDrawing implements DrawingHelper<BstCell> {

  // colorProvider: ColorProvider;
  //
  // constructor(colorProvider: ColorProvider) {
  //   this.colorProvider = colorProvider;
  // }

  enter(enterElement: d3.Selection<d3.EnterElement, BstCell, any, any>): d3.Selection<d3.BaseType, BstCell, any, any> {
    const bstCell = enterElement.append('g')
      .attr('class', 'bst-cell')
      .attr('transform', (d: BstCell) => `translate(${d.x}, ${d.y})`);

    bstCell
      .append('circle')
      .attr('class', 'bst-cell-circle')
      // .on('mouseover', (d, i, nodes) => this.nodeMouseOver(d, i, nodes))
      // .on('mouseout', (d, i, nodes) => this.nodeMouseOut(d, i, nodes))
      // .on('contextmenu', contextMenu(this.getContextMenu()))
      .attr('fill', d => d.isValid ? '#E2E8CE' : '#e8cece')
      .style('opacity', .9)
      .style('cursor', 'pointer')
      .attr('r', d => d.radius)
      .style('stroke-opacity', 1)
      .style('stroke-width', 0)
      .style('stroke', '#9381FF');

    bstCell
      .append('text')
      .attr('class', 'bst-cell-empty')
      .attr('dx', 0)
      .attr('dy', 40 / 8)
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .attr('font-size', 0)
      .raise()
      .style('fill', d => d.tree.isValid ? 'black' : '#860000')
      .text(d => d.tree.isValid ? 'empty' : 'invalid')
      .transition()
      .duration(500)
      .attr('font-size', 16);

    bstCell
      .filter(d => !!d.descriptor)
      .append('text')
      .style('fill', 'white')
      .attr('class', 'bst-cell-name')
      .attr('dx', 0)
      .attr('dy', d => -d.radius * 1.2)
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .attr('font-size', 32)
      .text(d => d.descriptor);
    return bstCell;
  }

  update(updateElement: d3.Selection<d3.BaseType, BstCell, any, any>): d3.Selection<d3.BaseType, BstCell, any, any> {

    updateElement
      .select('.bst-cell-circle')
      .attr('fill', d => d.isValid ? '#E2E8CE' : '#e8cece');

    updateElement
      .select('.bst-cell-name')
      .filter(d => !!d.descriptor)
      .text(d => d.descriptor);

    updateElement
      .select('.bst-cell-empty')
      .style('fill', d => d.tree.isValid ? 'black' : '#860000')
      .text(d => d.tree.isValid ? 'empty' : 'invalid');

    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, BstCell, any, any>): d3.Selection<d3.BaseType, BstCell, any, any> {
    exitElement
      .select('.bst-cell-circle')
      .transition()
      .duration(500)
      .attr('r', 0);

    exitElement
      .select('.bst-cell-empty')
      .transition()
      .duration(500)
      .style('opacity', 0);

    exitElement
      .select('.bst-cell-name')
      .transition()
      .duration(500)
      .attr('font-size', 0);

    return exitElement.transition()
      .duration(500)
      .remove().selection();
  }

}
