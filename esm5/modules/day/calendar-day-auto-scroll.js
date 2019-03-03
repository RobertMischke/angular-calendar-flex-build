/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var CalendarDayAutoScroll = /** @class */ (function () {
    function CalendarDayAutoScroll() {
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
            window.scroll(0, window.scrollY - 7);
        }
        else if (window.innerHeight - 20 < eventElementBottom) {
            window.scroll(0, window.scrollY + 7);
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LWF1dG8tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS1hdXRvLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUE7SUFBQTtJQXFCQSxDQUFDOzs7OztJQWxCQyx5Q0FBUzs7OztJQUFULFVBQVUsS0FBVTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELHdDQUFROzs7O0lBQVIsVUFBUyxhQUE0Qjs7WUFDN0IsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUU7O1lBQ3BELGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTTs7WUFDeEMsa0JBQWtCLEdBQUcsZUFBZSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQzs7WUFDN0QsZUFBZSxHQUFHLGtCQUFrQixHQUFHLGVBQWU7UUFFNUQsSUFBSSxlQUFlLEdBQUcsRUFBRSxFQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEM7YUFDSSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLGtCQUFrQixFQUFDO1lBQ3BELE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEM7SUFFSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDOzs7Ozs7O0lBcEJDLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdNb3ZlRXZlbnQgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJEYXlBdXRvU2Nyb2xsIHtcclxuICBwcml2YXRlIGV2ZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZHJhZ1N0YXJ0KGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcclxuICB9XHJcblxyXG4gIGRyYWdNb3ZlKGRyYWdNb3ZlRXZlbnQ6IERyYWdNb3ZlRXZlbnQpIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nQ29udGV4dCA9IHRoaXMuZXZlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBldmVudEVsZW1IZWlnaHQgPSBib3VuZGluZ0NvbnRleHQuaGVpZ2h0O1xyXG4gICAgY29uc3QgZXZlbnRFbGVtZW50Qm90dG9tID0gYm91bmRpbmdDb250ZXh0LmJvdHRvbSArIGRyYWdNb3ZlRXZlbnQueTtcclxuICAgIGNvbnN0IGV2ZW50RWxlbWVudFRvcCA9IGV2ZW50RWxlbWVudEJvdHRvbSAtIGV2ZW50RWxlbUhlaWdodDtcclxuXHJcbiAgICBpZiAoZXZlbnRFbGVtZW50VG9wIDwgOTApe1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5zY3JvbGxZIC0gNyk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gMjAgPCBldmVudEVsZW1lbnRCb3R0b20pe1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5zY3JvbGxZICsgNyk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG4iXX0=