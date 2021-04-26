// import {Selection} from 'd3-selection';
// import {SimulationLink} from '../basics/simulation-link';
// import {SimulationGraph} from '../structures/tree/simulation-graph';
// import * as d3 from 'd3';
//
// export class LinkHandler {
//   maxLinkId = 0;
//   graphs: SimulationGraph[] = [];
//   previousLinks: [] = [];
//   simulation: d3.Simulation<any, any>;
//
//   container: Selection<any, any, any, any>;
//
//   clear(): void {
//     if (this.container) {
//       this.container.remove();
//     }
//     this.container = undefined;
//   }
//
//   draw(canvas: Selection<any, any, any, any>): void {
//
//     const links = this.graphs.map(sg => sg.links).reduce((acc, sls) => acc.concat(sls);
//
//     if (!this.container) {
//       this.container = canvas.append('g');
//     }
//
//     links.forEach(l => {
//       const match = !!this.previousLinks.find(prev => prev.source.)
//     })
//   }
//
// }
