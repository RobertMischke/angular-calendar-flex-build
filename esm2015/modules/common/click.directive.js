/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
/** @type {?} */
const clickElements = new Set();
export class ClickDirective {
    /**
     * @param {?} renderer
     * @param {?} elm
     * @param {?} document
     */
    constructor(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.click = new EventEmitter(); // tslint:disable-line
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        clickElements.add(this.elm.nativeElement);
        /** @type {?} */
        const eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
            ? 'tap'
            : 'click';
        this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, event => {
            // prevent child click events from firing on parent elements that also have click events
            /** @type {?} */
            let nearestClickableParent = event.target;
            while (!clickElements.has(nearestClickableParent) &&
                nearestClickableParent !== this.document.body) {
                nearestClickableParent = nearestClickableParent.parentElement;
            }
            /** @type {?} */
            const isThisClickableElement = this.elm.nativeElement === nearestClickableParent;
            if (isThisClickableElement) {
                this.click.next(event);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeListener();
        clickElements.delete(this.elm.nativeElement);
    }
}
ClickDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mwlClick]'
            },] }
];
/** @nocollapse */
ClickDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ClickDirective.propDecorators = {
    click: [{ type: Output, args: ['mwlClick',] }]
};
if (false) {
    /** @type {?} */
    ClickDirective.prototype.click;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.removeListener;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.elm;
    /**
     * @type {?}
     * @private
     */
    ClickDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7TUFFckMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFlO0FBSzVDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7SUFLekIsWUFDVSxRQUFtQixFQUNuQixHQUE0QixFQUNWLFFBQVE7UUFGMUIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUNWLGFBQVEsR0FBUixRQUFRLENBQUE7UUFQaEIsVUFBSyxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDLENBQUMsc0JBQXNCO0lBUTdGLENBQUM7Ozs7SUFFSixRQUFRO1FBQ04sYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztjQUNwQyxTQUFTLEdBQ2IsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVc7WUFDdEUsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUMsT0FBTztRQUNiLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN0QixTQUFTLEVBQ1QsS0FBSyxDQUFDLEVBQUU7OztnQkFFRixzQkFBc0IsR0FBZ0IsS0FBSyxDQUFDLE1BQU07WUFDdEQsT0FDRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQzFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUM3QztnQkFDQSxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQyxhQUFhLENBQUM7YUFDL0Q7O2tCQUNLLHNCQUFzQixHQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsS0FBSyxzQkFBc0I7WUFDbkQsSUFBSSxzQkFBc0IsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUE1Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCOzs7O1lBZEMsU0FBUztZQUNULFVBQVU7NENBc0JQLE1BQU0sU0FBQyxRQUFROzs7b0JBUGpCLE1BQU0sU0FBQyxVQUFVOzs7O0lBQWxCLCtCQUF5RTs7Ozs7SUFFekUsd0NBQW1DOzs7OztJQUdqQyxrQ0FBMkI7Ozs7O0lBQzNCLDZCQUFvQzs7Ozs7SUFDcEMsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBjbGlja0VsZW1lbnRzID0gbmV3IFNldDxIVE1MRWxlbWVudD4oKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENsaWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjbGlja0VsZW1lbnRzLmFkZCh0aGlzLmVsbS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zdCBldmVudE5hbWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93WydIYW1tZXInXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyAndGFwJ1xuICAgICAgICA6ICdjbGljayc7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gcHJldmVudCBjaGlsZCBjbGljayBldmVudHMgZnJvbSBmaXJpbmcgb24gcGFyZW50IGVsZW1lbnRzIHRoYXQgYWxzbyBoYXZlIGNsaWNrIGV2ZW50c1xuICAgICAgICBsZXQgbmVhcmVzdENsaWNrYWJsZVBhcmVudDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChcbiAgICAgICAgICAhY2xpY2tFbGVtZW50cy5oYXMobmVhcmVzdENsaWNrYWJsZVBhcmVudCkgJiZcbiAgICAgICAgICBuZWFyZXN0Q2xpY2thYmxlUGFyZW50ICE9PSB0aGlzLmRvY3VtZW50LmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmVhcmVzdENsaWNrYWJsZVBhcmVudCA9IG5lYXJlc3RDbGlja2FibGVQYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RoaXNDbGlja2FibGVFbGVtZW50ID1cbiAgICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50ID09PSBuZWFyZXN0Q2xpY2thYmxlUGFyZW50O1xuICAgICAgICBpZiAoaXNUaGlzQ2xpY2thYmxlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuY2xpY2submV4dChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgIGNsaWNrRWxlbWVudHMuZGVsZXRlKHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG59XG4iXX0=