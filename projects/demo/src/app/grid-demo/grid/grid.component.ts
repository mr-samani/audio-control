import { Component } from '@angular/core';
import { Configuration, IConfiguration } from 'projects/grid-layout/src/lib/models/confirguration';
import { Layout } from 'projects/grid-layout/src/lib/models/layout';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  layout: Layout[] = [
    { id: 'i1', width: 2, height: 3, x: 0, y: 0 },
    { id: 'i2', width: 3, height: 9, x: 0, y: 0 },
    { id: 'i3', width: 1, height: 1, x: 0, y: 0 },
  ];
  config: IConfiguration = {
    cols:12,
    gap: 20,
    background: {
      borderWidth: 5
    }
  };
}
