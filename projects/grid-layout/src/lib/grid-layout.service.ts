import { Injectable } from '@angular/core';
import { Configuration } from './models/confirguration';

@Injectable({
  providedIn: 'root'
})
export class GridLayoutService {
  colWidth = 50;
  rowHeight = 50;
  config = new Configuration();

  constructor() { }
}
