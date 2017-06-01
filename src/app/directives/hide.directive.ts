import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';
@Directive({ selector: '[xmHide]' })
export class HideDirective {
    @Input() xm_hide: boolean;
    // @Input() highlightColor: string;
    @Input('xmHide') highlightColor: boolean;
    public renderer:any;
    constructor(el: ElementRef, renderer: Renderer) {
        this.renderer = renderer;
    }
    ngOnInit() {
        console.log('init');
        console.log(this.highlightColor);
        console.log(this.renderer);
    }
    // @HostListener('click') onMouseEnter() {
    //     // this.highlight('yellow');
    //     console.log(this.highlightColor);
    // }
}
