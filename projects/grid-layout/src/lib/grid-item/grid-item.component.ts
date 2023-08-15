import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  HostBinding, Input, Renderer2, ViewEncapsulation, Inject, AfterViewInit
} from '@angular/core';
import { NgxDragableResizableDirective } from '../directives/ngx-dragable-resizable.directive';
import { DOCUMENT } from '@angular/common';
import { Position } from '../directives/position';
import { GridLayoutService } from '../grid-layout.service';
import { Layout } from '../models/layout';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styles: [
    `
    grid-item{
      position:absolute;
      display: block;
      box-sizing: border-box;
      transition: transform 500ms ease 0s, width 500ms ease 0s, height 500ms ease 0s;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{
    directive: NgxDragableResizableDirective,
    // outputs: ['onDragEnd']
  }],
  host: {
    //  '[style.position]': '"absolute"'
  }
})
export class GridItemComponent implements AfterViewInit, AfterContentInit {
  /** cell position */
  position = new Layout();
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  index = 0;
  @Input() id: string = 'grid-item';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef<HTMLElement>,
    private _changeDetect: ChangeDetectorRef,
    private _renderer: Renderer2,
    private dragResizeDirective: NgxDragableResizableDirective,
    private gridService: GridLayoutService
  ) {
    dragResizeDirective.onDragEnd.subscribe(val => {
      this.onMoveResizeEnd(val);
    });
    dragResizeDirective.onResizeEnd.subscribe(val => {
      this.onMoveResizeEnd(val);
    });
  }
  ngAfterViewInit(): void {
    // if (this.elementRef.nativeElement.getAnimations().length === 0) {
    //   debugger
    //   this.calcXY();
    // } else {
    //   debugger
    //   this.elementRef.nativeElement.addEventListener('animationend', (ev) => {
    //     debugger
    //     this.calcXY();
    //   });
    // }
  }

  ngAfterContentInit(): void {
    // this.render();
    this.dragResizeDirective.bounding = this.gridService.gridLayout.el;
  }

  render() {
    this.width = this.gridService.colWidth * this.position.w + this.gridService.config.gap * (this.position.w - 1);
    this.height = this.gridService.rowHeight * this.position.h + this.gridService.config.gap * (this.position.h - 1);
    let style = this.elementRef.nativeElement.style;
    style.width = this.width + 'px';
    style.height = this.height + 'px';

    
    this.position = this.gridService.getFreePosition(this.position);
    style.left = this.gridService.colWidth * this.position.x + this.gridService.config.gap * (this.position.x) + 'px';
    // to do if rtl decrease left
    this.calcXY();
    this.calcCell();
    this._changeDetect.detectChanges();
  }






  onMoveResizeEnd(event: Position) {

    const h = this.gridService.rowHeight + this.gridService.config.gap;
    const w = this.gridService.colWidth + this.gridService.config.gap;
    const yOffset = event.point.y % h;
    const xOffset = event.point.x % w;
    //  console.log('offSetX', xOffset, 'offSetY', yOffset);

    const newX = (this.gridService.colWidth / 2 < xOffset) ? event.translateX + (w - xOffset) : event.translateX - xOffset;
    const newY = (this.gridService.rowHeight / 2 < yOffset) ? event.translateY + (h - yOffset) : event.translateY - yOffset;
    this.dragResizeDirective.x = newX;
    this.dragResizeDirective.y = newY;

    this.elementRef.nativeElement.style.transform = `translate(${newX}px,${newY}px)`;
    //---------------calc x,y---------------
    this.calcXY();
    // -------------resize------------
    const rOffset = (this.x + event.width) % w;
    const bOffset = (this.y + event.height) % h;
    let newWidth = event.width + this.gridService.colWidth - rOffset;
    let newHeight = event.height + this.gridService.rowHeight - bOffset;
    this.elementRef.nativeElement.style.width = `${newWidth}px`;
    this.elementRef.nativeElement.style.height = `${newHeight}px`;
    this.height = newHeight;
    this.width = newWidth;
    //---------------calc cells--------------
    this.calcCell();
    this.gridService.calculateRenderData();
  }

  calcXY() {
    const selfBounding = this.elementRef.nativeElement.getBoundingClientRect();
    const parentBounding = this.gridService.gridLayout.el.getBoundingClientRect();
    // scroll offset
    var doc = document.documentElement;
    var left = (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.scrollY || doc.scrollTop) - (doc.clientTop || 0);

    this.x = selfBounding.x - parentBounding.x;//+ left;
    this.y = selfBounding.y - parentBounding.y;// + top;
  }


  calcCell() {
    this.position.w = Math.round(this.width / (this.gridService.colWidth + this.gridService.config.gap));
    this.position.h = Math.round(this.height / (this.gridService.rowHeight + this.gridService.config.gap));
    this.position.x = Math.round(this.x / (this.gridService.colWidth + this.gridService.config.gap));
    this.position.y = Math.round(this.y / (this.gridService.rowHeight + this.gridService.config.gap));
    // set position in main layout
    this.gridService.layout[this.index] = this.position;
  }
}
