/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Component, HostListener, Input, Injector, ComponentFactoryResolver, ViewContainerRef, ElementRef, Inject, Renderer2, TemplateRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { positionElements } from 'positioning';
import { of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
var CalendarTooltipWindowComponent = /** @class */ (function () {
    function CalendarTooltipWindowComponent() {
    }
    CalendarTooltipWindowComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-tooltip-window',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\"\n    >\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarTooltipWindowComponent.propDecorators = {
        contents: [{ type: Input }],
        placement: [{ type: Input }],
        event: [{ type: Input }],
        customTemplate: [{ type: Input }]
    };
    return CalendarTooltipWindowComponent;
}());
export { CalendarTooltipWindowComponent };
if (false) {
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.contents;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.placement;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.event;
    /** @type {?} */
    CalendarTooltipWindowComponent.prototype.customTemplate;
}
var CalendarTooltipDirective = /** @class */ (function () {
    function CalendarTooltipDirective(elementRef, injector, renderer, componentFactoryResolver, viewContainerRef, document //tslint:disable-line
    ) {
        this.elementRef = elementRef;
        this.injector = injector;
        this.renderer = renderer;
        this.viewContainerRef = viewContainerRef;
        this.document = document;
        // tslint:disable-line no-input-rename
        this.placement = 'auto'; // tslint:disable-line no-input-rename
        // tslint:disable-line no-input-rename
        this.delay = null; // tslint:disable-line no-input-rename
        this.cancelTooltipDelay$ = new Subject();
        this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(CalendarTooltipWindowComponent);
    }
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOver = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var delay$ = this.delay === null ? of('now') : timer(this.delay);
        delay$.pipe(takeUntil(this.cancelTooltipDelay$)).subscribe(function () {
            _this.show();
        });
    };
    /**
     * @return {?}
     */
    CalendarTooltipDirective.prototype.onMouseOut = /**
     * @return {?}
     */
    function () {
        this.hide();
    };
    /**
     * @private
     * @return {?}
     */
    CalendarTooltipDirective.prototype.show = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.tooltipRef && this.contents) {
            this.tooltipRef = this.viewContainerRef.createComponent(this.tooltipFactory, 0, this.injector, []);
            this.tooltipRef.instance.contents = this.contents;
            this.tooltipRef.instance.customTemplate = this.customTemplate;
            this.tooltipRef.instance.event = this.event;
            if (this.appendToBody) {
                this.document.body.appendChild(this.tooltipRef.location.nativeElement);
            }
            requestAnimationFrame(function () {
                _this.positionTooltip();
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    CalendarTooltipDirective.prototype.hide = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.tooltipRef) {
            this.viewContainerRef.remove(this.viewContainerRef.indexOf(this.tooltipRef.hostView));
            this.tooltipRef = null;
        }
        this.cancelTooltipDelay$.next();
    };
    /**
     * @private
     * @param {?=} previousPosition
     * @return {?}
     */
    CalendarTooltipDirective.prototype.positionTooltip = /**
     * @private
     * @param {?=} previousPosition
     * @return {?}
     */
    function (previousPosition) {
        if (this.tooltipRef) {
            this.tooltipRef.changeDetectorRef.detectChanges();
            this.tooltipRef.instance.placement = positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
            // keep re-positioning the tooltip until the arrow position doesn't make a difference
            if (previousPosition !== this.tooltipRef.instance.placement) {
                this.positionTooltip(this.tooltipRef.instance.placement);
            }
        }
    };
    CalendarTooltipDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mwlCalendarTooltip]'
                },] }
    ];
    /** @nocollapse */
    CalendarTooltipDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Injector },
        { type: Renderer2 },
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    CalendarTooltipDirective.propDecorators = {
        contents: [{ type: Input, args: ['mwlCalendarTooltip',] }],
        placement: [{ type: Input, args: ['tooltipPlacement',] }],
        customTemplate: [{ type: Input, args: ['tooltipTemplate',] }],
        event: [{ type: Input, args: ['tooltipEvent',] }],
        appendToBody: [{ type: Input, args: ['tooltipAppendToBody',] }],
        delay: [{ type: Input, args: ['tooltipDelay',] }],
        onMouseOver: [{ type: HostListener, args: ['mouseenter',] }],
        onMouseOut: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return CalendarTooltipDirective;
}());
export { CalendarTooltipDirective };
if (false) {
    /** @type {?} */
    CalendarTooltipDirective.prototype.contents;
    /** @type {?} */
    CalendarTooltipDirective.prototype.placement;
    /** @type {?} */
    CalendarTooltipDirective.prototype.customTemplate;
    /** @type {?} */
    CalendarTooltipDirective.prototype.event;
    /** @type {?} */
    CalendarTooltipDirective.prototype.appendToBody;
    /** @type {?} */
    CalendarTooltipDirective.prototype.delay;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.tooltipFactory;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.tooltipRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.cancelTooltipDelay$;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    CalendarTooltipDirective.prototype.document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBRUwsUUFBUSxFQUNSLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxFQUVWLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQWtCLGdCQUFnQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRS9ELE9BQU8sRUFBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7SUFBQTtJQWlDQSxDQUFDOztnQkFqQ0EsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLFFBQVEsRUFBRSw4bUJBcUJUO2lCQUNGOzs7MkJBRUUsS0FBSzs0QkFFTCxLQUFLO3dCQUVMLEtBQUs7aUNBRUwsS0FBSzs7SUFDUixxQ0FBQztDQUFBLEFBakNELElBaUNDO1NBUlksOEJBQThCOzs7SUFDekMsa0RBQTBCOztJQUUxQixtREFBMkI7O0lBRTNCLCtDQUE4Qjs7SUFFOUIsd0RBQTBDOztBQUc1QztJQW9CRSxrQ0FDVSxVQUFzQixFQUN0QixRQUFrQixFQUNsQixRQUFtQixFQUMzQix3QkFBa0QsRUFDMUMsZ0JBQWtDLEVBQ2hCLFFBQVEsQ0FBQyxxQkFBcUI7O1FBTGhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FB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dGl2ZSxcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0b3IsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgSW5qZWN0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXksIHBvc2l0aW9uRWxlbWVudHMgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5pbXBvcnQgeyBDYWxlbmRhckV2ZW50IH0gZnJvbSAnY2FsZW5kYXItdXRpbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci10b29sdGlwLXdpbmRvdycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtY29udGVudHM9XCJjb250ZW50c1wiXG4gICAgICBsZXQtcGxhY2VtZW50PVwicGxhY2VtZW50XCJcbiAgICAgIGxldC1ldmVudD1cImV2ZW50XCJcbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXBcIiBbbmdDbGFzc109XCInY2FsLXRvb2x0aXAtJyArIHBsYWNlbWVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsLXRvb2x0aXAtYXJyb3dcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10b29sdGlwLWlubmVyXCIgW2lubmVySHRtbF09XCJjb250ZW50c1wiPjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBjb250ZW50czogY29udGVudHMsXG4gICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgICBldmVudDogZXZlbnRcbiAgICAgIH1cIlxuICAgID5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIENhbGVuZGFyVG9vbHRpcFdpbmRvd0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbnRlbnRzOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttd2xDYWxlbmRhclRvb2x0aXBdJ1xufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhclRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ213bENhbGVuZGFyVG9vbHRpcCcpIGNvbnRlbnRzOiBzdHJpbmc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwUGxhY2VtZW50JykgcGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJzsgLy8gdHNsaW50OmRpc2FibGUtbGluZSBuby1pbnB1dC1yZW5hbWVcblxuICBASW5wdXQoJ3Rvb2x0aXBUZW1wbGF0ZScpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcEV2ZW50JykgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmUgbm8taW5wdXQtcmVuYW1lXG5cbiAgQElucHV0KCd0b29sdGlwQXBwZW5kVG9Cb2R5JykgYXBwZW5kVG9Cb2R5OiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIEBJbnB1dCgndG9vbHRpcERlbGF5JykgZGVsYXk6IG51bWJlciB8IG51bGwgPSBudWxsOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lIG5vLWlucHV0LXJlbmFtZVxuXG4gIHByaXZhdGUgdG9vbHRpcEZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSB0b29sdGlwUmVmOiBDb21wb25lbnRSZWY8Q2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBjYW5jZWxUb29sdGlwRGVsYXkkID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50IC8vdHNsaW50OmRpc2FibGUtbGluZVxuICApIHtcbiAgICB0aGlzLnRvb2x0aXBGYWN0b3J5ID0gY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgQ2FsZW5kYXJUb29sdGlwV2luZG93Q29tcG9uZW50XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZSgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VPdmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IGRlbGF5JDogT2JzZXJ2YWJsZTxhbnk+ID1cbiAgICAgIHRoaXMuZGVsYXkgPT09IG51bGwgPyBvZignbm93JykgOiB0aW1lcih0aGlzLmRlbGF5KTtcbiAgICBkZWxheSQucGlwZSh0YWtlVW50aWwodGhpcy5jYW5jZWxUb29sdGlwRGVsYXkkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0pO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VPdXQoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIHNob3coKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRvb2x0aXBSZWYgJiYgdGhpcy5jb250ZW50cykge1xuICAgICAgdGhpcy50b29sdGlwUmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgdGhpcy50b29sdGlwRmFjdG9yeSxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5pbmplY3RvcixcbiAgICAgICAgW11cbiAgICAgICk7XG4gICAgICB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UuY29udGVudHMgPSB0aGlzLmNvbnRlbnRzO1xuICAgICAgdGhpcy50b29sdGlwUmVmLmluc3RhbmNlLmN1c3RvbVRlbXBsYXRlID0gdGhpcy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5ldmVudCA9IHRoaXMuZXZlbnQ7XG4gICAgICBpZiAodGhpcy5hcHBlbmRUb0JvZHkpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucG9zaXRpb25Ub29sdGlwKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcFJlZikge1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLnJlbW92ZShcbiAgICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmluZGV4T2YodGhpcy50b29sdGlwUmVmLmhvc3RWaWV3KVxuICAgICAgKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZiA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsVG9vbHRpcERlbGF5JC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIHBvc2l0aW9uVG9vbHRpcChwcmV2aW91c1Bvc2l0aW9uPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbHRpcFJlZikge1xuICAgICAgdGhpcy50b29sdGlwUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5wbGFjZW1lbnQgPSBwb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy50b29sdGlwUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sXG4gICAgICAgIHRoaXMucGxhY2VtZW50LFxuICAgICAgICB0aGlzLmFwcGVuZFRvQm9keVxuICAgICAgKTtcbiAgICAgIC8vIGtlZXAgcmUtcG9zaXRpb25pbmcgdGhlIHRvb2x0aXAgdW50aWwgdGhlIGFycm93IHBvc2l0aW9uIGRvZXNuJ3QgbWFrZSBhIGRpZmZlcmVuY2VcbiAgICAgIGlmIChwcmV2aW91c1Bvc2l0aW9uICE9PSB0aGlzLnRvb2x0aXBSZWYuaW5zdGFuY2UucGxhY2VtZW50KSB7XG4gICAgICAgIHRoaXMucG9zaXRpb25Ub29sdGlwKHRoaXMudG9vbHRpcFJlZi5pbnN0YW5jZS5wbGFjZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19