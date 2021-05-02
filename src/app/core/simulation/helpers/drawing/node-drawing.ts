import {DrawingHelper} from './drawing-helper';
import {SimulationNode} from '../../basics/simulation-node';
import * as d3 from 'd3';
import contextMenu, {MenuItem} from 'd3-context-menu';
import {ColorProvider} from '../../providers/color-provider';

export class NodeDrawing implements DrawingHelper<SimulationNode> {

  radius = 40;
  colorProvider: ColorProvider;

  constructor(colorProvider: ColorProvider) {
    this.colorProvider = colorProvider;
  }

  enter(enterElement: d3.Selection<d3.EnterElement, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    const node = enterElement.append('g')
      .attr('class', 'node')
      .attr('transform', (d: SimulationNode) => `translate(${d.x}, ${d.y})`)
      .attr('pointer-events', d => d.pointerEvents ? 'auto' : 'none');
      // .call(
      //   d3.drag()
      //     .on('drag', (d, i, nodes) => this.nodeDragging(d as SimulationNode, i, nodes))
      //     .on('end', (d, i, nodes) => this.nodeDragEnd(d as SimulationNode, i, nodes))
      //     .on('start', (d, i, nodes) => this.nodeDragStart(d as SimulationNode, i, nodes))
      // );

    node
      .append('circle')
      .attr('class', 'node-circle')
      // .on('mouseover', (d, i, nodes) => this.nodeMouseOver(d, i, nodes))
      // .on('mouseout', (d, i, nodes) => this.nodeMouseOut(d, i, nodes))
      // .on('contextmenu', contextMenu(this.getContextMenu()))
      .attr('r', 0)
      .attr('fill', (d: SimulationNode) => this.colorProvider.getNodeColor(d))
      .style('stroke-width', (d: SimulationNode) => d.highlighted ? 5 : 0)
      .style('stroke-dasharray', '5,3') // make the stroke dashed
      .style('stroke', 'pink')
      .style('stroke-opacity', (d: SimulationNode) => d.isPlaceholder ? 0.4 : 0)
      .style('stroke-width', (d: SimulationNode) => d.isPlaceholder ? 5 : 0)
      .style('stroke-dasharray', (d: SimulationNode) => d.isPlaceholder ? '10,3' : '0,0') // make the stroke dashed
      .style('stroke', 'black')
      .style('opacity', (d: SimulationNode) => d.isPlaceholder ? 0.8 : 1)
      .style('cursor', (d: SimulationNode) => d.isInteractable ? 'pointer' : 'not-allowed')
      .transition()
      .duration(500)
      .attr('r', this.radius);

    node
      .append('text')
      .attr('class', 'circle-value')
      .attr('dy', this.radius / 4)
      .text(d => d.isValueVisible ? d.value : '')
      .style('text-anchor', 'middle')
      .attr('dx',  this.radius / 2.3)
      .style('fill', '#E2E8CE')
      .attr('pointer-events', 'none')
      // check if number is visible. else hide the number
      .attr('font-size', d => this.calculateFontSize(d.value.toString()))
      // enter animation
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1);

    node
      .append('text')
      .attr('class', 'circle-name')
      .style('fill', 'black')
      .attr('dx', (d) => d.isPlaceholder ? 0 : -40 / 2)
      .attr('dy', (d) => d.isPlaceholder ? 40 / 8 : 40 / 4)
      .style('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .attr('font-size', 0)
      .raise()
      .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
      .transition()
      .duration(500)
      .attr('font-size', 16);

    node.append('line')
      .attr('class', 'circle-arrow')
      .attr('x1', d => d.x)
      .attr('y1', d => d.y - 150)
      .attr('x2', d => d.x)
      .attr('y2', d => d.y - 100)
      .attr('stroke', 'white')
      .attr('stroke-width', 5)
      .attr('opacity', d => d.drawArrow ? 0.8 : 0)
      .attr('marker-end', 'url(#arrowhead)');

    return node;
  }

  update(updateElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {

    updateElement
      .attr('class', 'node')
      .attr('pointer-events', d => d.pointerEvents ? 'auto' : 'none');

    updateElement.select('.node-circle')
      .attr('fill', (d) => this.colorProvider.getNodeColor(d))
      .style('stroke-width', d => {
        // if (!d.validInBST) {
        //   return 5;
        // }
        if (d.highlighted) {
          return 10;
        }
        if (d.isPlaceholder) {
          return 5;
        } else {
          return 0;
        }
      })
      // if placeholder
      .style('stroke-opacity', d => d.isPlaceholder || d.highlighted ? 0.4 : 0)
      .style('stroke-dasharray', d => {
        // if (d.isPlaceholder) return "10,3"
        // if (!d.validInBST) {
        //   return '5,3';
        // }
        if (d.highlighted) {
          return '5,3';
        }
        else {
          return '0,0';
        }
      })
      .style('stroke', d => {
        // if (!d.validInBST) {
        //   return 'red';
        // }
        if (d.isPlaceholder) {
          return 'black';
        }
        if (d.highlighted) {
          return 'green';
        }
      })
      .raise()
      // animation
      .filter((d: SimulationNode) => d.highlighted)
      .transition()
      .duration(400)
      .attr('r', this.radius * 1.5)
      .transition()
      .duration(500)
      .attr('r', this.radius);

    updateElement
      .select('.circle-value')
      .text(d => d.isValueVisible ? d.value : '')
      .attr('font-size', d => this.calculateFontSize(d.value.toString()))
      .raise();

    updateElement
      .select('.circle-name')
      .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
      .raise();

    updateElement
      .select('.circle-arrow')
      .attr('opacity', d => d.drawArrow ? 0.8 : 0)
      .raise();

    return updateElement;
  }

  exit(exitElement: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    exitElement
      .select('.node-circle')
      .transition()
      .duration(500)
      .attr('r', 0);

    exitElement
      .select('.circle-value')
      .transition()
      .duration(500)
      .style('opacity', 0);

    exitElement
      .select('.circle-name')
      .transition()
      .duration(500)
      .attr('font-size', 0);

    return exitElement.transition()
      .duration(500)
      .remove().selection();
  }

  private calculateFontSize(value: string): number {
    let len: number;
    if (!value) {
      len = 1;
    } else {
      len = value.length;
    }
    if (len === 1) {
      return this.radius;
    }
    else {
      return this.radius / len * 1.5;
    }
  }

}
