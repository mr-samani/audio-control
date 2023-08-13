import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { Configuration } from '../models/confirguration';

@Component({
  selector: 'grid',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GridLayoutComponent implements OnInit, AfterContentInit {
  @Input('rowHieght') _rowHeight = 50;
  _config = new Configuration();
  @Input('config') set config(val: Configuration) {
    this._config = { ...this._config, ...val };
  }
  @ContentChildren(GridItemComponent, { descendants: true }) _gridItem?: QueryList<GridItemComponent>;


  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {

  }


  ngOnInit(): void {
  }


  
  ngAfterContentInit(): void {
    this.setBackgroundCssVariables(this._rowHeight);
  }



  private setBackgroundCssVariables(rowHeight: number) {
    const style = (this.elementRef.nativeElement as HTMLDivElement).style;
    if (this._config.background) {
      // structure
      style.setProperty('--gap', this._config.gap + 'px');
      style.setProperty('--row-height', rowHeight + 'px');
      style.setProperty('--columns', `${this._config.cols}`);
      style.setProperty('--border-width', (this._config.background.borderWidth) + 'px');

      // colors
      style.setProperty('--border-color', this._config.background.borderColor);
      style.setProperty('--gap-color', this._config.background.gapColor);
      style.setProperty('--row-color', this._config.background.rowColor);
      style.setProperty('--column-color', this._config.background.columnColor);
    } else {
      style.removeProperty('--gap');
      style.removeProperty('--row-height');
      style.removeProperty('--columns');
      style.removeProperty('--border-width');
      style.removeProperty('--border-color');
      style.removeProperty('--gap-color');
      style.removeProperty('--row-color');
      style.removeProperty('--column-color');
    }
  }

}
