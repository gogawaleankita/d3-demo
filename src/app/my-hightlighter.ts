import {Directive,ElementRef} from '@angular/core';

@Directive({
    selector:"[my-hightlighter]"
})
export class MyHightLighterComponent{

    constructor(private el:ElementRef ){
            el.nativeElement.style.background="pink";
           
            
    }
}