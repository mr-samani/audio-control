import { NgModule } from '@angular/core';
import { GridLayoutComponent } from './grid/grid-layout.component';
import { GridItemComponent } from '../public-api';



@NgModule({
  declarations: [
    GridLayoutComponent,
    GridItemComponent,
  ],
  imports: [
  ],
  exports: [
    GridLayoutComponent,
    GridItemComponent
  ]
})
export class GridLayoutModule { }
