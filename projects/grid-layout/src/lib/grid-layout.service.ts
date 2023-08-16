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
    this.gridHeight = this.gridLayout._gridItem
      ? getBottomGrid(this.layout, this.rowHeight, this.config.gap)
      : 0;
    console.log(this.gridHeight);
    // }, 100);
  }

  getFreePosition(position: Layout, i = 0) {
    let l = this.layout[i];
    if (l.id == position.id) {
      return position;
    }
    if (position.x >= l.x && position.x < (l.x + l.w)) {
      position.x = l.x + l.w;
      this.getFreePosition(position, ++i);
    }
    return position;
  }



  checkLayoutOverlap(currL: Layout) {
    for (let l of this.layout) {
      if (l.id == currL.id)
        continue;
      if (collides(currL,l) ) {
        console.log('overlap with:', l.id);
        l.y = currL.y + currL.h;
        let gridItem = this.gridLayout._gridItem?.find(x => x.id == l.id);
        if (gridItem) {
          gridItem.position.y = l.y;
          gridItem.drawGridByLayout();
          this.calculateRenderData();
          this.checkLayoutOverlap(gridItem.position);
        }
      }
    }
  }
}

/*------------------------------------------------------*/
export function collides(l1: Layout, l2: Layout): boolean {
  if (l1.id === l2.id) {
      return false;
  } // same element
  if (l1.x + l1.w <= l2.x) {
      return false;
  } // l1 is left of l2
  if (l1.x >= l2.x + l2.w) {
      return false;
  } // l1 is right of l2
  if (l1.y + l1.h <= l2.y) {
      return false;
  } // l1 is above l2
  if (l1.y >= l2.y + l2.h) {
      return false;
  } // l1 is below l2
  return true; // boxes overlap
}



function getMaxGridItemHeight(layout: Layout[], rowHeight: number, gap: number): number {
  return layout.reduce((acc, cur) => Math.max(acc, (cur.y + cur.h) * rowHeight + Math.max(cur.y + cur.h - 1, 0) * gap), 0);
}
function getSumGridItemHeight(gridItem: GridItemComponent[]): number {
  return gridItem.reduce((sum, cur) => sum += (cur.left + cur.height), 0);
}
function getBottomGrid(layout: Layout[], rowHeight: number, gap: number): number {
  let bottomEl = layout[0];
  let prvY = 0;

  for (let item of layout) {
    //item.render();
    if (item.y + item.h > prvY) {
      prvY = item.y + item.h;
      bottomEl = item;
    }
  }
  console.info('last element in bottom is:', bottomEl?.id);
  const maxHeight = (bottomEl.y + bottomEl.h) * rowHeight + ((bottomEl.y + bottomEl.h - 1) * gap);
  return maxHeight;
}