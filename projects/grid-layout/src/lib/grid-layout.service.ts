import { Injectable } from '@angular/core';
import { Configuration } from './models/confirguration';
import { GridItemComponent, GridLayoutComponent } from '../public-api';
import { Layout } from './models/layout';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  colWidth = 50;
  rowHeight = 50;
  config = new Configuration();
  gridLayout!: GridLayoutComponent;
  layout: Layout[] = [];
  gridHeight = 300;
  constructor() { }



  calculateRenderData() {
   // setTimeout(() => {
      this.gridHeight = this.gridLayout._gridItem ? getBottomGrid(this.layout, this.rowHeight, this.config.gap) : 0;
      console.log(this.gridHeight);
   // }, 100);
  }

}

function getMaxGridItemHeight(layout: Layout[], rowHeight: number, gap: number): number {
  return layout.reduce((acc, cur) => Math.max(acc, (cur.y + cur.height) * rowHeight + Math.max(cur.y + cur.height - 1, 0) * gap), 0);
}
function getSumGridItemHeight(gridItem: GridItemComponent[]): number {
  return gridItem.reduce((sum, cur) => sum += (cur.y + cur.height), 0);
}
function getBottomGrid(layout: Layout[], rowHeight: number, gap: number): number {
  let bottomEl = layout[0];
  let prvY = 0;

  for (let item of layout) {
    //item.render();
    if (item.y + item.height > prvY) {
      prvY = item.y + item.height;
      bottomEl = item;
    }
  }
  console.info('last element in bottom is:', bottomEl?.id);
  const maxHeight = (bottomEl.y + bottomEl.height) * rowHeight + ((bottomEl.y + bottomEl.height - 1) * gap);
  return maxHeight;
}