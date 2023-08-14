import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  HostBinding, Input, Renderer2, ViewEncapsulation, Inject
} from '@angular/core';
import { NgxDragableResizableDirective } from '../directives/ngx-dragable-resizable.directive';
import { DOCUMENT } from '@angular/common';
import { Position } from '../directives/position';
import { GridLayoutService } from '../grid-layout.service';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styles: [
    `
    grid-item{
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

})
export class GridItemComponent implements AfterContentInit {
  w!: number;
  h!: number;
  x!: number;
  y!: number;
  width!: number;
  height!: number;

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

  ngAfterContentInit(): void {
    // this.render();
    this.dragResizeDirective.bounding =  this.gridService.gridLayout.el;
  }

  render() {
    let style = this.elementRef.nativeElement.style;
    style.width = this.width + 'px';
    style.height = this.height + 'px';
    this._changeDetect.detectChanges();

  }
  onMoveResizeEnd(event: Position) {
    const h = this.gridService.rowHeight + this.gridService.config.gap;
    const w = this.gridService.colWidth + this.gridService.config.gap + this.gridService.config.background.borderWidth
    const yOffset = event.point.y % h;
    const xOffset = event.point.x % w;
    console.log('offSetX', xOffset, 'offSetY', yOffset);

    const newX = event.translateX - xOffset; // (w / 2 < xOffset) ? event.translateX + xOffset : event.translateX - xOffset;
    const newY = event.translateY - yOffset;// (h / 2 < yOffset) ? event.translateY + yOffset : event.translateY - yOffset;
    this.dragResizeDirective.x = newX;
    this.dragResizeDirective.y = newY;

    this.elementRef.nativeElement.style.transform = `translate(${newX}px,${newY}px)`;
  }
}
