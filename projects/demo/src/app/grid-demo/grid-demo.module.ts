import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid/grid.component';
import { GridDemoRoutingModule } from './grid-demo-routing.module';
import { GridLayoutModule } from 'projects/grid-layout/src/public-api';


@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    GridDemoRoutingModule,
    GridLayoutModule
  ]
})
export class GridDemoModule { }
