/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export default class CalendarDayAutoScroll {
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
            window.scroll(0, window.scrollY - 7);
        }
        else if (window.innerHeight - 20 < eventElementBottom) {
            window.scroll(0, window.scrollY + 7);
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarDayAutoScroll.prototype.event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LWF1dG8tc2Nyb2xsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS1hdXRvLXNjcm9sbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsTUFBTSxDQUFDLE9BQU8sT0FBTyxxQkFBcUI7Ozs7O0lBR3hDLFNBQVMsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLGFBQTRCOztjQUM3QixlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRTs7Y0FDcEQsZUFBZSxHQUFHLGVBQWUsQ0FBQyxNQUFNOztjQUN4QyxrQkFBa0IsR0FBRyxlQUFlLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDOztjQUM3RCxlQUFlLEdBQUcsa0JBQWtCLEdBQUcsZUFBZTtRQUU1RCxJQUFJLGVBQWUsR0FBRyxFQUFFLEVBQUM7WUFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUNJLElBQUksTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLEdBQUcsa0JBQWtCLEVBQUM7WUFDcEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0QztJQUVILENBQUM7Q0FDRjs7Ozs7O0lBcEJDLHNDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdNb3ZlRXZlbnQgfSBmcm9tICdhbmd1bGFyLWRyYWdnYWJsZS1kcm9wcGFibGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJEYXlBdXRvU2Nyb2xsIHtcclxuICBwcml2YXRlIGV2ZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgZHJhZ1N0YXJ0KGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcclxuICB9XHJcblxyXG4gIGRyYWdNb3ZlKGRyYWdNb3ZlRXZlbnQ6IERyYWdNb3ZlRXZlbnQpIHtcclxuICAgIGNvbnN0IGJvdW5kaW5nQ29udGV4dCA9IHRoaXMuZXZlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBldmVudEVsZW1IZWlnaHQgPSBib3VuZGluZ0NvbnRleHQuaGVpZ2h0O1xyXG4gICAgY29uc3QgZXZlbnRFbGVtZW50Qm90dG9tID0gYm91bmRpbmdDb250ZXh0LmJvdHRvbSArIGRyYWdNb3ZlRXZlbnQueTtcclxuICAgIGNvbnN0IGV2ZW50RWxlbWVudFRvcCA9IGV2ZW50RWxlbWVudEJvdHRvbSAtIGV2ZW50RWxlbUhlaWdodDtcclxuXHJcbiAgICBpZiAoZXZlbnRFbGVtZW50VG9wIDwgOTApe1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5zY3JvbGxZIC0gNyk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSBpZiAod2luZG93LmlubmVySGVpZ2h0IC0gMjAgPCBldmVudEVsZW1lbnRCb3R0b20pe1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsKDAsIHdpbmRvdy5zY3JvbGxZICsgNyk7XHJcbiAgICB9XHJcbiAgICAgIFxyXG4gIH1cclxufVxyXG4iXX0=