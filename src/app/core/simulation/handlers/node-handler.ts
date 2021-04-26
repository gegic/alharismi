import {SimulationNode} from '../basics/simulation-node';
import {defaultRadius} from '../../consts';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {SimulationArray} from '../structures/array/simulation-array';
import {ArrayCell} from '../structures/array/array-cell';
import {PositionHelper} from '../helpers/position-helper';
import {ColorHelper} from '../helpers/color-helper';
import {DrawableHandler} from './drawable-handler';
import {SimulationHandler} from './simulation-handler';

export class NodeHandler implements DrawableHandler {

  positionHelper: PositionHelper;
  colorHelper: ColorHelper;
  simulationHandler: SimulationHandler;

  readonly radius = defaultRadius;
  maxId = 0;
  decimalDigits = 0;

  // todo
  quadtree: d3.Quadtree<SimulationNode>;

  nodes: SimulationNode[] = [];
  nodeElements: Selection<any, any, HTMLElement, any>;
  invisibleNodes: SimulationNode[] = [];

  canvas: Selection<any, any, any, any>;

  previouslyHoveredPlaceholders: Selection<any, any, any, any>[] = [];

  constructor(positionHelper: PositionHelper,
              colorHelper: ColorHelper,
              canvas: Selection<any, any, any, any>,
              simulationHandler: SimulationHandler) {
    this.positionHelper = positionHelper;
    this.colorHelper = colorHelper;
    this.canvas = canvas;
    this.simulationHandler = simulationHandler;
  }

  add(obj: undefined | SimulationNode | SimulationNode[]): SimulationNode | SimulationNode[] {
    let values: number[];
    if (Array.isArray(obj)) {
      values = obj.map(sn => sn.value);
      obj.forEach(d => this.nodes.push(d));
    } else {
      if (!obj) {
        obj = new SimulationNode(this.generateRandomValue(), this.maxId++, 0, 0);
      }
      values = [obj.value];
      this.nodes.push(obj);
    }
    this.quadtree = d3.quadtree<SimulationNode>()
      .x(d => d.x)
      .y(d => d.y)
      .addAll(this.nodes);

    this.colorHelper.setColorScheme(values);
    return obj;
  }

  generateRandomValue(n = 100): number {
    return parseFloat((Math.random() * n - n / 2).toFixed(this.decimalDigits));
  }

  draw(): void {
    const transitionEnterTime = 500;
    const transitionExitTime = 200;

    this.simulationHandler.simulation.nodes(this.nodes.concat(this.invisibleNodes));

    this.nodeElements = this.canvas
      .selectAll('.circle')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(
        (enter) => {
          const cir = enter.append('circle');
          cir.attr('r', 0)
            .attr('x', d => d.cx)
            .attr('y', d => d.cy)
            .attr('class', 'circle')
            .on('mouseover', (d, i, nodes) => this.nodeMouseOver(d, i, nodes))
            .on('mouseout', (d, i, nodes) => this.nodeMouseOut(d, i, nodes))
            .on('click', (d) => this.nodeClick(d))
            // .on('contextmenu', d3.contextMenu(circleContextMenu))
            .call(
              d3.drag()
                .on('drag', (d, i, nodes) => this.nodeDragged(d as SimulationNode, i, nodes))
                .on('end', (d, i, nodes) => this.nodeDragEnd(d as SimulationNode, i, nodes))
                .on('start', (d, i, nodes) => this.nodeDragStart(d as SimulationNode, i, nodes))
            )
            .attr('fill', (d) => this.colorHelper.getNodeColor(d))
            .style('stroke-width', d => d.highlighted ? 5 : 0)
            .style('stroke-dasharray', '5,3') // make the stroke dashed
            .style('stroke', 'pink')
            .style('stroke-opacity', d => d.isPlaceholder ? 0.4 : 0)
            .style('stroke-width', d => d.isPlaceholder ? 5 : 0)
            .style('stroke-dasharray', d => d.isPlaceholder ? '10,3' : '0,0') // make the stroke dashed
            .style('stroke', 'black')
            .style('opacity', d => d.isPlaceholder ? 0.8 : 1)
            .transition()
            .duration(transitionEnterTime)
            .attr('r', this.radius);
          return cir;
        },
        update => {
          update.attr('fill', (d) => this.colorHelper.getNodeColor(d))
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
            .attr('r', this.radius)
            .transition()
            .duration(transitionExitTime)
            .attr('r', d => d.highlighted ? this.radius * 1.5 : this.radius)
            .transition()
            .duration(transitionEnterTime)
            .attr('r', this.radius);
          return update;
        },
        exit => exit.remove()
      );
    this.canvas
      .selectAll('.circlevalues')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(
        enter => {
          const text = enter.append('text');
          text.attr('class', 'circlevalues')
            .attr('dy', d => this.radius / 4)
            .text(d => d.isValueVisible ? d.value : '')
            .style('text-anchor', 'middle')
            .attr('dx', d => this.radius / 2.3)
            .style('fill', 'white')
            .attr('pointer-events', 'none')
            // check if number is visible. else hide the number
            .attr('font-size', d => this.calculateFontSize(d.value.toString()))
            // enter animation
            .style('opacity', 0)
            .transition()
            .duration(transitionEnterTime)
            .style('opacity', 1);
          return text;
        }, update => {
          update
            .text(d => d.isValueVisible ? d.value : '')
            .attr('font-size', d => this.calculateFontSize(d.value.toString()))
            .raise();
          return update;
        }, exit => exit.remove()
      );

    this.canvas
      .selectAll('.circlenames')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(
        enter => {
          const text = enter.append('text');
          text.attr('class', 'circlenames')
            .attr('dx', (d) => d.isPlaceholder ? 0 : -40 / 2)
            .attr('dy', (d) => d.isPlaceholder ? 40 / 8 : 40 / 4)
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none')
            .attr('font-size', 0)
            .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
            .transition()
            .duration(transitionEnterTime)
            .attr('font-size', 16);
          return text;
        }, update => {
          update
            .text(d => !d.isPlaceholder ? `#${d.id}` : 'null')
            .raise();
          return update;
        }, exit => exit.remove()
      );

    this.canvas
      .selectAll('.circlearrow')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(
        (enter: Selection<d3.EnterElement, SimulationNode, any, any>) => {
          const line = enter.append('line');

          line.attr('class', 'circlearrow')
            .attr('x1', d => d.x)
            .attr('y1', d => d.y - 150)
            .attr('x2', d => d.x)
            .attr('y2', d => d.y - 100)
            .attr('stroke', 'black')
            .attr('stroke-width', 5)
            .attr('opacity', d => d.drawArrow ? 0.5 : 0)
            .attr('marker-end', 'url(#Triangle)');
          return line;
        }, update => {
          update
            .attr('opacity', d => d.drawArrow ? 0.5 : 0)
            .raise();
          return update;
        }, exit => exit.remove()
      );

    this.canvas
      .selectAll('.rootnames')
      .data(this.nodes, (d: SimulationNode) => d.id)
      .join(
        enter => {
          const text = enter.append('text');
          text.attr('class', 'rootnames')
            .attr('dx', 0)
            .attr('dy', -40 * 1.1)
            .style('text-anchor', 'middle')
            .attr('pointer-events', 'none')
            .attr('font-size', 32)
            .text(d => d.lockedGraph !== undefined && d.lockedGraph.root === d ? 'root' : '');
          return text;
        }, update => {
          update
            .text(d => d.lockedGraph !== undefined && d.lockedGraph !== null && d.lockedGraph.root === d ? 'root' : '')
            .raise();
          return update;
        }, exit => exit.remove()
      );
  }

  nodeMouseOver(d: SimulationNode, i: number, nodes: SVGCircleElement[] | ArrayLike<SVGCircleElement>): void {
    const circle = d3.select(nodes[i]);
    if (!this.nodes.includes(circle.datum() as SimulationNode)) {
      return;
    }
    if (!d.isInteractable) {
      circle.style('cursor', 'not-allowed');
      return;
    }
    // const circle = d3.select(this)
    circle.style('cursor', 'pointer');
    circle
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius + 10);
  }

  nodeMouseOut(d: SimulationNode, i: number, nodes: SVGCircleElement[] | ArrayLike<SVGCircleElement>): void {
    const circle = d3.select(nodes[i]);

    if (!this.nodes.includes(circle.datum() as SimulationNode)) {
      return;
    }
    if (!d.isInteractable) {
      return;
    }
    circle
      .transition()
      .duration(1000)
      .ease(d3.easeElastic)
      .attr('r', defaultRadius);
  }

  nodeClick(d: SimulationNode): void {
    if (d.lockedGrid) {

    }
  }

  nodeDragged(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    const node = nodes[i] as SVGCircleElement;
    const circle = d3.select(node);
    circle.style('cursor', 'grabbing');
    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }
    this.previouslyHoveredPlaceholders.forEach(c => c.attr('fill', 'white'));
    this.previouslyHoveredPlaceholders = [];

    if (!(d.isPlaceholder)) {
      this.nodes.filter(c => c.isPlaceholder).some((n: SimulationNode) => {
        if (d === n) {
          return false;
        }
        const distance = Math.sqrt((d.x - n.x) * (d.x - n.x) + (d.y - n.y) * (d.y - n.y));
        if (d !== n && distance < d.radius + n.radius + 10) {
          if (d.lockedGraph !== n.lockedGraph &&
            n.lockedGraph.allowAddingChildToPlaceholder) {
            // const circleElement = d3.selectAll('circle').filter((c) => c === n);
            this.previouslyHoveredPlaceholders.push(circle);
            circle.attr('fill', '#228B22');
            return true;
          }
          return true;
        }
      });
    }
    d.fx = d3.event.x;
    d.fy = d3.event.y;

    this.simulationHandler.draggedNode = d;
  }

  nodeDragStart(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }
    d.dragStartX = d.x;
    d.dragStartY = d.y;
    d3.selectAll('line').attr('pointer-events', 'none'); // remove hovering from all lines
    d.fx = d3.event.x;
    d.fy = d3.event.y;
    d3.select(nodes[i]).attr('pointer-events', 'none');
    d3.selectAll('.circle')
      .filter(c => c !== d)
      .attr('pointer-events', 'none'); // remove hovering from all nodes except d

  }

  nodeDragEnd(d: SimulationNode, i: number, nodes: Element[] | ArrayLike<Element>): void {
    if (!d) {
      d3.selectAll('line').attr('pointer-events', 'auto');
      d3.selectAll('.circle').attr('pointer-events', 'auto');
      this.simulationHandler.draggedNode = null;
      return;
    }

    if (d.isPlaceholder && d.lockedGraph.root !== d) {
      return;
    }

    d3.select(nodes[i]).style('cursor', 'pointer');

    const distanceDragged = Math.sqrt(Math.pow(d3.event.x - d.dragStartX, 2) + Math.pow(d3.event.y - d.dragStartY, 2));
    d3.selectAll('circle')
      .filter((nd: SimulationNode) => nd.isPlaceholder)
      .attr('fill', 'white');

    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.circle').attr('pointer-events', 'auto');

    if (distanceDragged < 20) {
      // short drag, do nothing
      if (this.simulationHandler.draggedNode && !this.simulationHandler.draggedNode.lockedGrid) {
        d.fx = undefined;
        d.fy = undefined;
      }

      this.simulationHandler.draggedNode = null;
      d.clicked();
      return;
    }

    d3.select(nodes[i]).attr('pointer-events', 'auto');

    if (this.simulationHandler.draggedNode) {
      // are we dragging a node

      // TODO

      // if (this.simulationHandler.draggedNode.lockedGraph) {
      //   const tree = this.simulationHandler.draggedNode.lockedGraph;
      //   const treeNode = tree.d3tree.descendants().filter(n => n.data === d)[0];
      //
      //   if (treeNode) {
      //     treeNode
      //       .descendants()
      //       .filter((d: SimulationNode) => d.data !== draggedNode)
      //       .forEach(d => {
      //         // d.data.tree_x = d3.event.x + d.data.tree_x - draggedNode.tree_x
      //         d.data.tree_y = d3.event.y + d.data.tree_y - draggedNode.tree_y
      //       })
      //     // draggedNode.tree_x  = d3.event.x
      //     draggedNode.tree_y = d3.event.y
      //     if (tree.root === draggedNode) {
      //       tree.setTransform(d3.event.x, d3.event.y)
      //     }
      //   }
      // }
      const arrayCell = d3
        .selectAll('.arraycell')
        .data()
        .filter((ac: ArrayCell) => ac.isMouseOver)[0] as ArrayCell; // select array cell where mouse is hovering over

      if (arrayCell) {
        // is mouse hovering over an arraycell
        if (!arrayCell.node) {
          if (d.lockedGrid) {
            d.lockedGrid.removeNode();
          }
          arrayCell.addNode(d);
        } else if (arrayCell.node === d) {
          // do nothing
        } else if (arrayCell.node !== d) {
          if (d.lockedGrid) {
            d.lockedGrid.removeNode();
          }
          arrayCell.removeNode();
          arrayCell.addNode(d);
        }
      } else {
        if (d.lockedGrid) {
          d.lockedGrid.removeNode();
        }
        d.fx = undefined;
        d.fy = undefined;
      }
      if (!this.simulationHandler.draggedNode.isPlaceholder) {
        console.log('dragended1');
        this.nodes
          .filter((nd: SimulationNode) => nd.isPlaceholder)
          .some((nd: SimulationNode) => {
            // check if there is a nearby node where aciton can be performed.
            if (d === nd) {
              return false;
            }
            const distance = Math.sqrt((d.x - nd.x) * (d.x - nd.x) + (d.y - nd.y) * (d.y - nd.y));
            if (d !== nd && distance < d.radius + nd.radius) {
              if (d.lockedGraph !== nd.lockedGraph && nd.lockedGraph.allowAddingChildToPlaceholder) {
                // d3.selectAll('circle').filter((c: SimulationNode) => c === nd);
                const tree = nd.lockedGraph;
                // should handle this with in bst instead
                if (tree.root.isPlaceholder) {

                  const root = tree.root;
                  if (d.lockedGraph) {
                    d.lockedGraph.setTransform(tree.x, tree.y);
                    // window.dataHandler.removeFigure(bst) TODO
                    d.lockedGraph.RedBlackBST = tree.RedBlackBST;
                  } else {
                    tree.root = d;
                    d.lockedGraph = d;
                  }
                  this.remove(root);
                  tree.updateLinks();
                  // repaint() TODO
                } else {
                  const index = nd.parent.children.indexOf(nd);
                  tree.addChild(d, nd.parent, index);
                }

                return true;
                // do something
              }
            }
          });
      }
    }
    if (d) {
      d.setTransform(d3.event.x, d3.event.y);
      this.simulationHandler.repaint();
    }
    d3.selectAll('line').attr('pointer-events', 'auto');
    d3.selectAll('.circle').attr('pointer-events', 'auto');
    if (this.simulationHandler.draggedNode && !this.simulationHandler.draggedNode.lockedGrid) {
      d.fx = undefined;
      d.fy = undefined;
    }
    this.simulationHandler.draggedNode = null;
  }

  remove(obj: SimulationNode | SimulationNode[]): void {
    if (Array.isArray(obj)) {
      obj.forEach(d => this.removeNode(d));
      this.quadtree.removeAll(obj);
    } else {
      this.removeNode(obj);
      this.quadtree.remove(obj);
    }
    this.draw();
    this.quadtree = d3.quadtree<SimulationNode>().x((d: SimulationNode) => d.x).y((d: SimulationNode) => d.y).addAll(this.nodes);
  }

  private removeNode(n): void {
    const index = this.nodes.indexOf(n);
    if (index !== -1) {
      this.nodes.splice(index, 1);
    }
  }

  clear(): void {
    this.quadtree.removeAll(this.quadtree.data());
    this.nodes = [];
    this.invisibleNodes = [];
    // todo repaint()
  }

  getRandomNode(noRoot: boolean): SimulationNode {
    const randomNodes = this.nodes.filter(d => !d.isPlaceholder && !(d.children && !d.parent));
    return randomNodes[Math.floor(Math.random() * (randomNodes.length - 1))];
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

  generateNodes(n: number, onClick: (nodeInfo: SimulationNode) => void): SimulationNode[] {
    const nodes: SimulationNode[] = [];
    for (let i = 0; i < n; ++i) {
      const rand = this.generateRandomValue(n);
      if (nodes.some(d => d.value === rand)) {
        continue;
      }
      const pos = this.positionHelper.createRandomPointOnCircumference([0, 0], 1);
      const node = new SimulationNode(rand, this.maxId++, pos[0] + 0, pos[1] + 0);
      nodes.push(node);
    }
    nodes.forEach(c => {
      c.onClick = onClick;
    });
    return nodes;
  }
}
