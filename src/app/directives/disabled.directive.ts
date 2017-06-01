import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({ selector: '[xm-Disabled]' })
export class DisabledDirective {
    constructor(el: ElementRef, renderer: Renderer) {
      //  renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
      console.log('aa');
      el.nativeElement.setAttribute('disabled','disabled');
      console.log(el);
    }
}
