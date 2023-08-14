import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { Configuration } from '../models/confirguration';
import { Layout } from '../models/layout';

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
  @Input() layout: Layout[] = [];
  @ContentChildren(GridItemComponent, { descendants: true }) _gridItem?: QueryList<GridItemComponent>;

  private _colWidth = 0;
  private el: HTMLElement;
  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.el = elementRef.nativeElement;
  }


  ngOnInit(): void {

  }



  ngAfterContentInit(): void {
    this._colWidth = (this.el.offsetWidth - ((this._config.cols - 1) * (this._config.gap ?? 0))) / this._config.cols;
    console.log('colWidth', this._colWidth, 'colHeight', this._rowHeight);
    this.render();

    this.setBackgroundCssVariables(this._rowHeight);
  }



  render() {
    for (let i = 0; i < this.layout.length; i++) {
      if (this._gridItem && this._gridItem.toArray()[i]) {
        const findedItem = this._gridItem.find(x => x.id == this.layout[i].id);
        if (findedItem) {
          findedItem.width = this._colWidth * this.layout[i].width + (this._config.gap ?? 0) * (this.layout[i].width - 1) + (this._config.background?.borderWidth ?? 0 * this.layout[i].width);
          findedItem.height = this._rowHeight * this.layout[i].height + (this._config.gap ?? 0) * (this.layout[i].height - 1)+ (this._config.background?.borderWidth ?? 0 * this.layout[i].height);
          findedItem.w = this.layout[i].width;
          findedItem.h = this.layout[i].height;
          findedItem.render();
        }
      }
    }
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
