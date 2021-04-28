import * as d3 from 'd3';
import {MenuItem} from 'd3-context-menu';

export interface ContextMenuBehavior {
  getContextMenu(): MenuItem[];
}
