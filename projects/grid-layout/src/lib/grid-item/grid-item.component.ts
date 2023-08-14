import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'grid-item',
  templateUrl: './grid-item.component.html',
  styles: [
    `
    grid-item{
      display: block;
      transition: transform 500ms ease 0s, width 500ms ease 0s, height 500ms ease 0s;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private elementRef: ElementRef<HTMLElement>,
    private _changeDetect: ChangeDetectorRef
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
