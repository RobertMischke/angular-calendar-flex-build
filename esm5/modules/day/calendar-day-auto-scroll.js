/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarDayAutoScroll = /** @class */ (function () {
    function CalendarDayAutoScroll(scrollContainer) {
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
    CalendarDayAutoScroll.prototype.dragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.event = event;
    };
    /**
     * @param {?} dragMoveEvent
     * @return {?}
     */
    CalendarDayAutoScroll.prototype.dragMove = /**
     * @param {?} dragMoveEvent
     * @return {?}
     */
    function (dragMoveEvent) {
        /** @type {?} */
        var boundingContext = this.event.getBoundingClientRect();
        /** @type {?} */
        var eventElemHeight = boundingContext.height;
        /** @type {?} */
        var eventElementBottom = boundingContext.bottom + dragMoveEvent.y;
        /** @type {?} */
        var eventElementTop = eventElementBottom - eventElemHeight;
        if (eventElementTop < 90) {
            this.scrollContainer.scroll(0, window.scrollY - 7);
        }
        else if (window.innerHeight - 20 < eventElementBottom) {
            this.scrollContainer.scroll(0, window.scrollY + 7);
        }
    };
    return CalendarDayAutoScroll;
}());
export default CalendarDayAutoScroll;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LWF1dG8tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS1hdXRvLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFLRSwrQkFBWSxlQUFzQztRQUVoRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWhELElBQUcsZUFBZSxJQUFJLElBQUksRUFBQztZQUN6QixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztTQUN4QzthQUFJO1lBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7U0FDL0I7SUFDSCxDQUFDOzs7OztJQUVELHlDQUFTOzs7O0lBQVQsVUFBVSxLQUFVO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRXJCLENBQUM7Ozs7O0lBRUQsd0NBQVE7Ozs7SUFBUixVQUFTLGFBQTRCOztZQUM3QixlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTs7WUFDcEQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNOztZQUN4QyxrQkFBa0IsR0FBRyxlQUFlLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDOztZQUM3RCxlQUFlLEdBQUcsa0JBQWtCLEdBQUcsZUFBZTtRQUU1RCxJQUFJLGVBQWUsR0FBRyxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEQ7YUFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLGtCQUFrQixFQUFFO1lBQ3ZELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQzs7Ozs7OztJQWhDQyxzQ0FBMkI7Ozs7O0lBRTNCLGdEQUE4QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdNb3ZlRXZlbnQgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJEYXlBdXRvU2Nyb2xsIHtcclxuICBwcml2YXRlIGV2ZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBzY3JvbGxDb250YWluZXI6IEhUTUxFbGVtZW50IHwgV2luZG93O1xyXG5cclxuICBjb25zdHJ1Y3RvcihzY3JvbGxDb250YWluZXIgOiBIVE1MRWxlbWVudCB8IFdpbmRvdyl7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJzY3JvbGxDb250YWluZXJcIiwgc2Nyb2xsQ29udGFpbmVyKTtcclxuXHJcbiAgICBpZihzY3JvbGxDb250YWluZXIgIT0gbnVsbCl7XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gc2Nyb2xsQ29udGFpbmVyO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gd2luZG93O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJhZ1N0YXJ0KGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcclxuXHJcbiAgfVxyXG5cclxuICBkcmFnTW92ZShkcmFnTW92ZUV2ZW50OiBEcmFnTW92ZUV2ZW50KSB7XHJcbiAgICBjb25zdCBib3VuZGluZ0NvbnRleHQgPSB0aGlzLmV2ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgZXZlbnRFbGVtSGVpZ2h0ID0gYm91bmRpbmdDb250ZXh0LmhlaWdodDtcclxuICAgIGNvbnN0IGV2ZW50RWxlbWVudEJvdHRvbSA9IGJvdW5kaW5nQ29udGV4dC5ib3R0b20gKyBkcmFnTW92ZUV2ZW50Lnk7XHJcbiAgICBjb25zdCBldmVudEVsZW1lbnRUb3AgPSBldmVudEVsZW1lbnRCb3R0b20gLSBldmVudEVsZW1IZWlnaHQ7XHJcblxyXG4gICAgaWYgKGV2ZW50RWxlbWVudFRvcCA8IDkwKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLnNjcm9sbCgwLCB3aW5kb3cuc2Nyb2xsWSAtIDcpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMCA8IGV2ZW50RWxlbWVudEJvdHRvbSkge1xyXG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5zY3JvbGwoMCwgd2luZG93LnNjcm9sbFkgKyA3KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19