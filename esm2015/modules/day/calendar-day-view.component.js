/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarDragHelper } from '../common/calendar-drag-helper.provider';
import { CalendarResizeHelper } from '../common/calendar-resize-helper.provider';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents, trackByEventId, trackByHour, trackByHourSegment, getMinutesMoved, getDefaultEventEnd, getMinimumEventHeightInMinutes, trackByDayOrWeekEvent, isDraggedWithinPeriod, shouldFireDroppedEvent } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
import CalendarDayAutoScroll from './calendar-day-auto-scroll';
/**
 * @record
 */
export function CalendarDayViewBeforeRenderEvent() { }
if (false) {
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.body;
    /** @type {?} */
    CalendarDayViewBeforeRenderEvent.prototype.period;
}
/**
 * @hidden
 * @record
 */
export function DayViewEventResize() { }
if (false) {
    /** @type {?} */
    DayViewEventResize.prototype.originalTop;
    /** @type {?} */
    DayViewEventResize.prototype.originalHeight;
    /** @type {?} */
    DayViewEventResize.prototype.edge;
}
/**
 * Shows all events on a given day. Example usage:
 *
 * ```typescript
 * <mwl-calendar-day-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-day-view>
 * ```
 */
export class CalendarDayViewComponent {
    /**
     * @hidden
     * @param {?} cdr
     * @param {?} utils
     * @param {?} locale
     * @param {?} dateAdapter
     */
    constructor(cdr, utils, locale, dateAdapter) {
        this.cdr = cdr;
        this.utils = utils;
        this.dateAdapter = dateAdapter;
        /**
         * An array of events to display on view
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * The number of segments in an hour. Must be <= 6
         */
        this.hourSegments = 2;
        /**
         * The height in pixels of each hour segment
         */
        this.hourSegmentHeight = 30;
        /**
         * The day start hours in 24 hour time. Must be 0-23
         */
        this.dayStartHour = 0;
        /**
         * The day start minutes. Must be 0-59
         */
        this.dayStartMinute = 0;
        /**
         * The day end hours in 24 hour time. Must be 0-23
         */
        this.dayEndHour = 23;
        /**
         * The day end minutes. Must be 0-59
         */
        this.dayEndMinute = 59;
        /**
         * The width in pixels of each event on the view
         */
        this.eventWidth = 150;
        /**
         * The placement of the event tooltip
         */
        this.tooltipPlacement = 'auto';
        /**
         * Whether to append tooltips to the body or next to the trigger element
         */
        this.tooltipAppendToBody = true;
        /**
         * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
         * will be displayed immediately.
         */
        this.tooltipDelay = null;
        /**
         * Whether to snap events to a grid when dragging
         */
        this.snapDraggedEvents = true;
        /**
         * Optional. On this element the "scroll(x, y)" method gets called, when
         * an event is dragged to the top or bottom of the viewport.
         */
        this.scrollContainer = null;
        /**
         * Called when an event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when an hour segment is clicked
         */
        this.hourSegmentClicked = new EventEmitter();
        /**
         * Called when an event is resized or dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * An output that will be called before the view is rendered for the current day.
         * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * @hidden
         */
        this.hours = [];
        /**
         * @hidden
         */
        this.width = 0;
        /**
         * @hidden
         */
        this.currentResizes = new Map();
        /**
         * @hidden
         */
        this.eventDragEnter = 0;
        /**
         * @hidden
         */
        this.calendarId = Symbol('angular calendar day view id');
        /**
         * @hidden
         */
        this.dragAlreadyMoved = false;
        /**
         * @hidden
         */
        this.trackByEventId = trackByEventId;
        /**
         * @hidden
         */
        this.trackByHour = trackByHour;
        /**
         * @hidden
         */
        this.trackByHourSegment = trackByHourSegment;
        /**
         * @hidden
         */
        this.trackByDayEvent = trackByDayOrWeekEvent;
        this.locale = locale;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
        this.calendarDayAutoScroll = new CalendarDayAutoScroll(this.scrollContainer);
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const refreshHourGrid = changes.viewDate ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.hourSegments;
        /** @type {?} */
        const refreshView = changes.viewDate ||
            changes.events ||
            changes.dayStartHour ||
            changes.dayStartMinute ||
            changes.dayEndHour ||
            changes.dayEndMinute ||
            changes.eventWidth;
        if (refreshHourGrid) {
            this.refreshHourGrid();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshView) {
            this.refreshView();
        }
        if (refreshHourGrid || refreshView) {
            this.emitBeforeViewRender();
        }
    }
    /**
     * @param {?} dropEvent
     * @param {?} date
     * @param {?} allDay
     * @return {?}
     */
    eventDropped(dropEvent, date, allDay) {
        if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
            this.eventTimesChanged.emit({
                type: CalendarEventTimesChangedEventType.Drop,
                event: dropEvent.dropData.event,
                newStart: date,
                allDay
            });
        }
    }
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @param {?} dayEventsContainer
     * @return {?}
     */
    resizeStarted(event, resizeEvent, dayEventsContainer) {
        this.currentResizes.set(event, {
            originalTop: event.top,
            originalHeight: event.height,
            edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
        });
        /** @type {?} */
        const resizeHelper = new CalendarResizeHelper(dayEventsContainer);
        this.validateResize = ({ rectangle }) => resizeHelper.validateResize({ rectangle });
        this.cdr.markForCheck();
    }
    /**
     * @param {?} event
     * @param {?} resizeEvent
     * @return {?}
     */
    resizing(event, resizeEvent) {
        /** @type {?} */
        const currentResize = this.currentResizes.get(event);
        if (typeof resizeEvent.edges.top !== 'undefined') {
            event.top = currentResize.originalTop + +resizeEvent.edges.top;
            event.height = currentResize.originalHeight - +resizeEvent.edges.top;
        }
        else if (typeof resizeEvent.edges.bottom !== 'undefined') {
            event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
        }
    }
    /**
     * @param {?} dayEvent
     * @return {?}
     */
    resizeEnded(dayEvent) {
        /** @type {?} */
        const currentResize = this.currentResizes.get(dayEvent);
        /** @type {?} */
        const resizingBeforeStart = currentResize.edge === 'top';
        /** @type {?} */
        let pixelsMoved;
        if (resizingBeforeStart) {
            pixelsMoved = dayEvent.top - currentResize.originalTop;
        }
        else {
            pixelsMoved = dayEvent.height - currentResize.originalHeight;
        }
        dayEvent.top = currentResize.originalTop;
        dayEvent.height = currentResize.originalHeight;
        /** @type {?} */
        const minutesMoved = getMinutesMoved(pixelsMoved, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
        /** @type {?} */
        let newStart = dayEvent.event.start;
        /** @type {?} */
        let newEnd = getDefaultEventEnd(this.dateAdapter, dayEvent.event, getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight));
        if (resizingBeforeStart) {
            newStart = this.dateAdapter.addMinutes(newStart, minutesMoved);
        }
        else {
            newEnd = this.dateAdapter.addMinutes(newEnd, minutesMoved);
        }
        this.eventTimesChanged.emit({
            newStart,
            newEnd,
            event: dayEvent.event,
            type: CalendarEventTimesChangedEventType.Resize
        });
        this.currentResizes.delete(dayEvent);
    }
    /**
     * @param {?} event
     * @param {?} dayEventsContainer
     * @return {?}
     */
    dragStarted(event, dayEventsContainer) {
        /** @type {?} */
        const dragHelper = new CalendarDragHelper(dayEventsContainer, event);
        this.validateDrag = ({ x, y }) => this.currentResizes.size === 0 &&
            dragHelper.validateDrag({
                x,
                y,
                snapDraggedEvents: this.snapDraggedEvents,
                dragAlreadyMoved: this.dragAlreadyMoved
            });
        this.eventDragEnter = 0;
        this.dragAlreadyMoved = false;
        this.cdr.markForCheck();
        this.calendarDayAutoScroll.dragStart(event);
    }
    /**
     * @hidden
     * @param {?} dragMoveEvent
     * @return {?}
     */
    dragMove(dragMoveEvent) {
        this.dragAlreadyMoved = true;
        this.calendarDayAutoScroll.dragMove(dragMoveEvent);
    }
    /**
     * @param {?} dayEvent
     * @param {?} dragEndEvent
     * @return {?}
     */
    dragEnded(dayEvent, dragEndEvent) {
        if (this.eventDragEnter > 0) {
            /** @type {?} */
            let minutesMoved = getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
            /** @type {?} */
            let newStart = this.dateAdapter.addMinutes(dayEvent.event.start, minutesMoved);
            if (dragEndEvent.y < 0 && newStart < this.view.period.start) {
                minutesMoved += this.dateAdapter.differenceInMinutes(this.view.period.start, newStart);
                newStart = this.view.period.start;
            }
            /** @type {?} */
            let newEnd;
            if (dayEvent.event.end) {
                newEnd = this.dateAdapter.addMinutes(dayEvent.event.end, minutesMoved);
            }
            if (isDraggedWithinPeriod(newStart, newEnd, this.view.period)) {
                this.eventTimesChanged.emit({
                    newStart,
                    newEnd,
                    event: dayEvent.event,
                    type: CalendarEventTimesChangedEventType.Drag,
                    allDay: false
                });
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshHourGrid() {
        this.hours = this.utils.getDayViewHourGrid({
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    refreshView() {
        this.view = this.utils.getDayView({
            events: this.events,
            viewDate: this.viewDate,
            hourSegments: this.hourSegments,
            dayStart: {
                hour: this.dayStartHour,
                minute: this.dayStartMinute
            },
            dayEnd: {
                hour: this.dayEndHour,
                minute: this.dayEndMinute
            },
            eventWidth: this.eventWidth,
            segmentHeight: this.hourSegmentHeight
        });
    }
    /**
     * @private
     * @return {?}
     */
    refreshAll() {
        this.refreshHourGrid();
        this.refreshView();
        this.emitBeforeViewRender();
    }
    /**
     * @private
     * @return {?}
     */
    emitBeforeViewRender() {
        if (this.hours && this.view) {
            this.beforeViewRender.emit({
                body: {
                    hourGrid: this.hours,
                    allDayEvents: this.view.allDayEvents
                },
                period: this.view.period
            });
        }
    }
}
CalendarDayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-day-view',
                template: `
    <div class="cal-day-view">
      <div
        class="cal-all-day-events"
        mwlDroppable
        dragOverClass="cal-drag-over"
        dragActiveClass="cal-drag-active"
        (drop)="eventDropped($event, view.period.start, true)"
      >
        <mwl-calendar-day-view-event
          *ngFor="let event of view.allDayEvents; trackBy: trackByEventId"
          [ngClass]="event.cssClass"
          [dayEvent]="{ event: event }"
          [tooltipPlacement]="tooltipPlacement"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipAppendToBody]="tooltipAppendToBody"
          [tooltipDelay]="tooltipDelay"
          [customTemplate]="eventTemplate"
          [eventTitleTemplate]="eventTitleTemplate"
          [eventActionsTemplate]="eventActionsTemplate"
          (eventClicked)="eventClicked.emit({ event: event })"
          [class.cal-draggable]="!snapDraggedEvents && event.draggable"
          mwlDraggable
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event, calendarId: calendarId }"
          [dragAxis]="{
            x: !snapDraggedEvents && event.draggable,
            y: !snapDraggedEvents && event.draggable
          }"
        >
        </mwl-calendar-day-view-event>
      </div>
      <div
        class="cal-hour-rows"
        #dayEventsContainer
        mwlDroppable
        (dragEnter)="eventDragEnter = eventDragEnter + 1"
        (dragLeave)="eventDragEnter = eventDragEnter - 1"
      >
        <div class="cal-events">
          <div
            #event
            *ngFor="let dayEvent of view?.events; trackBy: trackByDayEvent"
            class="cal-event-container"
            [class.cal-draggable]="dayEvent.event.draggable"
            [class.cal-starts-within-day]="!dayEvent.startsBeforeDay"
            [class.cal-ends-within-day]="!dayEvent.endsAfterDay"
            [ngClass]="dayEvent.event.cssClass"
            mwlResizable
            [resizeSnapGrid]="{
              top: eventSnapSize || hourSegmentHeight,
              bottom: eventSnapSize || hourSegmentHeight
            }"
            [validateResize]="validateResize"
            (resizeStart)="resizeStarted(dayEvent, $event, dayEventsContainer)"
            (resizing)="resizing(dayEvent, $event)"
            (resizeEnd)="resizeEnded(dayEvent)"
            mwlDraggable
            dragActiveClass="cal-drag-active"
            [dropData]="{ event: dayEvent.event, calendarId: calendarId }"
            [dragAxis]="{
              x:
                !snapDraggedEvents &&
                dayEvent.event.draggable &&
                currentResizes.size === 0,
              y: dayEvent.event.draggable && currentResizes.size === 0
            }"
            [dragSnapGrid]="
              snapDraggedEvents ? { y: eventSnapSize || hourSegmentHeight } : {}
            "
            [validateDrag]="validateDrag"
            (dragPointerDown)="dragStarted(event, dayEventsContainer)"
            (dragging)="dragMove($event)"
            (dragEnd)="dragEnded(dayEvent, $event)"
            [style.marginTop.px]="dayEvent.top"
            [style.height.px]="dayEvent.height"
            [style.marginLeft.px]="dayEvent.left + 70"
            [style.width.px]="dayEvent.width - 1"
          >
            <div
              class="cal-resize-handle cal-resize-handle-before-start"
              *ngIf="
                dayEvent.event?.resizable?.beforeStart &&
                !dayEvent.startsBeforeDay
              "
              mwlResizeHandle
              [resizeEdges]="{ top: true }"
            ></div>
            <mwl-calendar-day-view-event
              [dayEvent]="dayEvent"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="eventTemplate"
              [eventTitleTemplate]="eventTitleTemplate"
              [eventActionsTemplate]="eventActionsTemplate"
              (eventClicked)="eventClicked.emit({ event: dayEvent.event })"
            >
            </mwl-calendar-day-view-event>
            <div
              class="cal-resize-handle cal-resize-handle-after-end"
              *ngIf="
                dayEvent.event?.resizable?.afterEnd && !dayEvent.endsAfterDay
              "
              mwlResizeHandle
              [resizeEdges]="{ bottom: true }"
            ></div>
          </div>
        </div>
        <div
          class="cal-hour"
          *ngFor="let hour of hours; trackBy: trackByHour"
          [style.minWidth.px]="view?.width + 70"
        >
          <mwl-calendar-day-view-hour-segment
            *ngFor="let segment of hour.segments; trackBy: trackByHourSegment"
            [style.height.px]="hourSegmentHeight"
            [segment]="segment"
            [segmentHeight]="hourSegmentHeight"
            [locale]="locale"
            [customTemplate]="hourSegmentTemplate"
            (mwlClick)="hourSegmentClicked.emit({ date: segment.date })"
            mwlDroppable
            dragOverClass="cal-drag-over"
            dragActiveClass="cal-drag-active"
            (drop)="eventDropped($event, segment.date, false)"
          >
          </mwl-calendar-day-view-hour-segment>
        </div>
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
CalendarDayViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
CalendarDayViewComponent.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    hourSegments: [{ type: Input }],
    hourSegmentHeight: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayStartMinute: [{ type: Input }],
    dayEndHour: [{ type: Input }],
    dayEndMinute: [{ type: Input }],
    eventWidth: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    eventSnapSize: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    tooltipDelay: [{ type: Input }],
    hourSegmentTemplate: [{ type: Input }],
    eventTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    eventActionsTemplate: [{ type: Input }],
    snapDraggedEvents: [{ type: Input }],
    scrollContainer: [{ type: Input }],
    eventClicked: [{ type: Output }],
    hourSegmentClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }],
    beforeViewRender: [{ type: Output }]
};
if (false) {
    /**
     * The current view date
     * @type {?}
     */
    CalendarDayViewComponent.prototype.viewDate;
    /**
     * An array of events to display on view
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     * @type {?}
     */
    CalendarDayViewComponent.prototype.events;
    /**
     * The number of segments in an hour. Must be <= 6
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegments;
    /**
     * The height in pixels of each hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentHeight;
    /**
     * The day start hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartHour;
    /**
     * The day start minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayStartMinute;
    /**
     * The day end hours in 24 hour time. Must be 0-23
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndHour;
    /**
     * The day end minutes. Must be 0-59
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dayEndMinute;
    /**
     * The width in pixels of each event on the view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventWidth;
    /**
     * An observable that when emitted on will re-render the current view
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refresh;
    /**
     * The locale used to format dates
     * @type {?}
     */
    CalendarDayViewComponent.prototype.locale;
    /**
     * The grid size to snap resizing and dragging of events to
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventSnapSize;
    /**
     * The placement of the event tooltip
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipPlacement;
    /**
     * A custom template to use for the event tooltips
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipTemplate;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipAppendToBody;
    /**
     * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
     * will be displayed immediately.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.tooltipDelay;
    /**
     * A custom template to use to replace the hour segment
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentTemplate;
    /**
     * A custom template to use for day view events
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTemplate;
    /**
     * A custom template to use for event titles
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTitleTemplate;
    /**
     * A custom template to use for event actions
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventActionsTemplate;
    /**
     * Whether to snap events to a grid when dragging
     * @type {?}
     */
    CalendarDayViewComponent.prototype.snapDraggedEvents;
    /**
     * Optional. On this element the "scroll(x, y)" method gets called, when
     * an event is dragged to the top or bottom of the viewport.
     * @type {?}
     */
    CalendarDayViewComponent.prototype.scrollContainer;
    /**
     * Called when an event title is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventClicked;
    /**
     * Called when an hour segment is clicked
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hourSegmentClicked;
    /**
     * Called when an event is resized or dragged and dropped
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventTimesChanged;
    /**
     * An output that will be called before the view is rendered for the current day.
     * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
     * @type {?}
     */
    CalendarDayViewComponent.prototype.beforeViewRender;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.hours;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.view;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.width;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.refreshSubscription;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.currentResizes;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.eventDragEnter;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.calendarId;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.dragAlreadyMoved;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateDrag;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.validateResize;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByEventId;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHour;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByHourSegment;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.trackByDayEvent;
    /**
     * @hidden
     * @type {?}
     */
    CalendarDayViewComponent.prototype.calendarDayAutoScroll;
    /**
     * @type {?}
     * @private
     */
    CalendarDayViewComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    CalendarDayViewComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    CalendarDayViewComponent.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1jYWxlbmRhci8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF5L2NhbGVuZGFyLWRheS12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFHTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFVdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQ0wsY0FBYyxFQUNkLGNBQWMsRUFDZCxXQUFXLEVBQ1gsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsOEJBQThCLEVBQzlCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3ZCLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRy9ELE9BQU8scUJBQXFCLE1BQU0sNEJBQTRCLENBQUM7Ozs7QUFFL0Qsc0RBTUM7OztJQUxDLGdEQUdFOztJQUNGLGtEQUFtQjs7Ozs7O0FBTXJCLHdDQUlDOzs7SUFIQyx5Q0FBb0I7O0lBQ3BCLDRDQUF1Qjs7SUFDdkIsa0NBQWE7Ozs7Ozs7Ozs7OztBQXFKZixNQUFNLE9BQU8sd0JBQXdCOzs7Ozs7OztJQThObkMsWUFDVSxHQUFzQixFQUN0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Ozs7SUFLZCx5Q0FBa0I7Ozs7O0lBS2xCLHVEQUFrQzs7Ozs7SUFLbEMsa0RBQWtFOzs7OztJQUtsRSxrREFBbUI7Ozs7O0lBS25CLDhDQUFvRDs7Ozs7SUFLcEQsb0RBQXlCOzs7OztJQUt6QixnREFBcUM7Ozs7O0lBS3JDLGtEQUF1Qzs7Ozs7SUFLdkMsa0RBQWdDOzs7OztJQUtoQywrQ0FBMEI7Ozs7O0lBSzFCLHNEQUF3Qzs7Ozs7SUFLeEMsbURBQXdDOzs7OztJQU14Qyx5REFBNkM7Ozs7O0lBTTNDLHVDQUE4Qjs7Ozs7SUFDOUIseUNBQTRCOzs7OztJQUU1QiwrQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgTE9DQUxFX0lELFxuICBJbmplY3QsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnQsXG4gIERheVZpZXcsXG4gIERheVZpZXdIb3VyLFxuICBEYXlWaWV3SG91clNlZ21lbnQsXG4gIERheVZpZXdFdmVudCxcbiAgVmlld1BlcmlvZCxcbiAgV2Vla1ZpZXdBbGxEYXlFdmVudFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlc2l6ZUV2ZW50IH0gZnJvbSAnYW5ndWxhci1yZXNpemFibGUtZWxlbWVudCc7XG5pbXBvcnQgeyBDYWxlbmRhckRyYWdIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZHJhZy1oZWxwZXIucHJvdmlkZXInO1xuaW1wb3J0IHsgQ2FsZW5kYXJSZXNpemVIZWxwZXIgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItcmVzaXplLWhlbHBlci5wcm92aWRlcic7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQsXG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGVcbn0gZnJvbSAnLi4vY29tbW9uL2NhbGVuZGFyLWV2ZW50LXRpbWVzLWNoYW5nZWQtZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbGVuZGFyVXRpbHMgfSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItdXRpbHMucHJvdmlkZXInO1xuaW1wb3J0IHtcbiAgdmFsaWRhdGVFdmVudHMsXG4gIHRyYWNrQnlFdmVudElkLFxuICB0cmFja0J5SG91cixcbiAgdHJhY2tCeUhvdXJTZWdtZW50LFxuICBnZXRNaW51dGVzTW92ZWQsXG4gIGdldERlZmF1bHRFdmVudEVuZCxcbiAgZ2V0TWluaW11bUV2ZW50SGVpZ2h0SW5NaW51dGVzLFxuICB0cmFja0J5RGF5T3JXZWVrRXZlbnQsXG4gIGlzRHJhZ2dlZFdpdGhpblBlcmlvZCxcbiAgc2hvdWxkRmlyZURyb3BwZWRFdmVudFxufSBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4uLy4uL2RhdGUtYWRhcHRlcnMvZGF0ZS1hZGFwdGVyJztcbmltcG9ydCB7IERyYWdFbmRFdmVudCwgRHJhZ01vdmVFdmVudCB9IGZyb20gJ2FuZ3VsYXItZHJhZ2dhYmxlLWRyb3BwYWJsZSc7XG5pbXBvcnQgeyBQbGFjZW1lbnRBcnJheSB9IGZyb20gJ3Bvc2l0aW9uaW5nJztcbmltcG9ydCBDYWxlbmRhckRheUF1dG9TY3JvbGwgZnJvbSAnLi9jYWxlbmRhci1kYXktYXV0by1zY3JvbGwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50IHtcbiAgYm9keToge1xuICAgIGhvdXJHcmlkOiBEYXlWaWV3SG91cltdO1xuICAgIGFsbERheUV2ZW50czogQ2FsZW5kYXJFdmVudFtdO1xuICB9O1xuICBwZXJpb2Q6IFZpZXdQZXJpb2Q7XG59XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgaW50ZXJmYWNlIERheVZpZXdFdmVudFJlc2l6ZSB7XG4gIG9yaWdpbmFsVG9wOiBudW1iZXI7XG4gIG9yaWdpbmFsSGVpZ2h0OiBudW1iZXI7XG4gIGVkZ2U6IHN0cmluZztcbn1cblxuLyoqXG4gKiBTaG93cyBhbGwgZXZlbnRzIG9uIGEgZ2l2ZW4gZGF5LiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItZGF5LXZpZXdcbiAqICBbdmlld0RhdGVdPVwidmlld0RhdGVcIlxuICogIFtldmVudHNdPVwiZXZlbnRzXCI+XG4gKiA8L213bC1jYWxlbmRhci1kYXktdmlldz5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtY2FsZW5kYXItZGF5LXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtZGF5LXZpZXdcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtYWxsLWRheS1ldmVudHNcIlxuICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxuICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAoZHJvcCk9XCJldmVudERyb3BwZWQoJGV2ZW50LCB2aWV3LnBlcmlvZC5zdGFydCwgdHJ1ZSlcIlxuICAgICAgPlxuICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWV2ZW50XG4gICAgICAgICAgKm5nRm9yPVwibGV0IGV2ZW50IG9mIHZpZXcuYWxsRGF5RXZlbnRzOyB0cmFja0J5OiB0cmFja0J5RXZlbnRJZFwiXG4gICAgICAgICAgW25nQ2xhc3NdPVwiZXZlbnQuY3NzQ2xhc3NcIlxuICAgICAgICAgIFtkYXlFdmVudF09XCJ7IGV2ZW50OiBldmVudCB9XCJcbiAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJldmVudFRlbXBsYXRlXCJcbiAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgW2V2ZW50QWN0aW9uc1RlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcbiAgICAgICAgICBbY2xhc3MuY2FsLWRyYWdnYWJsZV09XCIhc25hcERyYWdnZWRFdmVudHMgJiYgZXZlbnQuZHJhZ2dhYmxlXCJcbiAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgIFtkcm9wRGF0YV09XCJ7IGV2ZW50OiBldmVudCwgY2FsZW5kYXJJZDogY2FsZW5kYXJJZCB9XCJcbiAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xuICAgICAgICAgICAgeDogIXNuYXBEcmFnZ2VkRXZlbnRzICYmIGV2ZW50LmRyYWdnYWJsZSxcbiAgICAgICAgICAgIHk6ICFzbmFwRHJhZ2dlZEV2ZW50cyAmJiBldmVudC5kcmFnZ2FibGVcbiAgICAgICAgICB9XCJcbiAgICAgICAgPlxuICAgICAgICA8L213bC1jYWxlbmRhci1kYXktdmlldy1ldmVudD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ob3VyLXJvd3NcIlxuICAgICAgICAjZGF5RXZlbnRzQ29udGFpbmVyXG4gICAgICAgIG13bERyb3BwYWJsZVxuICAgICAgICAoZHJhZ0VudGVyKT1cImV2ZW50RHJhZ0VudGVyID0gZXZlbnREcmFnRW50ZXIgKyAxXCJcbiAgICAgICAgKGRyYWdMZWF2ZSk9XCJldmVudERyYWdFbnRlciA9IGV2ZW50RHJhZ0VudGVyIC0gMVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtZXZlbnRzXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgI2V2ZW50XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgZGF5RXZlbnQgb2Ygdmlldz8uZXZlbnRzOyB0cmFja0J5OiB0cmFja0J5RGF5RXZlbnRcIlxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnQtY29udGFpbmVyXCJcbiAgICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cImRheUV2ZW50LmV2ZW50LmRyYWdnYWJsZVwiXG4gICAgICAgICAgICBbY2xhc3MuY2FsLXN0YXJ0cy13aXRoaW4tZGF5XT1cIiFkYXlFdmVudC5zdGFydHNCZWZvcmVEYXlcIlxuICAgICAgICAgICAgW2NsYXNzLmNhbC1lbmRzLXdpdGhpbi1kYXldPVwiIWRheUV2ZW50LmVuZHNBZnRlckRheVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJkYXlFdmVudC5ldmVudC5jc3NDbGFzc1wiXG4gICAgICAgICAgICBtd2xSZXNpemFibGVcbiAgICAgICAgICAgIFtyZXNpemVTbmFwR3JpZF09XCJ7XG4gICAgICAgICAgICAgIHRvcDogZXZlbnRTbmFwU2l6ZSB8fCBob3VyU2VnbWVudEhlaWdodCxcbiAgICAgICAgICAgICAgYm90dG9tOiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0XG4gICAgICAgICAgICB9XCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZVJlc2l6ZV09XCJ2YWxpZGF0ZVJlc2l6ZVwiXG4gICAgICAgICAgICAocmVzaXplU3RhcnQpPVwicmVzaXplU3RhcnRlZChkYXlFdmVudCwgJGV2ZW50LCBkYXlFdmVudHNDb250YWluZXIpXCJcbiAgICAgICAgICAgIChyZXNpemluZyk9XCJyZXNpemluZyhkYXlFdmVudCwgJGV2ZW50KVwiXG4gICAgICAgICAgICAocmVzaXplRW5kKT1cInJlc2l6ZUVuZGVkKGRheUV2ZW50KVwiXG4gICAgICAgICAgICBtd2xEcmFnZ2FibGVcbiAgICAgICAgICAgIGRyYWdBY3RpdmVDbGFzcz1cImNhbC1kcmFnLWFjdGl2ZVwiXG4gICAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogZGF5RXZlbnQuZXZlbnQsIGNhbGVuZGFySWQ6IGNhbGVuZGFySWQgfVwiXG4gICAgICAgICAgICBbZHJhZ0F4aXNdPVwie1xuICAgICAgICAgICAgICB4OlxuICAgICAgICAgICAgICAgICFzbmFwRHJhZ2dlZEV2ZW50cyAmJlxuICAgICAgICAgICAgICAgIGRheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJlxuICAgICAgICAgICAgICAgIGN1cnJlbnRSZXNpemVzLnNpemUgPT09IDAsXG4gICAgICAgICAgICAgIHk6IGRheUV2ZW50LmV2ZW50LmRyYWdnYWJsZSAmJiBjdXJyZW50UmVzaXplcy5zaXplID09PSAwXG4gICAgICAgICAgICB9XCJcbiAgICAgICAgICAgIFtkcmFnU25hcEdyaWRdPVwiXG4gICAgICAgICAgICAgIHNuYXBEcmFnZ2VkRXZlbnRzID8geyB5OiBldmVudFNuYXBTaXplIHx8IGhvdXJTZWdtZW50SGVpZ2h0IH0gOiB7fVxuICAgICAgICAgICAgXCJcbiAgICAgICAgICAgIFt2YWxpZGF0ZURyYWddPVwidmFsaWRhdGVEcmFnXCJcbiAgICAgICAgICAgIChkcmFnUG9pbnRlckRvd24pPVwiZHJhZ1N0YXJ0ZWQoZXZlbnQsIGRheUV2ZW50c0NvbnRhaW5lcilcIlxuICAgICAgICAgICAgKGRyYWdnaW5nKT1cImRyYWdNb3ZlKCRldmVudClcIlxuICAgICAgICAgICAgKGRyYWdFbmQpPVwiZHJhZ0VuZGVkKGRheUV2ZW50LCAkZXZlbnQpXCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5Ub3AucHhdPVwiZGF5RXZlbnQudG9wXCJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiZGF5RXZlbnQuaGVpZ2h0XCJcbiAgICAgICAgICAgIFtzdHlsZS5tYXJnaW5MZWZ0LnB4XT1cImRheUV2ZW50LmxlZnQgKyA3MFwiXG4gICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwiZGF5RXZlbnQud2lkdGggLSAxXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYmVmb3JlLXN0YXJ0XCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICBkYXlFdmVudC5ldmVudD8ucmVzaXphYmxlPy5iZWZvcmVTdGFydCAmJlxuICAgICAgICAgICAgICAgICFkYXlFdmVudC5zdGFydHNCZWZvcmVEYXlcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgbXdsUmVzaXplSGFuZGxlXG4gICAgICAgICAgICAgIFtyZXNpemVFZGdlc109XCJ7IHRvcDogdHJ1ZSB9XCJcbiAgICAgICAgICAgID48L2Rpdj5cbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItZGF5LXZpZXctZXZlbnRcbiAgICAgICAgICAgICAgW2RheUV2ZW50XT1cImRheUV2ZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBQbGFjZW1lbnRdPVwidG9vbHRpcFBsYWNlbWVudFwiXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwRGVsYXldPVwidG9vbHRpcERlbGF5XCJcbiAgICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGVtcGxhdGVcIlxuICAgICAgICAgICAgICBbZXZlbnRUaXRsZVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogZGF5RXZlbnQuZXZlbnQgfSlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgPC9td2wtY2FsZW5kYXItZGF5LXZpZXctZXZlbnQ+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FsLXJlc2l6ZS1oYW5kbGUgY2FsLXJlc2l6ZS1oYW5kbGUtYWZ0ZXItZW5kXCJcbiAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICBkYXlFdmVudC5ldmVudD8ucmVzaXphYmxlPy5hZnRlckVuZCAmJiAhZGF5RXZlbnQuZW5kc0FmdGVyRGF5XG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIG13bFJlc2l6ZUhhbmRsZVxuICAgICAgICAgICAgICBbcmVzaXplRWRnZXNdPVwieyBib3R0b206IHRydWUgfVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3M9XCJjYWwtaG91clwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGhvdXIgb2YgaG91cnM7IHRyYWNrQnk6IHRyYWNrQnlIb3VyXCJcbiAgICAgICAgICBbc3R5bGUubWluV2lkdGgucHhdPVwidmlldz8ud2lkdGggKyA3MFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHNlZ21lbnQgb2YgaG91ci5zZWdtZW50czsgdHJhY2tCeTogdHJhY2tCeUhvdXJTZWdtZW50XCJcbiAgICAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiaG91clNlZ21lbnRIZWlnaHRcIlxuICAgICAgICAgICAgW3NlZ21lbnRdPVwic2VnbWVudFwiXG4gICAgICAgICAgICBbc2VnbWVudEhlaWdodF09XCJob3VyU2VnbWVudEhlaWdodFwiXG4gICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiaG91clNlZ21lbnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAobXdsQ2xpY2spPVwiaG91clNlZ21lbnRDbGlja2VkLmVtaXQoeyBkYXRlOiBzZWdtZW50LmRhdGUgfSlcIlxuICAgICAgICAgICAgbXdsRHJvcHBhYmxlXG4gICAgICAgICAgICBkcmFnT3ZlckNsYXNzPVwiY2FsLWRyYWctb3ZlclwiXG4gICAgICAgICAgICBkcmFnQWN0aXZlQ2xhc3M9XCJjYWwtZHJhZy1hY3RpdmVcIlxuICAgICAgICAgICAgKGRyb3ApPVwiZXZlbnREcm9wcGVkKCRldmVudCwgc2VnbWVudC5kYXRlLCBmYWxzZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L213bC1jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJEYXlWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB2aWV3IGRhdGVcbiAgICovXG4gIEBJbnB1dCgpIHZpZXdEYXRlOiBEYXRlO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBldmVudHMgdG8gZGlzcGxheSBvbiB2aWV3XG4gICAqIFRoZSBzY2hlbWEgaXMgYXZhaWxhYmxlIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0bGV3aXM5Mi9jYWxlbmRhci11dGlscy9ibG9iL2M1MTY4OTk4NWY1OWEyNzE5NDBlMzBiYzRlMmM0ZTFmZWUzZmNiNWMvc3JjL2NhbGVuZGFyVXRpbHMudHMjTDQ5LUw2M1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBzZWdtZW50cyBpbiBhbiBob3VyLiBNdXN0IGJlIDw9IDZcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50czogbnVtYmVyID0gMjtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBpbiBwaXhlbHMgb2YgZWFjaCBob3VyIHNlZ21lbnRcbiAgICovXG4gIEBJbnB1dCgpIGhvdXJTZWdtZW50SGVpZ2h0OiBudW1iZXIgPSAzMDtcblxuICAvKipcbiAgICogVGhlIGRheSBzdGFydCBob3VycyBpbiAyNCBob3VyIHRpbWUuIE11c3QgYmUgMC0yM1xuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF5IHN0YXJ0IG1pbnV0ZXMuIE11c3QgYmUgMC01OVxuICAgKi9cbiAgQElucHV0KCkgZGF5U3RhcnRNaW51dGU6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXkgZW5kIGhvdXJzIGluIDI0IGhvdXIgdGltZS4gTXVzdCBiZSAwLTIzXG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRIb3VyOiBudW1iZXIgPSAyMztcblxuICAvKipcbiAgICogVGhlIGRheSBlbmQgbWludXRlcy4gTXVzdCBiZSAwLTU5XG4gICAqL1xuICBASW5wdXQoKSBkYXlFbmRNaW51dGU6IG51bWJlciA9IDU5O1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcGl4ZWxzIG9mIGVhY2ggZXZlbnQgb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50V2lkdGg6IG51bWJlciA9IDE1MDtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCBzaXplIHRvIHNuYXAgcmVzaXppbmcgYW5kIGRyYWdnaW5nIG9mIGV2ZW50cyB0b1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRTbmFwU2l6ZTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIHRvIHJlcGxhY2UgdGhlIGhvdXIgc2VnbWVudFxuICAgKi9cbiAgQElucHV0KCkgaG91clNlZ21lbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciBkYXkgdmlldyBldmVudHNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgdGl0bGVzXG4gICAqL1xuICBASW5wdXQoKSBldmVudFRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSBmb3IgZXZlbnQgYWN0aW9uc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRBY3Rpb25zVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gc25hcCBldmVudHMgdG8gYSBncmlkIHdoZW4gZHJhZ2dpbmdcbiAgICovXG4gIEBJbnB1dCgpIHNuYXBEcmFnZ2VkRXZlbnRzOiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogT3B0aW9uYWwuIE9uIHRoaXMgZWxlbWVudCB0aGUgXCJzY3JvbGwoeCwgeSlcIiBtZXRob2QgZ2V0cyBjYWxsZWQsIHdoZW4gXG4gICAqIGFuIGV2ZW50IGlzIGRyYWdnZWQgdG8gdGhlIHRvcCBvciBib3R0b20gb2YgdGhlIHZpZXdwb3J0LlxuICAgKi8gIFxuICBASW5wdXQoKSBzY3JvbGxDb250YWluZXI6IEhUTUxFbGVtZW50ID0gbnVsbDsgIFxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGhvdXIgc2VnbWVudCBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgaG91clNlZ21lbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF0ZTogRGF0ZTtcbiAgfT4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXZlbnQgaXMgcmVzaXplZCBvciBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBkYXkuXG4gICAqIElmIHlvdSBhZGQgdGhlIGBjc3NDbGFzc2AgcHJvcGVydHkgdG8gYW4gaG91ciBncmlkIHNlZ21lbnQgaXQgd2lsbCBhZGQgdGhhdCBjbGFzcyB0byB0aGUgaG91ciBzZWdtZW50IGluIHRoZSB0ZW1wbGF0ZVxuICAgKi9cbiAgQE91dHB1dCgpXG4gIGJlZm9yZVZpZXdSZW5kZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENhbGVuZGFyRGF5Vmlld0JlZm9yZVJlbmRlckV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBob3VyczogRGF5Vmlld0hvdXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2aWV3OiBEYXlWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB3aWR0aDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgcmVmcmVzaFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjdXJyZW50UmVzaXplczogTWFwPERheVZpZXdFdmVudCwgRGF5Vmlld0V2ZW50UmVzaXplPiA9IG5ldyBNYXAoKTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgZXZlbnREcmFnRW50ZXIgPSAwO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjYWxlbmRhcklkID0gU3ltYm9sKCdhbmd1bGFyIGNhbGVuZGFyIGRheSB2aWV3IGlkJyk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGRyYWdBbHJlYWR5TW92ZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmFsaWRhdGVEcmFnOiAoYXJnczogYW55KSA9PiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB2YWxpZGF0ZVJlc2l6ZTogKGFyZ3M6IGFueSkgPT4gYm9vbGVhbjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXIgPSB0cmFja0J5SG91cjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdHJhY2tCeUhvdXJTZWdtZW50ID0gdHJhY2tCeUhvdXJTZWdtZW50O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICB0cmFja0J5RGF5RXZlbnQgPSB0cmFja0J5RGF5T3JXZWVrRXZlbnQ7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG5cbiAgY2FsZW5kYXJEYXlBdXRvU2Nyb2xsOiBDYWxlbmRhckRheUF1dG9TY3JvbGw7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIHV0aWxzOiBDYWxlbmRhclV0aWxzLFxuICAgIEBJbmplY3QoTE9DQUxFX0lEKSBsb2NhbGU6IHN0cmluZyxcbiAgICBwcml2YXRlIGRhdGVBZGFwdGVyOiBEYXRlQWRhcHRlclxuICApIHtcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24gPSB0aGlzLnJlZnJlc2guc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWZyZXNoQWxsKCk7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5jYWxlbmRhckRheUF1dG9TY3JvbGwgPSBuZXcgQ2FsZW5kYXJEYXlBdXRvU2Nyb2xsKHRoaXMuc2Nyb2xsQ29udGFpbmVyKSAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcmVmcmVzaEhvdXJHcmlkID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZGF5U3RhcnRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0TWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZEhvdXIgfHxcbiAgICAgIGNoYW5nZXMuZGF5RW5kTWludXRlIHx8XG4gICAgICBjaGFuZ2VzLmhvdXJTZWdtZW50cztcblxuICAgIGNvbnN0IHJlZnJlc2hWaWV3ID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XG4gICAgICBjaGFuZ2VzLmRheVN0YXJ0SG91ciB8fFxuICAgICAgY2hhbmdlcy5kYXlTdGFydE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5kYXlFbmRIb3VyIHx8XG4gICAgICBjaGFuZ2VzLmRheUVuZE1pbnV0ZSB8fFxuICAgICAgY2hhbmdlcy5ldmVudFdpZHRoO1xuXG4gICAgaWYgKHJlZnJlc2hIb3VyR3JpZCkge1xuICAgICAgdGhpcy5yZWZyZXNoSG91ckdyaWQoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5ldmVudHMpIHtcbiAgICAgIHZhbGlkYXRlRXZlbnRzKHRoaXMuZXZlbnRzKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaFZpZXcpIHtcbiAgICAgIHRoaXMucmVmcmVzaFZpZXcoKTtcbiAgICB9XG5cbiAgICBpZiAocmVmcmVzaEhvdXJHcmlkIHx8IHJlZnJlc2hWaWV3KSB7XG4gICAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgZXZlbnREcm9wcGVkKFxuICAgIGRyb3BFdmVudDogeyBkcm9wRGF0YT86IHsgZXZlbnQ/OiBDYWxlbmRhckV2ZW50OyBjYWxlbmRhcklkPzogc3ltYm9sIH0gfSxcbiAgICBkYXRlOiBEYXRlLFxuICAgIGFsbERheTogYm9vbGVhblxuICApOiB2b2lkIHtcbiAgICBpZiAoc2hvdWxkRmlyZURyb3BwZWRFdmVudChkcm9wRXZlbnQsIGRhdGUsIGFsbERheSwgdGhpcy5jYWxlbmRhcklkKSkge1xuICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wLFxuICAgICAgICBldmVudDogZHJvcEV2ZW50LmRyb3BEYXRhLmV2ZW50LFxuICAgICAgICBuZXdTdGFydDogZGF0ZSxcbiAgICAgICAgYWxsRGF5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXNpemVTdGFydGVkKFxuICAgIGV2ZW50OiBEYXlWaWV3RXZlbnQsXG4gICAgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50LFxuICAgIGRheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50UmVzaXplcy5zZXQoZXZlbnQsIHtcbiAgICAgIG9yaWdpbmFsVG9wOiBldmVudC50b3AsXG4gICAgICBvcmlnaW5hbEhlaWdodDogZXZlbnQuaGVpZ2h0LFxuICAgICAgZWRnZTogdHlwZW9mIHJlc2l6ZUV2ZW50LmVkZ2VzLnRvcCAhPT0gJ3VuZGVmaW5lZCcgPyAndG9wJyA6ICdib3R0b20nXG4gICAgfSk7XG4gICAgY29uc3QgcmVzaXplSGVscGVyOiBDYWxlbmRhclJlc2l6ZUhlbHBlciA9IG5ldyBDYWxlbmRhclJlc2l6ZUhlbHBlcihcbiAgICAgIGRheUV2ZW50c0NvbnRhaW5lclxuICAgICk7XG4gICAgdGhpcy52YWxpZGF0ZVJlc2l6ZSA9ICh7IHJlY3RhbmdsZSB9KSA9PlxuICAgICAgcmVzaXplSGVscGVyLnZhbGlkYXRlUmVzaXplKHsgcmVjdGFuZ2xlIH0pO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVzaXppbmcoZXZlbnQ6IERheVZpZXdFdmVudCwgcmVzaXplRXZlbnQ6IFJlc2l6ZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZXZlbnQpO1xuICAgIGlmICh0eXBlb2YgcmVzaXplRXZlbnQuZWRnZXMudG9wICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZXZlbnQudG9wID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcCArICtyZXNpemVFdmVudC5lZGdlcy50b3A7XG4gICAgICBldmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0IC0gK3Jlc2l6ZUV2ZW50LmVkZ2VzLnRvcDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNpemVFdmVudC5lZGdlcy5ib3R0b20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBldmVudC5oZWlnaHQgPSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0ICsgK3Jlc2l6ZUV2ZW50LmVkZ2VzLmJvdHRvbTtcbiAgICB9XG4gIH1cblxuICByZXNpemVFbmRlZChkYXlFdmVudDogRGF5Vmlld0V2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJlc2l6ZTogRGF5Vmlld0V2ZW50UmVzaXplID0gdGhpcy5jdXJyZW50UmVzaXplcy5nZXQoZGF5RXZlbnQpO1xuXG4gICAgY29uc3QgcmVzaXppbmdCZWZvcmVTdGFydCA9IGN1cnJlbnRSZXNpemUuZWRnZSA9PT0gJ3RvcCc7XG4gICAgbGV0IHBpeGVsc01vdmVkOiBudW1iZXI7XG4gICAgaWYgKHJlc2l6aW5nQmVmb3JlU3RhcnQpIHtcbiAgICAgIHBpeGVsc01vdmVkID0gZGF5RXZlbnQudG9wIC0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbFRvcDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGl4ZWxzTW92ZWQgPSBkYXlFdmVudC5oZWlnaHQgLSBjdXJyZW50UmVzaXplLm9yaWdpbmFsSGVpZ2h0O1xuICAgIH1cblxuICAgIGRheUV2ZW50LnRvcCA9IGN1cnJlbnRSZXNpemUub3JpZ2luYWxUb3A7XG4gICAgZGF5RXZlbnQuaGVpZ2h0ID0gY3VycmVudFJlc2l6ZS5vcmlnaW5hbEhlaWdodDtcblxuICAgIGNvbnN0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgIHBpeGVsc01vdmVkLFxuICAgICAgdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgdGhpcy5ldmVudFNuYXBTaXplXG4gICAgKTtcblxuICAgIGxldCBuZXdTdGFydDogRGF0ZSA9IGRheUV2ZW50LmV2ZW50LnN0YXJ0O1xuICAgIGxldCBuZXdFbmQ6IERhdGUgPSBnZXREZWZhdWx0RXZlbnRFbmQoXG4gICAgICB0aGlzLmRhdGVBZGFwdGVyLFxuICAgICAgZGF5RXZlbnQuZXZlbnQsXG4gICAgICBnZXRNaW5pbXVtRXZlbnRIZWlnaHRJbk1pbnV0ZXModGhpcy5ob3VyU2VnbWVudHMsIHRoaXMuaG91clNlZ21lbnRIZWlnaHQpXG4gICAgKTtcbiAgICBpZiAocmVzaXppbmdCZWZvcmVTdGFydCkge1xuICAgICAgbmV3U3RhcnQgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMobmV3U3RhcnQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkTWludXRlcyhuZXdFbmQsIG1pbnV0ZXNNb3ZlZCk7XG4gICAgfVxuXG4gICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgIG5ld1N0YXJ0LFxuICAgICAgbmV3RW5kLFxuICAgICAgZXZlbnQ6IGRheUV2ZW50LmV2ZW50LFxuICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5SZXNpemVcbiAgICB9KTtcbiAgICB0aGlzLmN1cnJlbnRSZXNpemVzLmRlbGV0ZShkYXlFdmVudCk7XG4gIH1cblxuICBkcmFnU3RhcnRlZChldmVudDogSFRNTEVsZW1lbnQsIGRheUV2ZW50c0NvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFnSGVscGVyOiBDYWxlbmRhckRyYWdIZWxwZXIgPSBuZXcgQ2FsZW5kYXJEcmFnSGVscGVyKFxuICAgICAgZGF5RXZlbnRzQ29udGFpbmVyLFxuICAgICAgZXZlbnRcbiAgICApO1xuICAgIHRoaXMudmFsaWRhdGVEcmFnID0gKHsgeCwgeSB9KSA9PlxuICAgICAgdGhpcy5jdXJyZW50UmVzaXplcy5zaXplID09PSAwICYmXG4gICAgICBkcmFnSGVscGVyLnZhbGlkYXRlRHJhZyh7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHNuYXBEcmFnZ2VkRXZlbnRzOiB0aGlzLnNuYXBEcmFnZ2VkRXZlbnRzLFxuICAgICAgICBkcmFnQWxyZWFkeU1vdmVkOiB0aGlzLmRyYWdBbHJlYWR5TW92ZWRcbiAgICAgIH0pO1xuICAgIHRoaXMuZXZlbnREcmFnRW50ZXIgPSAwO1xuICAgIHRoaXMuZHJhZ0FscmVhZHlNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgdGhpcy5jYWxlbmRhckRheUF1dG9TY3JvbGwuZHJhZ1N0YXJ0KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBkcmFnTW92ZShkcmFnTW92ZUV2ZW50OiBEcmFnTW92ZUV2ZW50KSB7XG4gICAgdGhpcy5kcmFnQWxyZWFkeU1vdmVkID0gdHJ1ZTtcbiAgICB0aGlzLmNhbGVuZGFyRGF5QXV0b1Njcm9sbC5kcmFnTW92ZShkcmFnTW92ZUV2ZW50KTtcbiAgfVxuXG4gIGRyYWdFbmRlZChkYXlFdmVudDogRGF5Vmlld0V2ZW50LCBkcmFnRW5kRXZlbnQ6IERyYWdFbmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50RHJhZ0VudGVyID4gMCkge1xuICAgICAgbGV0IG1pbnV0ZXNNb3ZlZCA9IGdldE1pbnV0ZXNNb3ZlZChcbiAgICAgICAgZHJhZ0VuZEV2ZW50LnksXG4gICAgICAgIHRoaXMuaG91clNlZ21lbnRzLFxuICAgICAgICB0aGlzLmhvdXJTZWdtZW50SGVpZ2h0LFxuICAgICAgICB0aGlzLmV2ZW50U25hcFNpemVcbiAgICAgICk7XG4gICAgICBsZXQgbmV3U3RhcnQ6IERhdGUgPSB0aGlzLmRhdGVBZGFwdGVyLmFkZE1pbnV0ZXMoXG4gICAgICAgIGRheUV2ZW50LmV2ZW50LnN0YXJ0LFxuICAgICAgICBtaW51dGVzTW92ZWRcbiAgICAgICk7XG4gICAgICBpZiAoZHJhZ0VuZEV2ZW50LnkgPCAwICYmIG5ld1N0YXJ0IDwgdGhpcy52aWV3LnBlcmlvZC5zdGFydCkge1xuICAgICAgICBtaW51dGVzTW92ZWQgKz0gdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5NaW51dGVzKFxuICAgICAgICAgIHRoaXMudmlldy5wZXJpb2Quc3RhcnQsXG4gICAgICAgICAgbmV3U3RhcnRcbiAgICAgICAgKTtcbiAgICAgICAgbmV3U3RhcnQgPSB0aGlzLnZpZXcucGVyaW9kLnN0YXJ0O1xuICAgICAgfVxuICAgICAgbGV0IG5ld0VuZDogRGF0ZTtcbiAgICAgIGlmIChkYXlFdmVudC5ldmVudC5lbmQpIHtcbiAgICAgICAgbmV3RW5kID0gdGhpcy5kYXRlQWRhcHRlci5hZGRNaW51dGVzKGRheUV2ZW50LmV2ZW50LmVuZCwgbWludXRlc01vdmVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0RyYWdnZWRXaXRoaW5QZXJpb2QobmV3U3RhcnQsIG5ld0VuZCwgdGhpcy52aWV3LnBlcmlvZCkpIHtcbiAgICAgICAgdGhpcy5ldmVudFRpbWVzQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgICBuZXdFbmQsXG4gICAgICAgICAgZXZlbnQ6IGRheUV2ZW50LmV2ZW50LFxuICAgICAgICAgIHR5cGU6IENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudFR5cGUuRHJhZyxcbiAgICAgICAgICBhbGxEYXk6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEhvdXJHcmlkKCk6IHZvaWQge1xuICAgIHRoaXMuaG91cnMgPSB0aGlzLnV0aWxzLmdldERheVZpZXdIb3VyR3JpZCh7XG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIGhvdXJTZWdtZW50czogdGhpcy5ob3VyU2VnbWVudHMsXG4gICAgICBkYXlTdGFydDoge1xuICAgICAgICBob3VyOiB0aGlzLmRheVN0YXJ0SG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheVN0YXJ0TWludXRlXG4gICAgICB9LFxuICAgICAgZGF5RW5kOiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5RW5kSG91cixcbiAgICAgICAgbWludXRlOiB0aGlzLmRheUVuZE1pbnV0ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLnV0aWxzLmdldERheVZpZXcoe1xuICAgICAgZXZlbnRzOiB0aGlzLmV2ZW50cyxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLnZpZXdEYXRlLFxuICAgICAgaG91clNlZ21lbnRzOiB0aGlzLmhvdXJTZWdtZW50cyxcbiAgICAgIGRheVN0YXJ0OiB7XG4gICAgICAgIGhvdXI6IHRoaXMuZGF5U3RhcnRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5U3RhcnRNaW51dGVcbiAgICAgIH0sXG4gICAgICBkYXlFbmQ6IHtcbiAgICAgICAgaG91cjogdGhpcy5kYXlFbmRIb3VyLFxuICAgICAgICBtaW51dGU6IHRoaXMuZGF5RW5kTWludXRlXG4gICAgICB9LFxuICAgICAgZXZlbnRXaWR0aDogdGhpcy5ldmVudFdpZHRoLFxuICAgICAgc2VnbWVudEhlaWdodDogdGhpcy5ob3VyU2VnbWVudEhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZWZyZXNoQWxsKCk6IHZvaWQge1xuICAgIHRoaXMucmVmcmVzaEhvdXJHcmlkKCk7XG4gICAgdGhpcy5yZWZyZXNoVmlldygpO1xuICAgIHRoaXMuZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaG91cnMgJiYgdGhpcy52aWV3KSB7XG4gICAgICB0aGlzLmJlZm9yZVZpZXdSZW5kZXIuZW1pdCh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBob3VyR3JpZDogdGhpcy5ob3VycyxcbiAgICAgICAgICBhbGxEYXlFdmVudHM6IHRoaXMudmlldy5hbGxEYXlFdmVudHNcbiAgICAgICAgfSxcbiAgICAgICAgcGVyaW9kOiB0aGlzLnZpZXcucGVyaW9kXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==