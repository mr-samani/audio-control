import { Injectable } from '@angular/core';
import { Configuration } from './models/confirguration';
import { GridLayoutComponent } from '../public-api';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  colWidth = 50;
  rowHeight = 50;
  config = new Configuration();
  gridLayout!: GridLayoutComponent;
  constructor() { }
}
