import { AfterContentInit, Component, ContentChildren, ElementRef, Input, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { GridItemComponent } from '../grid-item/grid-item.component';
import { Configuration, IConfiguration } from '../models/confirguration';
import { Layout } from '../models/layout';
import { mergeConfig } from '../utils/merge-config';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'grid',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class GridLayoutComponent implements OnInit, AfterContentInit {
  @Input('rowHieght') set _rowHeight(val: number) {
    if (typeof (val) == 'number')
      this.gridService.rowHeight = val;
  }
  @Input('config') set _config(val: IConfiguration) {
    this.gridService.config = mergeConfig(this.gridService.config, val);
  }
  @Input() layout: Layout[] = [];
  @ContentChildren(GridItemComponent, { descendants: true }) _gridItem?: QueryList<GridItemComponent>;

  el: HTMLElement;
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private gridService: GridLayoutService
  ) {
    this.el = elementRef.nativeElement;
    gridService.gridLayout = this;
  }


  ngOnInit(): void {

  }



  ngAfterContentInit(): void {
    this.gridService.colWidth = (this.el.offsetWidth - ((this.gridService.config.cols - 1) * this.gridService.config.gap) - (this.gridService.config.cols * this.gridService.config.background.borderWidth)) / this.gridService.config.cols;
    console.log('rowHeight', this.gridService.rowHeight, 'colWidth', this.gridService.colWidth);
    this.render();
    this.setBackgroundCssVariables();
  }



  render() {
    for (let i = 0; i < this.layout.length; i++) {
      if (this._gridItem && this._gridItem.toArray()[i]) {
        const findedItem = this._gridItem.find(x => x.id == this.layout[i].id);
        if (findedItem) {
          findedItem.width = this.gridService.colWidth * this.layout[i].width + this.gridService.config.gap * (this.layout[i].width - 1) + this.gridService.config.background.borderWidth * this.layout[i].width;
          findedItem.height = this.gridService.rowHeight * this.layout[i].height + this.gridService.config.gap * (this.layout[i].height - 1);// + this.gridService.config.background.borderWidth * this.layout[i].height * 2;
          findedItem.w = this.layout[i].width;
          findedItem.h = this.layout[i].height;
          findedItem.render();
        }
      }
    }
  }




  private setBackgroundCssVariables() {
    const style = (this.elementRef.nativeElement as HTMLDivElement).style;
    if (this.gridService.config.background) {
      // structure
      style.setProperty('--gap', this.gridService.config.gap + 'px');
      style.setProperty('--row-height', this.gridService.rowHeight + 'px');
      style.setProperty('--columns', `${this.gridService.config.cols}`);
      style.setProperty('--border-width', (this.gridService.config.background.borderWidth) + 'px');

      // colors
      style.setProperty('--border-color', this.gridService.config.background.borderColor);
      style.setProperty('--gap-color', this.gridService.config.background.gapColor);
      style.setProperty('--row-color', this.gridService.config.background.rowColor);
      style.setProperty('--column-color', this.gridService.config.background.columnColor);
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
