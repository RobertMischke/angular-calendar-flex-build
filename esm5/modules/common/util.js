/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { validateEvents as validateEventsWithoutLog } from 'calendar-utils';
/** @type {?} */
export var validateEvents = function (events) {
    /** @type {?} */
    var warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return console.warn.apply(console, tslib_1.__spread(['angular-calendar'], args));
    };
    return validateEventsWithoutLog(events, warn);
};
/**
 * @param {?} outer
 * @param {?} inner
 * @return {?}
 */
export function isInside(outer, inner) {
    return (Math.ceil(outer.left) <= Math.ceil(inner.left) &&
        Math.ceil(inner.left) <= Math.ceil(outer.right) &&
        Math.ceil(outer.left) <= Math.ceil(inner.right) &&
        Math.ceil(inner.right) <= Math.ceil(outer.right) &&
        Math.ceil(outer.top) <= Math.ceil(inner.top) &&
        Math.ceil(inner.top) <= Math.ceil(outer.bottom) &&
        Math.ceil(outer.top) <= Math.ceil(inner.bottom) &&
        Math.ceil(inner.bottom) <= Math.ceil(outer.bottom));
}
/**
 * @param {?} amount
 * @param {?} precision
 * @return {?}
 */
export function roundToNearest(amount, precision) {
    return Math.round(amount / precision) * precision;
}
/** @type {?} */
export var trackByEventId = function (index, event) {
    return event.id ? event.id : event;
};
/** @type {?} */
export var trackByWeekDayHeaderDate = function (index, day) {
    return day.date.toISOString();
};
/** @type {?} */
export var trackByHourSegment = function (index, segment) { return segment.date.toISOString(); };
/** @type {?} */
export var trackByHour = function (index, hour) {
    return hour.segments[0].date.toISOString();
};
/** @type {?} */
export var trackByDayOrWeekEvent = function (index, weekEvent) { return (weekEvent.event.id ? weekEvent.event.id : weekEvent.event); };
/** @type {?} */
var MINUTES_IN_HOUR = 60;
/**
 * @param {?} movedY
 * @param {?} hourSegments
 * @param {?} hourSegmentHeight
 * @param {?} eventSnapSize
 * @return {?}
 */
export function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize) {
    /** @type {?} */
    var draggedInPixelsSnapSize = roundToNearest(movedY, eventSnapSize || hourSegmentHeight);
    /** @type {?} */
    var pixelAmountInMinutes = MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight);
    return draggedInPixelsSnapSize * pixelAmountInMinutes;
}
/**
 * @param {?} hourSegments
 * @param {?} hourSegmentHeight
 * @return {?}
 */
export function getMinimumEventHeightInMinutes(hourSegments, hourSegmentHeight) {
    return (MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight)) * 30;
}
/**
 * @param {?} dateAdapter
 * @param {?} event
 * @param {?} minimumMinutes
 * @return {?}
 */
export function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
    if (event.end) {
        return event.end;
    }
    else {
        return dateAdapter.addMinutes(event.start, minimumMinutes);
    }
}
/**
 * @param {?} dateAdapter
 * @param {?} date
 * @param {?} days
 * @param {?} excluded
 * @return {?}
 */
export function addDaysWithExclusions(dateAdapter, date, days, excluded) {
    /** @type {?} */
    var daysCounter = 0;
    /** @type {?} */
    var daysToAdd = 0;
    /** @type {?} */
    var changeDays = days < 0 ? dateAdapter.subDays : dateAdapter.addDays;
    /** @type {?} */
    var result = date;
    while (daysToAdd <= Math.abs(days)) {
        result = changeDays(date, daysCounter);
        /** @type {?} */
        var day = dateAdapter.getDay(result);
        if (excluded.indexOf(day) === -1) {
            daysToAdd++;
        }
        daysCounter++;
    }
    return result;
}
/**
 * @param {?} newStart
 * @param {?} newEnd
 * @param {?} period
 * @return {?}
 */
export function isDraggedWithinPeriod(newStart, newEnd, period) {
    /** @type {?} */
    var end = newEnd || newStart;
    return ((period.start <= newStart && newStart <= period.end) ||
        (period.start <= end && end <= period.end));
}
/**
 * @param {?} dropEvent
 * @param {?} date
 * @param {?} allDay
 * @param {?} calendarId
 * @return {?}
 */
export function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
    return (dropEvent.dropData &&
        dropEvent.dropData.event &&
        (dropEvent.dropData.calendarId !== calendarId ||
            (dropEvent.dropData.event.allDay && !allDay) ||
            (!dropEvent.dropData.event.allDay && allDay)));
}
/**
 * @param {?} dateAdapter
 * @param {?} viewDate
 * @param {?} weekStartsOn
 * @param {?=} excluded
 * @param {?=} daysInWeek
 * @return {?}
 */
export function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded, daysInWeek) {
    if (excluded === void 0) { excluded = []; }
    /** @type {?} */
    var viewStart = daysInWeek
        ? dateAdapter.startOfDay(viewDate)
        : dateAdapter.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
    if (excluded.indexOf(dateAdapter.getDay(viewStart)) > -1) {
        viewStart = dateAdapter.subDays(addDaysWithExclusions(dateAdapter, viewStart, 1, excluded), 1);
    }
    if (daysInWeek) {
        /** @type {?} */
        var viewEnd = dateAdapter.endOfDay(addDaysWithExclusions(dateAdapter, viewStart, daysInWeek - 1, excluded));
        return { viewStart: viewStart, viewEnd: viewEnd };
    }
    else {
        /** @type {?} */
        var viewEnd = dateAdapter.endOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        if (excluded.indexOf(dateAdapter.getDay(viewEnd)) > -1) {
            viewEnd = dateAdapter.addDays(addDaysWithExclusions(dateAdapter, viewEnd, -1, excluded), 1);
        }
        return { viewStart: viewStart, viewEnd: viewEnd };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbW1vbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUtMLGNBQWMsSUFBSSx3QkFBd0IsRUFJM0MsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEIsTUFBTSxLQUFPLGNBQWMsR0FBRyxVQUFDLE1BQXVCOztRQUM5QyxJQUFJLEdBQUc7UUFBQyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksT0FBWixPQUFPLG9CQUFNLGtCQUFrQixHQUFLLElBQUk7SUFBeEMsQ0FBeUM7SUFDbkUsT0FBTyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFpQixFQUFFLEtBQWlCO0lBQzNELE9BQU8sQ0FDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksSUFB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LE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDdEQsT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQzNCLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQ3pELENBQUMsQ0FDRixDQUFDO1NBQ0g7UUFDRCxPQUFPLEVBQUUsU0FBUyxXQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQztLQUMvQjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBEYXlWaWV3RXZlbnQsXG4gIERheVZpZXdIb3VyLFxuICBEYXlWaWV3SG91clNlZ21lbnQsXG4gIHZhbGlkYXRlRXZlbnRzIGFzIHZhbGlkYXRlRXZlbnRzV2l0aG91dExvZyxcbiAgVmlld1BlcmlvZCxcbiAgV2Vla0RheSxcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRXZlbnRzID0gKGV2ZW50czogQ2FsZW5kYXJFdmVudFtdKSA9PiB7XG4gIGNvbnN0IHdhcm4gPSAoLi4uYXJncykgPT4gY29uc29sZS53YXJuKCdhbmd1bGFyLWNhbGVuZGFyJywgLi4uYXJncyk7XG4gIHJldHVybiB2YWxpZGF0ZUV2ZW50c1dpdGhvdXRMb2coZXZlbnRzLCB3YXJuKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luc2lkZShvdXRlcjogQ2xpZW50UmVjdCwgaW5uZXI6IENsaWVudFJlY3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICBNYXRoLmNlaWwob3V0ZXIubGVmdCkgPD0gTWF0aC5jZWlsKGlubmVyLmxlZnQpICYmXG4gICAgTWF0aC5jZWlsKGlubmVyLmxlZnQpIDw9IE1hdGguY2VpbChvdXRlci5yaWdodCkgJiZcbiAgICBNYXRoLmNlaWwob3V0ZXIubGVmdCkgPD0gTWF0aC5jZWlsKGlubmVyLnJpZ2h0KSAmJlxuICAgIE1hdGguY2VpbChpbm5lci5yaWdodCkgPD0gTWF0aC5jZWlsKG91dGVyLnJpZ2h0KSAmJlxuICAgIE1hdGguY2VpbChvdXRlci50b3ApIDw9IE1hdGguY2VpbChpbm5lci50b3ApICYmXG4gICAgTWF0aC5jZWlsKGlubmVyLnRvcCkgPD0gTWF0aC5jZWlsKG91dGVyLmJvdHRvbSkgJiZcbiAgICBNYXRoLmNlaWwob3V0ZXIudG9wKSA8PSBNYXRoLmNlaWwoaW5uZXIuYm90dG9tKSAmJlxuICAgIE1hdGguY2VpbChpbm5lci5ib3R0b20pIDw9IE1hdGguY2VpbChvdXRlci5ib3R0b20pXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFRvTmVhcmVzdChhbW91bnQ6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQoYW1vdW50IC8gcHJlY2lzaW9uKSAqIHByZWNpc2lvbjtcbn1cblxuZXhwb3J0IGNvbnN0IHRyYWNrQnlFdmVudElkID0gKGluZGV4OiBudW1iZXIsIGV2ZW50OiBDYWxlbmRhckV2ZW50KSA9PlxuICBldmVudC5pZCA/IGV2ZW50LmlkIDogZXZlbnQ7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5V2Vla0RheUhlYWRlckRhdGUgPSAoaW5kZXg6IG51bWJlciwgZGF5OiBXZWVrRGF5KSA9PlxuICBkYXkuZGF0ZS50b0lTT1N0cmluZygpO1xuXG5leHBvcnQgY29uc3QgdHJhY2tCeUhvdXJTZWdtZW50ID0gKFxuICBpbmRleDogbnVtYmVyLFxuICBzZWdtZW50OiBEYXlWaWV3SG91clNlZ21lbnRcbikgPT4gc2VnbWVudC5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5SG91ciA9IChpbmRleDogbnVtYmVyLCBob3VyOiBEYXlWaWV3SG91cikgPT5cbiAgaG91ci5zZWdtZW50c1swXS5kYXRlLnRvSVNPU3RyaW5nKCk7XG5cbmV4cG9ydCBjb25zdCB0cmFja0J5RGF5T3JXZWVrRXZlbnQgPSAoXG4gIGluZGV4OiBudW1iZXIsXG4gIHdlZWtFdmVudDogV2Vla1ZpZXdBbGxEYXlFdmVudCB8IERheVZpZXdFdmVudFxuKSA9PiAod2Vla0V2ZW50LmV2ZW50LmlkID8gd2Vla0V2ZW50LmV2ZW50LmlkIDogd2Vla0V2ZW50LmV2ZW50KTtcblxuY29uc3QgTUlOVVRFU19JTl9IT1VSID0gNjA7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNaW51dGVzTW92ZWQoXG4gIG1vdmVkWTogbnVtYmVyLFxuICBob3VyU2VnbWVudHM6IG51bWJlcixcbiAgaG91clNlZ21lbnRIZWlnaHQ6IG51bWJlcixcbiAgZXZlbnRTbmFwU2l6ZTogbnVtYmVyXG4pOiBudW1iZXIge1xuICBjb25zdCBkcmFnZ2VkSW5QaXhlbHNTbmFwU2l6ZSA9IHJvdW5kVG9OZWFyZXN0KFxuICAgIG1vdmVkWSxcbiAgICBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0XG4gICk7XG4gIGNvbnN0IHBpeGVsQW1vdW50SW5NaW51dGVzID1cbiAgICBNSU5VVEVTX0lOX0hPVVIgLyAoaG91clNlZ21lbnRzICogaG91clNlZ21lbnRIZWlnaHQpO1xuICByZXR1cm4gZHJhZ2dlZEluUGl4ZWxzU25hcFNpemUgKiBwaXhlbEFtb3VudEluTWludXRlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1pbmltdW1FdmVudEhlaWdodEluTWludXRlcyhcbiAgaG91clNlZ21lbnRzOiBudW1iZXIsXG4gIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXJcbikge1xuICByZXR1cm4gKE1JTlVURVNfSU5fSE9VUiAvIChob3VyU2VnbWVudHMgKiBob3VyU2VnbWVudEhlaWdodCkpICogMzA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RXZlbnRFbmQoXG4gIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcixcbiAgZXZlbnQ6IENhbGVuZGFyRXZlbnQsXG4gIG1pbmltdW1NaW51dGVzOiBudW1iZXJcbik6IERhdGUge1xuICBpZiAoZXZlbnQuZW5kKSB7XG4gICAgcmV0dXJuIGV2ZW50LmVuZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhldmVudC5zdGFydCwgbWluaW11bU1pbnV0ZXMpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoXG4gIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcixcbiAgZGF0ZTogRGF0ZSxcbiAgZGF5czogbnVtYmVyLFxuICBleGNsdWRlZDogbnVtYmVyW11cbik6IERhdGUge1xuICBsZXQgZGF5c0NvdW50ZXIgPSAwO1xuICBsZXQgZGF5c1RvQWRkID0gMDtcbiAgY29uc3QgY2hhbmdlRGF5cyA9IGRheXMgPCAwID8gZGF0ZUFkYXB0ZXIuc3ViRGF5cyA6IGRhdGVBZGFwdGVyLmFkZERheXM7XG4gIGxldCByZXN1bHQgPSBkYXRlO1xuICB3aGlsZSAoZGF5c1RvQWRkIDw9IE1hdGguYWJzKGRheXMpKSB7XG4gICAgcmVzdWx0ID0gY2hhbmdlRGF5cyhkYXRlLCBkYXlzQ291bnRlcik7XG4gICAgY29uc3QgZGF5ID0gZGF0ZUFkYXB0ZXIuZ2V0RGF5KHJlc3VsdCk7XG4gICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2YoZGF5KSA9PT0gLTEpIHtcbiAgICAgIGRheXNUb0FkZCsrO1xuICAgIH1cbiAgICBkYXlzQ291bnRlcisrO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RyYWdnZWRXaXRoaW5QZXJpb2QoXG4gIG5ld1N0YXJ0OiBEYXRlLFxuICBuZXdFbmQ6IERhdGUsXG4gIHBlcmlvZDogVmlld1BlcmlvZFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGVuZCA9IG5ld0VuZCB8fCBuZXdTdGFydDtcbiAgcmV0dXJuIChcbiAgICAocGVyaW9kLnN0YXJ0IDw9IG5ld1N0YXJ0ICYmIG5ld1N0YXJ0IDw9IHBlcmlvZC5lbmQpIHx8XG4gICAgKHBlcmlvZC5zdGFydCA8PSBlbmQgJiYgZW5kIDw9IHBlcmlvZC5lbmQpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRGaXJlRHJvcHBlZEV2ZW50KFxuICBkcm9wRXZlbnQ6IHsgZHJvcERhdGE/OiB7IGV2ZW50PzogQ2FsZW5kYXJFdmVudDsgY2FsZW5kYXJJZD86IHN5bWJvbCB9IH0sXG4gIGRhdGU6IERhdGUsXG4gIGFsbERheTogYm9vbGVhbixcbiAgY2FsZW5kYXJJZDogc3ltYm9sXG4pIHtcbiAgcmV0dXJuIChcbiAgICBkcm9wRXZlbnQuZHJvcERhdGEgJiZcbiAgICBkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQgJiZcbiAgICAoZHJvcEV2ZW50LmRyb3BEYXRhLmNhbGVuZGFySWQgIT09IGNhbGVuZGFySWQgfHxcbiAgICAgIChkcm9wRXZlbnQuZHJvcERhdGEuZXZlbnQuYWxsRGF5ICYmICFhbGxEYXkpIHx8XG4gICAgICAoIWRyb3BFdmVudC5kcm9wRGF0YS5ldmVudC5hbGxEYXkgJiYgYWxsRGF5KSlcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdlZWtWaWV3UGVyaW9kKFxuICBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXIsXG4gIHZpZXdEYXRlOiBEYXRlLFxuICB3ZWVrU3RhcnRzT246IG51bWJlcixcbiAgZXhjbHVkZWQ6IG51bWJlcltdID0gW10sXG4gIGRheXNJbldlZWs/OiBudW1iZXJcbik6IHsgdmlld1N0YXJ0OiBEYXRlOyB2aWV3RW5kOiBEYXRlIH0ge1xuICBsZXQgdmlld1N0YXJ0ID0gZGF5c0luV2Vla1xuICAgID8gZGF0ZUFkYXB0ZXIuc3RhcnRPZkRheSh2aWV3RGF0ZSlcbiAgICA6IGRhdGVBZGFwdGVyLnN0YXJ0T2ZXZWVrKHZpZXdEYXRlLCB7IHdlZWtTdGFydHNPbiB9KTtcbiAgaWYgKGV4Y2x1ZGVkLmluZGV4T2YoZGF0ZUFkYXB0ZXIuZ2V0RGF5KHZpZXdTdGFydCkpID4gLTEpIHtcbiAgICB2aWV3U3RhcnQgPSBkYXRlQWRhcHRlci5zdWJEYXlzKFxuICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKGRhdGVBZGFwdGVyLCB2aWV3U3RhcnQsIDEsIGV4Y2x1ZGVkKSxcbiAgICAgIDFcbiAgICApO1xuICB9XG4gIGlmIChkYXlzSW5XZWVrKSB7XG4gICAgY29uc3Qgdmlld0VuZCA9IGRhdGVBZGFwdGVyLmVuZE9mRGF5KFxuICAgICAgYWRkRGF5c1dpdGhFeGNsdXNpb25zKGRhdGVBZGFwdGVyLCB2aWV3U3RhcnQsIGRheXNJbldlZWsgLSAxLCBleGNsdWRlZClcbiAgICApO1xuICAgIHJldHVybiB7IHZpZXdTdGFydCwgdmlld0VuZCB9O1xuICB9IGVsc2Uge1xuICAgIGxldCB2aWV3RW5kID0gZGF0ZUFkYXB0ZXIuZW5kT2ZXZWVrKHZpZXdEYXRlLCB7IHdlZWtTdGFydHNPbiB9KTtcbiAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihkYXRlQWRhcHRlci5nZXREYXkodmlld0VuZCkpID4gLTEpIHtcbiAgICAgIHZpZXdFbmQgPSBkYXRlQWRhcHRlci5hZGREYXlzKFxuICAgICAgICBhZGREYXlzV2l0aEV4Y2x1c2lvbnMoZGF0ZUFkYXB0ZXIsIHZpZXdFbmQsIC0xLCBleGNsdWRlZCksXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB7IHZpZXdTdGFydCwgdmlld0VuZCB9O1xuICB9XG59XG4iXX0=