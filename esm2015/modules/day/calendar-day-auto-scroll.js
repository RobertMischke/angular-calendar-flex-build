/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export default class CalendarDayAutoScroll {
    /**
     * @param {?} scrollContainer
     */
    constructor(scrollContainer) {
        console.log("scrollContainer", scrollContainer);
        if (scrollContainer != null) {
            this.scrollContainer = scrollContainer;
        }
        else {
            this.scrollContainer = window;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        this.event = event;
    }
    /**
     * @param {?} dragMoveEvent
     * @return {?}
     */
    dragMove(dragMoveEvent) {
        /** @type {?} */
        const boundingContext = this.event.getBoundingClientRect();
        /** @type {?} */
        const eventElemHeight = boundingContext.height;
        /** @type {?} */
        const eventElementBottom = boundingContext.bottom + dragMoveEvent.y;
        /** @type {?} */
        const eventElementTop = eventElementBottom - eventElemHeight;
        if (eventElementTop < 90) {
            this.scrollContainer.scroll(0, window.scrollY - 7);
        }
        else if (window.innerHeight - 20 < eventElementBottom) {
            this.scrollContainer.scroll(0, window.scrollY + 7);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarDayAutoScroll.prototype.event;
    /**
     * @type {?}
     * @private
     */
    CalendarDayAutoScroll.prototype.scrollContainer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LWF1dG8tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS1hdXRvLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sT0FBTyxxQkFBcUI7Ozs7SUFLeEMsWUFBWSxlQUFzQztRQUVoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWhELElBQUcsZUFBZSxJQUFJLElBQUksRUFBQztZQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztTQUN4QzthQUFJO1lBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXJCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLGFBQTRCOztjQUM3QixlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTs7Y0FDcEQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNOztjQUN4QyxrQkFBa0IsR0FBRyxlQUFlLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDOztjQUM3RCxlQUFlLEdBQUcsa0JBQWtCLEdBQUcsZUFBZTtRQUU1RCxJQUFJLGVBQWUsR0FBRyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7YUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLGtCQUFrQixFQUFFO1lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUFoQ0Msc0NBQTJCOzs7OztJQUUzQixnREFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcmFnTW92ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1kcmFnZ2FibGUtZHJvcHBhYmxlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyRGF5QXV0b1Njcm9sbCB7XHJcbiAgcHJpdmF0ZSBldmVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsQ29udGFpbmVyOiBIVE1MRWxlbWVudCB8IFdpbmRvdztcclxuXHJcbiAgY29uc3RydWN0b3Ioc2Nyb2xsQ29udGFpbmVyIDogSFRNTEVsZW1lbnQgfCBXaW5kb3cpe1xyXG5cclxuICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsQ29udGFpbmVyXCIsIHNjcm9sbENvbnRhaW5lcik7XHJcblxyXG4gICAgaWYoc2Nyb2xsQ29udGFpbmVyICE9IG51bGwpe1xyXG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lciA9IHNjcm9sbENvbnRhaW5lcjtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lciA9IHdpbmRvdztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGRyYWdTdGFydChldmVudDogYW55KSB7XHJcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XHJcblxyXG4gIH1cclxuXHJcbiAgZHJhZ01vdmUoZHJhZ01vdmVFdmVudDogRHJhZ01vdmVFdmVudCkge1xyXG4gICAgY29uc3QgYm91bmRpbmdDb250ZXh0ID0gdGhpcy5ldmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IGV2ZW50RWxlbUhlaWdodCA9IGJvdW5kaW5nQ29udGV4dC5oZWlnaHQ7XHJcbiAgICBjb25zdCBldmVudEVsZW1lbnRCb3R0b20gPSBib3VuZGluZ0NvbnRleHQuYm90dG9tICsgZHJhZ01vdmVFdmVudC55O1xyXG4gICAgY29uc3QgZXZlbnRFbGVtZW50VG9wID0gZXZlbnRFbGVtZW50Qm90dG9tIC0gZXZlbnRFbGVtSGVpZ2h0O1xyXG5cclxuICAgIGlmIChldmVudEVsZW1lbnRUb3AgPCA5MCkge1xyXG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5zY3JvbGwoMCwgd2luZG93LnNjcm9sbFkgLSA3KTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gMjAgPCBldmVudEVsZW1lbnRCb3R0b20pIHtcclxuICAgICAgdGhpcy5zY3JvbGxDb250YWluZXIuc2Nyb2xsKDAsIHdpbmRvdy5zY3JvbGxZICsgNyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==