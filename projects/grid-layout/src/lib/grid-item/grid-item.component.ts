import {
  AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
  HostBinding, Input, Renderer2, ViewEncapsulation, Inject
} from '@angular/core';
import { NgxDragableResizableDirective } from '../directives/ngx-dragable-resizable.directive';
import { DOCUMENT } from '@angular/common';

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
  hostDirectives: [NgxDragableResizableDirective]
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
    private _renderer: Renderer2
  ) {

  }

  ngAfterContentInit(): void {
    // this.render();
  }

  render() {
    let style = this.elementRef.nativeElement.style;
    style.width = this.width + 'px';
    style.height = this.height + 'px';
    this._changeDetect.detectChanges();

  }

}
