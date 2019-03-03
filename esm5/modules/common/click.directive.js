/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
/** @type {?} */
var clickElements = new Set();
var ClickDirective = /** @class */ (function () {
    function ClickDirective(renderer, elm, document) {
        this.renderer = renderer;
        this.elm = elm;
        this.document = document;
        this.click = new EventEmitter(); // tslint:disable-line
    }
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clickElements.add(this.elm.nativeElement);
        /** @type {?} */
        var eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
            ? 'tap'
            : 'click';
        this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, function (event) {
            // prevent child click events from firing on parent elements that also have click events
            /** @type {?} */
            var nearestClickableParent = event.target;
            while (!clickElements.has(nearestClickableParent) &&
                nearestClickableParent !== _this.document.body) {
                nearestClickableParent = nearestClickableParent.parentElement;
            }
            /** @type {?} */
            var isThisClickableElement = _this.elm.nativeElement === nearestClickableParent;
            if (isThisClickableElement) {
                _this.click.next(event);
            }
        });
    };
    /**
     * @return {?}
     */
    ClickDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeListener();
        clickElements.delete(this.elm.nativeElement);
    };
    ClickDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlClick]'
                },] }
    ];
    /** @nocollapse */
    ClickDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    ClickDirective.propDecorators = {
        click: [{ type: Output, args: ['mwlClick',] }]
    };
    return ClickDirective;
}());
export { ClickDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY29tbW9uL2NsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUdWLE1BQU0sRUFDTixZQUFZLEVBQ1osTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7SUFFckMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFlO0FBRTVDO0lBUUUsd0JBQ1UsUUFBbUIsRUFDbkIsR0FBNEIsRUFDVixRQUFRO1FBRjFCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBeUI7UUFDVixhQUFRLEdBQVIsUUFBUSxDQUFBO1FBUGhCLFVBQUssR0FBNkIsSUFBSSxZQUFZLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtJQVE3RixDQUFDOzs7O0lBRUosaUNBQVE7OztJQUFSO1FBQUEsaUJBeUJDO1FBeEJDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7WUFDcEMsU0FBUyxHQUNiLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxXQUFXO1lBQ3RFLENBQUMsQ0FBQyxLQUFLO1lBQ1AsQ0FBQyxDQUFDLE9BQU87UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFDdEIsU0FBUyxFQUNULFVBQUEsS0FBSzs7O2dCQUVDLHNCQUFzQixHQUFnQixLQUFLLENBQUMsTUFBTTtZQUN0RCxPQUNFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDMUMsc0JBQXNCLEtBQUssS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQzdDO2dCQUNBLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDLGFBQWEsQ0FBQzthQUMvRDs7Z0JBQ0ssc0JBQXNCLEdBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxLQUFLLHNCQUFzQjtZQUNuRCxJQUFJLHNCQUFzQixFQUFFO2dCQUMxQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELG9DQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0JBNUNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7Ozs7Z0JBZEMsU0FBUztnQkFDVCxVQUFVO2dEQXNCUCxNQUFNLFNBQUMsUUFBUTs7O3dCQVBqQixNQUFNLFNBQUMsVUFBVTs7SUF5Q3BCLHFCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7U0ExQ1ksY0FBYzs7O0lBQ3pCLCtCQUF5RTs7Ozs7SUFFekUsd0NBQW1DOzs7OztJQUdqQyxrQ0FBMkI7Ozs7O0lBQzNCLDZCQUFvQzs7Ozs7SUFDcEMsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBSZW5kZXJlcjIsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5jb25zdCBjbGlja0VsZW1lbnRzID0gbmV3IFNldDxIVE1MRWxlbWVudD4oKTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW213bENsaWNrXSdcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoJ213bENsaWNrJykgY2xpY2s6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgLy8gdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIHByaXZhdGUgcmVtb3ZlTGlzdGVuZXI6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjbGlja0VsZW1lbnRzLmFkZCh0aGlzLmVsbS5uYXRpdmVFbGVtZW50KTtcbiAgICBjb25zdCBldmVudE5hbWU6IHN0cmluZyA9XG4gICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93WydIYW1tZXInXSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyAndGFwJ1xuICAgICAgICA6ICdjbGljayc7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKFxuICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgIGV2ZW50TmFtZSxcbiAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgLy8gcHJldmVudCBjaGlsZCBjbGljayBldmVudHMgZnJvbSBmaXJpbmcgb24gcGFyZW50IGVsZW1lbnRzIHRoYXQgYWxzbyBoYXZlIGNsaWNrIGV2ZW50c1xuICAgICAgICBsZXQgbmVhcmVzdENsaWNrYWJsZVBhcmVudDogSFRNTEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHdoaWxlIChcbiAgICAgICAgICAhY2xpY2tFbGVtZW50cy5oYXMobmVhcmVzdENsaWNrYWJsZVBhcmVudCkgJiZcbiAgICAgICAgICBuZWFyZXN0Q2xpY2thYmxlUGFyZW50ICE9PSB0aGlzLmRvY3VtZW50LmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmVhcmVzdENsaWNrYWJsZVBhcmVudCA9IG5lYXJlc3RDbGlja2FibGVQYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RoaXNDbGlja2FibGVFbGVtZW50ID1cbiAgICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50ID09PSBuZWFyZXN0Q2xpY2thYmxlUGFyZW50O1xuICAgICAgICBpZiAoaXNUaGlzQ2xpY2thYmxlRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuY2xpY2submV4dChldmVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpO1xuICAgIGNsaWNrRWxlbWVudHMuZGVsZXRlKHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQpO1xuICB9XG59XG4iXX0=