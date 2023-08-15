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
    this.gridHeight = this.gridLayout._gridItem ? getBottomGrid(this.gridLayout._gridItem.toArray()) : 0;
    console.log(this.gridHeight);
  }

}

function getMaxGridItemHeight(layout: Layout[], rowHeight: number, gap: number): number {
  return layout.reduce((acc, cur) => Math.max(acc, (cur.y + cur.height) * rowHeight + Math.max(cur.y + cur.height - 1, 0) * gap), 0);
}
function getSumGridItemHeight(gridItem: GridItemComponent[]): number {
  return gridItem.reduce((sum, cur) => sum += (cur.y + cur.height), 0);
}
function getBottomGrid(gridItem: GridItemComponent[]): number {
  let bottomEl;
  let prvY = 0;
  for (let item of gridItem) {
    //item.render();
    if (item.y + item.height > prvY) {
      prvY = item.y + item.height;
      bottomEl = item;
    }
  }
  console.info('last element in bottom is:', bottomEl?.id);
  return bottomEl ? (bottomEl.height + bottomEl.y) : 0;
}