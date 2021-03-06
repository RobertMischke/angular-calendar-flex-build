/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isInside } from './util';
/** @type {?} */
const DRAG_THRESHOLD = 1;
export class CalendarDragHelper {
    /**
     * @param {?} dragContainerElement
     * @param {?} draggableElement
     */
    constructor(dragContainerElement, draggableElement) {
        this.dragContainerElement = dragContainerElement;
        this.startPosition = draggableElement.getBoundingClientRect();
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    validateDrag({ x, y, snapDraggedEvents, dragAlreadyMoved }) {
        /** @type {?} */
        const isWithinThreshold = Math.abs(x) > DRAG_THRESHOLD || Math.abs(y) > DRAG_THRESHOLD;
        if (snapDraggedEvents) {
            /** @type {?} */
            const newRect = Object.assign({}, this.startPosition, {
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
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7O01BRTVCLGNBQWMsR0FBRyxDQUFDO0FBRXhCLE1BQU0sT0FBTyxrQkFBa0I7Ozs7O0lBRzdCLFlBQ1Usb0JBQWlDLEVBQ3pDLGdCQUE2QjtRQURyQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWE7UUFHekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQ2hFLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLEVBQ1gsQ0FBQyxFQUNELENBQUMsRUFDRCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBTWpCOztjQUNPLGlCQUFpQixHQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWM7UUFFOUQsSUFBSSxpQkFBaUIsRUFBRTs7a0JBQ2YsT0FBTyxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hFLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsQ0FBQztnQkFDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQy9CLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQ3RDLENBQUM7WUFFRixPQUFPLENBQ0wsQ0FBQyxpQkFBaUIsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUNyRSxDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8saUJBQWlCLElBQUksZ0JBQWdCLENBQUM7U0FDOUM7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQXZDQywyQ0FBMkM7Ozs7O0lBR3pDLGtEQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzSW5zaWRlIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgRFJBR19USFJFU0hPTEQgPSAxO1xuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEcmFnSGVscGVyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzdGFydFBvc2l0aW9uOiBDbGllbnRSZWN0O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZHJhZ0NvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGRyYWdnYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICkge1xuICAgIHRoaXMuc3RhcnRQb3NpdGlvbiA9IGRyYWdnYWJsZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICB2YWxpZGF0ZURyYWcoe1xuICAgIHgsXG4gICAgeSxcbiAgICBzbmFwRHJhZ2dlZEV2ZW50cyxcbiAgICBkcmFnQWxyZWFkeU1vdmVkXG4gIH06IHtcbiAgICB4OiBudW1iZXI7XG4gICAgeTogbnVtYmVyO1xuICAgIHNuYXBEcmFnZ2VkRXZlbnRzOiBib29sZWFuO1xuICAgIGRyYWdBbHJlYWR5TW92ZWQ6IGJvb2xlYW47XG4gIH0pOiBib29sZWFuIHtcbiAgICBjb25zdCBpc1dpdGhpblRocmVzaG9sZCA9XG4gICAgICBNYXRoLmFicyh4KSA+IERSQUdfVEhSRVNIT0xEIHx8IE1hdGguYWJzKHkpID4gRFJBR19USFJFU0hPTEQ7XG5cbiAgICBpZiAoc25hcERyYWdnZWRFdmVudHMpIHtcbiAgICAgIGNvbnN0IG5ld1JlY3Q6IENsaWVudFJlY3QgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXJ0UG9zaXRpb24sIHtcbiAgICAgICAgbGVmdDogdGhpcy5zdGFydFBvc2l0aW9uLmxlZnQgKyB4LFxuICAgICAgICByaWdodDogdGhpcy5zdGFydFBvc2l0aW9uLnJpZ2h0ICsgeCxcbiAgICAgICAgdG9wOiB0aGlzLnN0YXJ0UG9zaXRpb24udG9wICsgeSxcbiAgICAgICAgYm90dG9tOiB0aGlzLnN0YXJ0UG9zaXRpb24uYm90dG9tICsgeVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIChpc1dpdGhpblRocmVzaG9sZCB8fCBkcmFnQWxyZWFkeU1vdmVkKSAmJlxuICAgICAgICBpc0luc2lkZSh0aGlzLmRyYWdDb250YWluZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBuZXdSZWN0KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGlzV2l0aGluVGhyZXNob2xkIHx8IGRyYWdBbHJlYWR5TW92ZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=