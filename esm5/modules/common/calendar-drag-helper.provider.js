/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isInside } from './util';
/** @type {?} */
var DRAG_THRESHOLD = 1;
var CalendarDragHelper = /** @class */ (function () {
    function CalendarDragHelper(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    CalendarDragHelper.prototype.validateDrag = /**
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var x = _a.x, y = _a.y, snapDraggedEvents = _a.snapDraggedEvents, dragAlreadyMoved = _a.dragAlreadyMoved;
        /** @type {?} */
        var isWithinThreshold = Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
        if (snapDraggedEvents) {
            /** @type {?} */
            var newRect = Object.assign({}, this.startPosition, {
                left: this.startPosition.left + x,
                right: this.startPosition.right + x,
                top: this.startPosition.top + y,
                bottom: this.startPosition.bottom + y
            });
            return ((isWithinThreshold || dragAlreadyMoved) &&
                isInside(this.dragContainerElement.getBoundingClientRect(), newRect));
        }
        else {
            return isWithinThreshold || dragAlreadyMoved;
        }
    };
    return CalendarDragHelper;
}());
export { CalendarDragHelper };
if (false) {
    /**
     * @type {?}
     * @private
     */
    CalendarDragHelper.prototype.startPosition;
    /**
     * @type {?}
     * @private
     */
    CalendarDragHelper.prototype.dragContainerElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7O0lBRTVCLGNBQWMsR0FBRyxDQUFDO0FBRXhCO0lBR0UsNEJBQ1Usb0JBQWlDLEVBQ3pDLGdCQUE2QjtRQURyQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWE7UUFHekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2hFLENBQUM7Ozs7O0lBRUQseUNBQVk7Ozs7SUFBWixVQUFhLEVBVVo7WUFUQyxRQUFDLEVBQ0QsUUFBQyxFQUNELHdDQUFpQixFQUNqQixzQ0FBZ0I7O1lBT1YsaUJBQWlCLEdBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYztRQUU5RCxJQUFJLGlCQUFpQixFQUFFOztnQkFDZixPQUFPLEdBQWUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUM7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUNuQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7YUFDdEMsQ0FBQztZQUVGLE9BQU8sQ0FDTCxDQUFDLGlCQUFpQixJQUFJLGdCQUFnQixDQUFDO2dCQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHFCQUFxQixFQUFFLEVBQUUsT0FBTyxDQUFDLENBQ3JFLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQztTQUM5QztJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7Ozs7Ozs7SUF2Q0MsMkNBQTJDOzs7OztJQUd6QyxrREFBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0luc2lkZSB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IERSQUdfVEhSRVNIT0xEID0gMTtcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFyRHJhZ0hlbHBlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3RhcnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRyYWdDb250YWluZXJFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBkcmFnZ2FibGVFbGVtZW50OiBIVE1MRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb24gPSBkcmFnZ2FibGVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgdmFsaWRhdGVEcmFnKHtcbiAgICB4LFxuICAgIHksXG4gICAgc25hcERyYWdnZWRFdmVudHMsXG4gICAgZHJhZ0FscmVhZHlNb3ZlZFxuICB9OiB7XG4gICAgeDogbnVtYmVyO1xuICAgIHk6IG51bWJlcjtcbiAgICBzbmFwRHJhZ2dlZEV2ZW50czogYm9vbGVhbjtcbiAgICBkcmFnQWxyZWFkeU1vdmVkOiBib29sZWFuO1xuICB9KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNXaXRoaW5UaHJlc2hvbGQgPVxuICAgICAgTWF0aC5hYnMoeCkgPiBEUkFHX1RIUkVTSE9MRCB8fCBNYXRoLmFicyh5KSA+IERSQUdfVEhSRVNIT0xEO1xuXG4gICAgaWYgKHNuYXBEcmFnZ2VkRXZlbnRzKSB7XG4gICAgICBjb25zdCBuZXdSZWN0OiBDbGllbnRSZWN0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGFydFBvc2l0aW9uLCB7XG4gICAgICAgIGxlZnQ6IHRoaXMuc3RhcnRQb3NpdGlvbi5sZWZ0ICsgeCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuc3RhcnRQb3NpdGlvbi5yaWdodCArIHgsXG4gICAgICAgIHRvcDogdGhpcy5zdGFydFBvc2l0aW9uLnRvcCArIHksXG4gICAgICAgIGJvdHRvbTogdGhpcy5zdGFydFBvc2l0aW9uLmJvdHRvbSArIHlcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICAoaXNXaXRoaW5UaHJlc2hvbGQgfHwgZHJhZ0FscmVhZHlNb3ZlZCkgJiZcbiAgICAgICAgaXNJbnNpZGUodGhpcy5kcmFnQ29udGFpbmVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgbmV3UmVjdClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpc1dpdGhpblRocmVzaG9sZCB8fCBkcmFnQWxyZWFkeU1vdmVkO1xuICAgIH1cbiAgfVxufVxuIl19