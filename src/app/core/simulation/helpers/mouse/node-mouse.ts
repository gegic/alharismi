import {d3Element, MouseHelper} from './mouse-helper';
import {ArrayCell} from '../../structures/array/array-cell';
import {SimulationLoop} from '../../handlers/simulation-loop';
import contextMenu, {ContextMenuFn, MenuItem} from 'd3-context-menu';
import * as d3 from 'd3';
import {SimulationArray} from '../../structures/array/simulation-array';
import {SimulationNode} from '../../basics/simulation-node';
import {defaultRadius} from '../../../consts';
import {Simulation} from '../../simulation';

export class NodeMouse implements MouseHelper<SimulationNode> {

  simulation: Simulation;

  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  mouseOver(d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    const circle = d3.select(nodes[i]);

    if (!d.isInteractable) {
      return;
    }

    circle
      .transition()
      .duration(600)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius + 10);
  }

  mouseOut(d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    const circle = d3.select(nodes[i]);

    if (!d.isInteractable) {
      return;
    }

    circle
      .transition()
      .duration(600)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius);
  }

  contextMenu(d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>): void {
    const menu = [
      {
        title: 'Set value',
        action: async (elm: SimulationNode) => {
          const newValue = prompt('Set value to');

          let parsed = parseFloat(newValue);

          if (isNaN(parsed)) {
            parsed = 69;
          }
          // var node_to_find = dataHandler.getAllFiguresOfClass("Circle").filter(d => d.value === number)[0]
          elm.value = parsed;
          elm.highlighted = true;
          await new Promise(r => setTimeout(r, 1000));
          elm.highlighted = false;
        }
      },
      {
        title: 'Info log',
        action: async (elm: SimulationNode) => {
          console.log(elm);
        }
      },
      {
        title: 'Delete',
        action: async (elm) => {
          this.simulation.nodeHandler.remove(elm);
        }
      }
    ];

    contextMenu(menu)(d, i);
  }

  addMouseInteraction(element: d3.Selection<d3.BaseType, SimulationNode, any, any>): d3.Selection<d3.BaseType, SimulationNode, any, any> {
    element.on('mouseover', (d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>) => this.mouseOver(d, i, nodes))
      .on('mouseout', (d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>) => this.mouseOut(d, i, nodes))
      .on('contextmenu', (d: SimulationNode, i: number, nodes: d3Element[] | ArrayLike<d3Element>) => this.contextMenu(d, i, nodes));
    return element;
  }
}
