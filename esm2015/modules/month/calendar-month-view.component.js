/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ChangeDetectorRef, LOCALE_ID, Inject, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventTimesChangedEventType } from '../common/calendar-event-times-changed-event.interface';
import { CalendarUtils } from '../common/calendar-utils.provider';
import { validateEvents } from '../common/util';
import { DateAdapter } from '../../date-adapters/date-adapter';
/**
 * @record
 */
export function CalendarMonthViewBeforeRenderEvent() { }
if (false) {
    /** @type {?} */
    CalendarMonthViewBeforeRenderEvent.prototype.header;
    /** @type {?} */
    CalendarMonthViewBeforeRenderEvent.prototype.body;
    /** @type {?} */
    CalendarMonthViewBeforeRenderEvent.prototype.period;
}
/**
 * @record
 * @template EventMetaType, DayMetaType
 */
export function CalendarMonthViewEventTimesChangedEvent() { }
if (false) {
    /** @type {?} */
    CalendarMonthViewEventTimesChangedEvent.prototype.day;
}
/**
 * Shows all events on a given month. Example usage:
 *
 * ```typescript
 * <mwl-calendar-month-view
 *  [viewDate]="viewDate"
 *  [events]="events">
 * </mwl-calendar-month-view>
 * ```
 */
export class CalendarMonthViewComponent {
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
         * An array of events to display on view.
         * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
         */
        this.events = [];
        /**
         * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
         */
        this.excludeDays = [];
        /**
         * Whether the events list for the day of the `viewDate` option is visible or not
         */
        this.activeDayIsOpen = false;
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
         * An output that will be called before the view is rendered for the current month.
         * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
         */
        this.beforeViewRender = new EventEmitter();
        /**
         * Called when the day cell is clicked
         */
        this.dayClicked = new EventEmitter();
        /**
         * Called when the event title is clicked
         */
        this.eventClicked = new EventEmitter();
        /**
         * Called when a header week day is clicked. Returns ISO day number.
         */
        this.columnHeaderClicked = new EventEmitter();
        /**
         * Called when an event is dragged and dropped
         */
        this.eventTimesChanged = new EventEmitter();
        /**
         * @hidden
         */
        this.trackByRowOffset = (index, offset) => this.view.days
            .slice(offset, this.view.totalDaysVisibleInWeek)
            .map(day => day.date.toISOString())
            .join('-');
        /**
         * @hidden
         */
        this.trackByDate = (index, day) => day.date.toISOString();
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
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
        /** @type {?} */
        const refreshBody = changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.weekendDays;
        if (refreshHeader) {
            this.refreshHeader();
        }
        if (changes.events) {
            validateEvents(this.events);
        }
        if (refreshBody) {
            this.refreshBody();
        }
        if (refreshHeader || refreshBody) {
            this.emitBeforeViewRender();
        }
        if (changes.activeDayIsOpen ||
            changes.viewDate ||
            changes.events ||
            changes.excludeDays ||
            changes.activeDay) {
            this.checkActiveDayIsOpen();
        }
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
     * @param {?} event
     * @param {?} isHighlighted
     * @return {?}
     */
    toggleDayHighlight(event, isHighlighted) {
        this.view.days.forEach(day => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor =
                    (event.color && event.color.secondary) || '#D1E8FF';
            }
            else {
                delete day.backgroundColor;
            }
        });
    }
    /**
     * @hidden
     * @param {?} droppedOn
     * @param {?} event
     * @param {?=} draggedFrom
     * @return {?}
     */
    eventDropped(droppedOn, event, draggedFrom) {
        if (droppedOn !== draggedFrom) {
            /** @type {?} */
            const year = this.dateAdapter.getYear(droppedOn.date);
            /** @type {?} */
            const month = this.dateAdapter.getMonth(droppedOn.date);
            /** @type {?} */
            const date = this.dateAdapter.getDate(droppedOn.date);
            /** @type {?} */
            const newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
            /** @type {?} */
            let newEnd;
            if (event.end) {
                /** @type {?} */
                const secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
            }
            this.eventTimesChanged.emit({
                event,
                newStart,
                newEnd,
                day: droppedOn,
                type: CalendarEventTimesChangedEventType.Drop
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshHeader() {
        this.columnHeaders = this.utils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    /**
     * @private
     * @return {?}
     */
    refreshBody() {
        this.view = this.utils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn,
            excluded: this.excludeDays,
            weekendDays: this.weekendDays
        });
    }
    /**
     * @private
     * @return {?}
     */
    checkActiveDayIsOpen() {
        if (this.activeDayIsOpen === true) {
            /** @type {?} */
            const activeDay = this.activeDay || this.viewDate;
            this.openDay = this.view.days.find(day => this.dateAdapter.isSameDay(day.date, activeDay));
            /** @type {?} */
            const index = this.view.days.indexOf(this.openDay);
            this.openRowIndex =
                Math.floor(index / this.view.totalDaysVisibleInWeek) *
                    this.view.totalDaysVisibleInWeek;
        }
        else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }
    /**
     * @private
     * @return {?}
     */
    refreshAll() {
        this.refreshHeader();
        this.refreshBody();
        this.emitBeforeViewRender();
        this.checkActiveDayIsOpen();
    }
    /**
     * @private
     * @return {?}
     */
    emitBeforeViewRender() {
        if (this.columnHeaders && this.view) {
            this.beforeViewRender.emit({
                header: this.columnHeaders,
                body: this.view.days,
                period: this.view.period
            });
        }
    }
}
CalendarMonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-month-view',
                template: `
    <div class="cal-month-view">
      <mwl-calendar-month-view-header
        [days]="columnHeaders"
        [locale]="locale"
        (columnHeaderClicked)="columnHeaderClicked.emit($event)"
        [customTemplate]="headerTemplate"
      >
        >
      </mwl-calendar-month-view-header>
      <div class="cal-days">
        <div
          *ngFor="let rowIndex of view.rowOffsets; trackBy: trackByRowOffset"
        >
          <div class="cal-cell-row">
            <mwl-calendar-month-cell
              *ngFor="
                let day of (view.days
                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek);
                trackBy: trackByDate
              "
              [ngClass]="day?.cssClass"
              [day]="day"
              [openDay]="openDay"
              [locale]="locale"
              [tooltipPlacement]="tooltipPlacement"
              [tooltipAppendToBody]="tooltipAppendToBody"
              [tooltipTemplate]="tooltipTemplate"
              [tooltipDelay]="tooltipDelay"
              [customTemplate]="cellTemplate"
              (mwlClick)="dayClicked.emit({ day: day })"
              (highlightDay)="toggleDayHighlight($event.event, true)"
              (unhighlightDay)="toggleDayHighlight($event.event, false)"
              mwlDroppable
              dragOverClass="cal-drag-over"
              (drop)="
                eventDropped(
                  day,
                  $event.dropData.event,
                  $event.dropData.draggedFrom
                )
              "
              (eventClicked)="eventClicked.emit({ event: $event.event })"
            >
            </mwl-calendar-month-cell>
          </div>
          <mwl-calendar-open-day-events
            [isOpen]="openRowIndex === rowIndex"
            [events]="openDay?.events"
            [customTemplate]="openDayEventsTemplate"
            [eventTitleTemplate]="eventTitleTemplate"
            [eventActionsTemplate]="eventActionsTemplate"
            (eventClicked)="eventClicked.emit({ event: $event.event })"
            mwlDroppable
            dragOverClass="cal-drag-over"
            (drop)="
              eventDropped(
                openDay,
                $event.dropData.event,
                $event.dropData.draggedFrom
              )
            "
          >
          </mwl-calendar-open-day-events>
        </div>
      </div>
    </div>
  `
            }] }
];
/** @nocollapse */
CalendarMonthViewComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: CalendarUtils },
    { type: String, decorators: [{ type: Inject, args: [LOCALE_ID,] }] },
    { type: DateAdapter }
];
CalendarMonthViewComponent.propDecorators = {
    viewDate: [{ type: Input }],
    events: [{ type: Input }],
    excludeDays: [{ type: Input }],
    activeDayIsOpen: [{ type: Input }],
    activeDay: [{ type: Input }],
    refresh: [{ type: Input }],
    locale: [{ type: Input }],
    tooltipPlacement: [{ type: Input }],
    tooltipTemplate: [{ type: Input }],
    tooltipAppendToBody: [{ type: Input }],
    tooltipDelay: [{ type: Input }],
    weekStartsOn: [{ type: Input }],
    headerTemplate: [{ type: Input }],
    cellTemplate: [{ type: Input }],
    openDayEventsTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    eventActionsTemplate: [{ type: Input }],
    weekendDays: [{ type: Input }],
    beforeViewRender: [{ type: Output }],
    dayClicked: [{ type: Output }],
    eventClicked: [{ type: Output }],
    columnHeaderClicked: [{ type: Output }],
    eventTimesChanged: [{ type: Output }]
};
if (false) {
    /**
     * The current view date
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.viewDate;
    /**
     * An array of events to display on view.
     * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.events;
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.excludeDays;
    /**
     * Whether the events list for the day of the `viewDate` option is visible or not
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.activeDayIsOpen;
    /**
     * If set will be used to determine the day that should be open. If not set, the `viewDate` is used
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.activeDay;
    /**
     * An observable that when emitted on will re-render the current view
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.refresh;
    /**
     * The locale used to format dates
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.locale;
    /**
     * The placement of the event tooltip
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.tooltipPlacement;
    /**
     * A custom template to use for the event tooltips
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.tooltipTemplate;
    /**
     * Whether to append tooltips to the body or next to the trigger element
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.tooltipAppendToBody;
    /**
     * The delay in milliseconds before the tooltip should be displayed. If not provided the tooltip
     * will be displayed immediately.
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.tooltipDelay;
    /**
     * The start number of the week
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.weekStartsOn;
    /**
     * A custom template to use to replace the header
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.headerTemplate;
    /**
     * A custom template to use to replace the day cell
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.cellTemplate;
    /**
     * A custom template to use for the slide down box of events for the active day
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.openDayEventsTemplate;
    /**
     * A custom template to use for event titles
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.eventTitleTemplate;
    /**
     * A custom template to use for event actions
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.eventActionsTemplate;
    /**
     * An array of day indexes (0 = sunday, 1 = monday etc) that indicate which days are weekends
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.weekendDays;
    /**
     * An output that will be called before the view is rendered for the current month.
     * If you add the `cssClass` property to a day in the body it will add that class to the cell element in the template
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.beforeViewRender;
    /**
     * Called when the day cell is clicked
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.dayClicked;
    /**
     * Called when the event title is clicked
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.eventClicked;
    /**
     * Called when a header week day is clicked. Returns ISO day number.
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.columnHeaderClicked;
    /**
     * Called when an event is dragged and dropped
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.eventTimesChanged;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.columnHeaders;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.view;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.openRowIndex;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.openDay;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.refreshSubscription;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.trackByRowOffset;
    /**
     * @hidden
     * @type {?}
     */
    CalendarMonthViewComponent.prototype.trackByDate;
    /**
     * @type {?}
     * @private
     */
    CalendarMonthViewComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    CalendarMonthViewComponent.prototype.utils;
    /**
     * @type {?}
     * @private
     */
    CalendarMonthViewComponent.prototype.dateAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9udGgtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy9tb250aC9jYWxlbmRhci1tb250aC12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFHakIsU0FBUyxFQUNULE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFRdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUVMLGtDQUFrQyxFQUNuQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBRy9ELHdEQUlDOzs7SUFIQyxvREFBa0I7O0lBQ2xCLGtEQUFxQjs7SUFDckIsb0RBQW1COzs7Ozs7QUFHckIsNkRBS0M7OztJQURDLHNEQUErQjs7Ozs7Ozs7Ozs7O0FBb0ZqQyxNQUFNLE9BQU8sMEJBQTBCOzs7Ozs7OztJQTRLckMsWUFDVSxHQUFzQixFQUN0QixLQUFvQixFQUNULE1BQWMsRUFDekIsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQUVwQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTs7Ozs7UUFyS3pCLFdBQU0sR0FBb0IsRUFBRSxDQUFDOzs7O1FBSzdCLGdCQUFXLEdBQWEsRUFBRSxDQUFDOzs7O1FBSzNCLG9CQUFlLEdBQVksS0FBSyxDQUFDOzs7O1FBb0JqQyxxQkFBZ0IsR0FBbUIsTUFBTSxDQUFDOzs7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TCxLQUFLOzhCQUtMLEtBQUs7a0NBS0wsS0FBSzsyQkFNTCxLQUFLOzJCQUtMLEtBQUs7NkJBS0wsS0FBSzsyQkFLTCxLQUFLO29DQUtMLEtBQUs7aUNBS0wsS0FBSzttQ0FLTCxLQUFLOzBCQUtMLEtBQUs7K0JBTUwsTUFBTTt5QkFNTixNQUFNOzJCQVFOLE1BQU07a0NBUU4sTUFBTTtnQ0FLTixNQUFNOzs7Ozs7O0lBeEhQLDhDQUF3Qjs7Ozs7O0lBTXhCLDRDQUFzQzs7Ozs7SUFLdEMsaURBQW9DOzs7OztJQUtwQyxxREFBMEM7Ozs7O0lBSzFDLCtDQUF5Qjs7Ozs7SUFLekIsNkNBQStCOzs7OztJQUsvQiw0Q0FBd0I7Ozs7O0lBS3hCLHNEQUFtRDs7Ozs7SUFLbkQscURBQTJDOzs7OztJQUszQyx5REFBNkM7Ozs7OztJQU03QyxrREFBNEM7Ozs7O0lBSzVDLGtEQUE4Qjs7Ozs7SUFLOUIsb0RBQTBDOzs7OztJQUsxQyxrREFBd0M7Ozs7O0lBS3hDLDJEQUFpRDs7Ozs7SUFLakQsd0RBQThDOzs7OztJQUs5QywwREFBZ0Q7Ozs7O0lBS2hELGlEQUErQjs7Ozs7O0lBTS9CLHNEQUMwRTs7Ozs7SUFLMUUsZ0RBR0s7Ozs7O0lBS0wsa0RBR0s7Ozs7O0lBS0wseURBQTJEOzs7OztJQUszRCx1REFHSTs7Ozs7SUFLSixtREFBeUI7Ozs7O0lBS3pCLDBDQUFnQjs7Ozs7SUFLaEIsa0RBQXFCOzs7OztJQUtyQiw2Q0FBc0I7Ozs7O0lBS3RCLHlEQUFrQzs7Ozs7SUFLbEMsc0RBSWU7Ozs7O0lBS2YsaURBQTJFOzs7OztJQU16RSx5Q0FBOEI7Ozs7O0lBQzlCLDJDQUE0Qjs7Ozs7SUFFNUIsaURBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBMT0NBTEVfSUQsXG4gIEluamVjdCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYWxlbmRhckV2ZW50LFxuICBXZWVrRGF5LFxuICBNb250aFZpZXcsXG4gIE1vbnRoVmlld0RheSxcbiAgVmlld1BlcmlvZFxufSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIENhbGVuZGFyRXZlbnRUaW1lc0NoYW5nZWRFdmVudCxcbiAgQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZVxufSBmcm9tICcuLi9jb21tb24vY2FsZW5kYXItZXZlbnQtdGltZXMtY2hhbmdlZC1ldmVudC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FsZW5kYXJVdGlscyB9IGZyb20gJy4uL2NvbW1vbi9jYWxlbmRhci11dGlscy5wcm92aWRlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50cyB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi4vLi4vZGF0ZS1hZGFwdGVycy9kYXRlLWFkYXB0ZXInO1xuaW1wb3J0IHsgUGxhY2VtZW50QXJyYXkgfSBmcm9tICdwb3NpdGlvbmluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudCB7XG4gIGhlYWRlcjogV2Vla0RheVtdO1xuICBib2R5OiBNb250aFZpZXdEYXlbXTtcbiAgcGVyaW9kOiBWaWV3UGVyaW9kO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhbGVuZGFyTW9udGhWaWV3RXZlbnRUaW1lc0NoYW5nZWRFdmVudDxcbiAgRXZlbnRNZXRhVHlwZSA9IGFueSxcbiAgRGF5TWV0YVR5cGUgPSBhbnlcbj4gZXh0ZW5kcyBDYWxlbmRhckV2ZW50VGltZXNDaGFuZ2VkRXZlbnQ8RXZlbnRNZXRhVHlwZT4ge1xuICBkYXk6IE1vbnRoVmlld0RheTxEYXlNZXRhVHlwZT47XG59XG5cbi8qKlxuICogU2hvd3MgYWxsIGV2ZW50cyBvbiBhIGdpdmVuIG1vbnRoLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIDxtd2wtY2FsZW5kYXItbW9udGgtdmlld1xuICogIFt2aWV3RGF0ZV09XCJ2aWV3RGF0ZVwiXG4gKiAgW2V2ZW50c109XCJldmVudHNcIj5cbiAqIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXc+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXcnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJjYWwtbW9udGgtdmlld1wiPlxuICAgICAgPG13bC1jYWxlbmRhci1tb250aC12aWV3LWhlYWRlclxuICAgICAgICBbZGF5c109XCJjb2x1bW5IZWFkZXJzXCJcbiAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAoY29sdW1uSGVhZGVyQ2xpY2tlZCk9XCJjb2x1bW5IZWFkZXJDbGlja2VkLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgIFtjdXN0b21UZW1wbGF0ZV09XCJoZWFkZXJUZW1wbGF0ZVwiXG4gICAgICA+XG4gICAgICAgID5cbiAgICAgIDwvbXdsLWNhbGVuZGFyLW1vbnRoLXZpZXctaGVhZGVyPlxuICAgICAgPGRpdiBjbGFzcz1cImNhbC1kYXlzXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcm93SW5kZXggb2Ygdmlldy5yb3dPZmZzZXRzOyB0cmFja0J5OiB0cmFja0J5Um93T2Zmc2V0XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtY2VsbC1yb3dcIj5cbiAgICAgICAgICAgIDxtd2wtY2FsZW5kYXItbW9udGgtY2VsbFxuICAgICAgICAgICAgICAqbmdGb3I9XCJcbiAgICAgICAgICAgICAgICBsZXQgZGF5IG9mICh2aWV3LmRheXNcbiAgICAgICAgICAgICAgICAgIHwgc2xpY2U6IHJvd0luZGV4OnJvd0luZGV4ICsgdmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKTtcbiAgICAgICAgICAgICAgICB0cmFja0J5OiB0cmFja0J5RGF0ZVxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICBbbmdDbGFzc109XCJkYXk/LmNzc0NsYXNzXCJcbiAgICAgICAgICAgICAgW2RheV09XCJkYXlcIlxuICAgICAgICAgICAgICBbb3BlbkRheV09XCJvcGVuRGF5XCJcbiAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICBbdG9vbHRpcFBsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBBcHBlbmRUb0JvZHldPVwidG9vbHRpcEFwcGVuZFRvQm9keVwiXG4gICAgICAgICAgICAgIFt0b29sdGlwVGVtcGxhdGVdPVwidG9vbHRpcFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgW3Rvb2x0aXBEZWxheV09XCJ0b29sdGlwRGVsYXlcIlxuICAgICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwiY2VsbFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgKG13bENsaWNrKT1cImRheUNsaWNrZWQuZW1pdCh7IGRheTogZGF5IH0pXCJcbiAgICAgICAgICAgICAgKGhpZ2hsaWdodERheSk9XCJ0b2dnbGVEYXlIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCB0cnVlKVwiXG4gICAgICAgICAgICAgICh1bmhpZ2hsaWdodERheSk9XCJ0b2dnbGVEYXlIaWdobGlnaHQoJGV2ZW50LmV2ZW50LCBmYWxzZSlcIlxuICAgICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgICAgZHJhZ092ZXJDbGFzcz1cImNhbC1kcmFnLW92ZXJcIlxuICAgICAgICAgICAgICAoZHJvcCk9XCJcbiAgICAgICAgICAgICAgICBldmVudERyb3BwZWQoXG4gICAgICAgICAgICAgICAgICBkYXksXG4gICAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZHJhZ2dlZEZyb21cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgIChldmVudENsaWNrZWQpPVwiZXZlbnRDbGlja2VkLmVtaXQoeyBldmVudDogJGV2ZW50LmV2ZW50IH0pXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLW1vbnRoLWNlbGw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPG13bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHNcbiAgICAgICAgICAgIFtpc09wZW5dPVwib3BlblJvd0luZGV4ID09PSByb3dJbmRleFwiXG4gICAgICAgICAgICBbZXZlbnRzXT1cIm9wZW5EYXk/LmV2ZW50c1wiXG4gICAgICAgICAgICBbY3VzdG9tVGVtcGxhdGVdPVwib3BlbkRheUV2ZW50c1RlbXBsYXRlXCJcbiAgICAgICAgICAgIFtldmVudFRpdGxlVGVtcGxhdGVdPVwiZXZlbnRUaXRsZVRlbXBsYXRlXCJcbiAgICAgICAgICAgIFtldmVudEFjdGlvbnNUZW1wbGF0ZV09XCJldmVudEFjdGlvbnNUZW1wbGF0ZVwiXG4gICAgICAgICAgICAoZXZlbnRDbGlja2VkKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6ICRldmVudC5ldmVudCB9KVwiXG4gICAgICAgICAgICBtd2xEcm9wcGFibGVcbiAgICAgICAgICAgIGRyYWdPdmVyQ2xhc3M9XCJjYWwtZHJhZy1vdmVyXCJcbiAgICAgICAgICAgIChkcm9wKT1cIlxuICAgICAgICAgICAgICBldmVudERyb3BwZWQoXG4gICAgICAgICAgICAgICAgb3BlbkRheSxcbiAgICAgICAgICAgICAgICAkZXZlbnQuZHJvcERhdGEuZXZlbnQsXG4gICAgICAgICAgICAgICAgJGV2ZW50LmRyb3BEYXRhLmRyYWdnZWRGcm9tXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbXdsLWNhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhck1vbnRoVmlld0NvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdmlldyBkYXRlXG4gICAqL1xuICBASW5wdXQoKSB2aWV3RGF0ZTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgZXZlbnRzIHRvIGRpc3BsYXkgb24gdmlldy5cbiAgICogVGhlIHNjaGVtYSBpcyBhdmFpbGFibGUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21hdHRsZXdpczkyL2NhbGVuZGFyLXV0aWxzL2Jsb2IvYzUxNjg5OTg1ZjU5YTI3MTk0MGUzMGJjNGUyYzRlMWZlZTNmY2I1Yy9zcmMvY2FsZW5kYXJVdGlscy50cyNMNDktTDYzXG4gICAqL1xuICBASW5wdXQoKSBldmVudHM6IENhbGVuZGFyRXZlbnRbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgd2lsbCBiZSBoaWRkZW4gb24gdGhlIHZpZXdcbiAgICovXG4gIEBJbnB1dCgpIGV4Y2x1ZGVEYXlzOiBudW1iZXJbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBldmVudHMgbGlzdCBmb3IgdGhlIGRheSBvZiB0aGUgYHZpZXdEYXRlYCBvcHRpb24gaXMgdmlzaWJsZSBvciBub3RcbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZURheUlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJZiBzZXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGF5IHRoYXQgc2hvdWxkIGJlIG9wZW4uIElmIG5vdCBzZXQsIHRoZSBgdmlld0RhdGVgIGlzIHVzZWRcbiAgICovXG4gIEBJbnB1dCgpIGFjdGl2ZURheTogRGF0ZTtcblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IHdoZW4gZW1pdHRlZCBvbiB3aWxsIHJlLXJlbmRlciB0aGUgY3VycmVudCB2aWV3XG4gICAqL1xuICBASW5wdXQoKSByZWZyZXNoOiBTdWJqZWN0PGFueT47XG5cbiAgLyoqXG4gICAqIFRoZSBsb2NhbGUgdXNlZCB0byBmb3JtYXQgZGF0ZXNcbiAgICovXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBldmVudCB0b29sdGlwXG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBQbGFjZW1lbnRBcnJheSA9ICdhdXRvJztcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgZXZlbnQgdG9vbHRpcHNcbiAgICovXG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogV2hldGhlciB0byBhcHBlbmQgdG9vbHRpcHMgdG8gdGhlIGJvZHkgb3IgbmV4dCB0byB0aGUgdHJpZ2dlciBlbGVtZW50XG4gICAqL1xuICBASW5wdXQoKSB0b29sdGlwQXBwZW5kVG9Cb2R5OiBib29sZWFuID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIHRvb2x0aXAgc2hvdWxkIGJlIGRpc3BsYXllZC4gSWYgbm90IHByb3ZpZGVkIHRoZSB0b29sdGlwXG4gICAqIHdpbGwgYmUgZGlzcGxheWVkIGltbWVkaWF0ZWx5LlxuICAgKi9cbiAgQElucHV0KCkgdG9vbHRpcERlbGF5OiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG51bWJlciBvZiB0aGUgd2Vla1xuICAgKi9cbiAgQElucHV0KCkgd2Vla1N0YXJ0c09uOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRlbXBsYXRlIHRvIHVzZSB0byByZXBsYWNlIHRoZSBoZWFkZXJcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgdG8gcmVwbGFjZSB0aGUgZGF5IGNlbGxcbiAgICovXG4gIEBJbnB1dCgpIGNlbGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvKipcbiAgICogQSBjdXN0b20gdGVtcGxhdGUgdG8gdXNlIGZvciB0aGUgc2xpZGUgZG93biBib3ggb2YgZXZlbnRzIGZvciB0aGUgYWN0aXZlIGRheVxuICAgKi9cbiAgQElucHV0KCkgb3BlbkRheUV2ZW50c1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IHRpdGxlc1xuICAgKi9cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0ZW1wbGF0ZSB0byB1c2UgZm9yIGV2ZW50IGFjdGlvbnNcbiAgICovXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBkYXkgaW5kZXhlcyAoMCA9IHN1bmRheSwgMSA9IG1vbmRheSBldGMpIHRoYXQgaW5kaWNhdGUgd2hpY2ggZGF5cyBhcmUgd2Vla2VuZHNcbiAgICovXG4gIEBJbnB1dCgpIHdlZWtlbmREYXlzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogQW4gb3V0cHV0IHRoYXQgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIHRoZSB2aWV3IGlzIHJlbmRlcmVkIGZvciB0aGUgY3VycmVudCBtb250aC5cbiAgICogSWYgeW91IGFkZCB0aGUgYGNzc0NsYXNzYCBwcm9wZXJ0eSB0byBhIGRheSBpbiB0aGUgYm9keSBpdCB3aWxsIGFkZCB0aGF0IGNsYXNzIHRvIHRoZSBjZWxsIGVsZW1lbnQgaW4gdGhlIHRlbXBsYXRlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgYmVmb3JlVmlld1JlbmRlciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJNb250aFZpZXdCZWZvcmVSZW5kZXJFdmVudD4oKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIGRheSBjZWxsIGlzIGNsaWNrZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICBkYXlDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZGF5OiBNb250aFZpZXdEYXk7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBldmVudCB0aXRsZSBpcyBjbGlja2VkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRDbGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgaGVhZGVyIHdlZWsgZGF5IGlzIGNsaWNrZWQuIFJldHVybnMgSVNPIGRheSBudW1iZXIuXG4gICAqL1xuICBAT3V0cHV0KCkgY29sdW1uSGVhZGVyQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBldmVudCBpcyBkcmFnZ2VkIGFuZCBkcm9wcGVkXG4gICAqL1xuICBAT3V0cHV0KClcbiAgZXZlbnRUaW1lc0NoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFxuICAgIENhbGVuZGFyTW9udGhWaWV3RXZlbnRUaW1lc0NoYW5nZWRFdmVudFxuICA+KCk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGNvbHVtbkhlYWRlcnM6IFdlZWtEYXlbXTtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdmlldzogTW9udGhWaWV3O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBvcGVuUm93SW5kZXg6IG51bWJlcjtcblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgb3BlbkRheTogTW9udGhWaWV3RGF5O1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICByZWZyZXNoU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlSb3dPZmZzZXQgPSAoaW5kZXg6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpID0+XG4gICAgdGhpcy52aWV3LmRheXNcbiAgICAgIC5zbGljZShvZmZzZXQsIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKVxuICAgICAgLm1hcChkYXkgPT4gZGF5LmRhdGUudG9JU09TdHJpbmcoKSlcbiAgICAgIC5qb2luKCctJyk7XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIHRyYWNrQnlEYXRlID0gKGluZGV4OiBudW1iZXIsIGRheTogTW9udGhWaWV3RGF5KSA9PiBkYXkuZGF0ZS50b0lTT1N0cmluZygpO1xuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSB1dGlsczogQ2FsZW5kYXJVdGlscyxcbiAgICBASW5qZWN0KExPQ0FMRV9JRCkgbG9jYWxlOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBkYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXJcbiAgKSB7XG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucmVmcmVzaCkge1xuICAgICAgdGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uID0gdGhpcy5yZWZyZXNoLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCByZWZyZXNoSGVhZGVyID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHwgY2hhbmdlcy5leGNsdWRlRGF5cyB8fCBjaGFuZ2VzLndlZWtlbmREYXlzO1xuICAgIGNvbnN0IHJlZnJlc2hCb2R5ID1cbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XG4gICAgICBjaGFuZ2VzLndlZWtlbmREYXlzO1xuXG4gICAgaWYgKHJlZnJlc2hIZWFkZXIpIHtcbiAgICAgIHRoaXMucmVmcmVzaEhlYWRlcigpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzLmV2ZW50cykge1xuICAgICAgdmFsaWRhdGVFdmVudHModGhpcy5ldmVudHMpO1xuICAgIH1cblxuICAgIGlmIChyZWZyZXNoQm9keSkge1xuICAgICAgdGhpcy5yZWZyZXNoQm9keSgpO1xuICAgIH1cblxuICAgIGlmIChyZWZyZXNoSGVhZGVyIHx8IHJlZnJlc2hCb2R5KSB7XG4gICAgICB0aGlzLmVtaXRCZWZvcmVWaWV3UmVuZGVyKCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2hhbmdlcy5hY3RpdmVEYXlJc09wZW4gfHxcbiAgICAgIGNoYW5nZXMudmlld0RhdGUgfHxcbiAgICAgIGNoYW5nZXMuZXZlbnRzIHx8XG4gICAgICBjaGFuZ2VzLmV4Y2x1ZGVEYXlzIHx8XG4gICAgICBjaGFuZ2VzLmFjdGl2ZURheVxuICAgICkge1xuICAgICAgdGhpcy5jaGVja0FjdGl2ZURheUlzT3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAaGlkZGVuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWZyZXNoU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnJlZnJlc2hTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQGhpZGRlblxuICAgKi9cbiAgdG9nZ2xlRGF5SGlnaGxpZ2h0KGV2ZW50OiBDYWxlbmRhckV2ZW50LCBpc0hpZ2hsaWdodGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy52aWV3LmRheXMuZm9yRWFjaChkYXkgPT4ge1xuICAgICAgaWYgKGlzSGlnaGxpZ2h0ZWQgJiYgZGF5LmV2ZW50cy5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XG4gICAgICAgIGRheS5iYWNrZ3JvdW5kQ29sb3IgPVxuICAgICAgICAgIChldmVudC5jb2xvciAmJiBldmVudC5jb2xvci5zZWNvbmRhcnkpIHx8ICcjRDFFOEZGJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBkYXkuYmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIGV2ZW50RHJvcHBlZChcbiAgICBkcm9wcGVkT246IE1vbnRoVmlld0RheSxcbiAgICBldmVudDogQ2FsZW5kYXJFdmVudCxcbiAgICBkcmFnZ2VkRnJvbT86IE1vbnRoVmlld0RheVxuICApOiB2b2lkIHtcbiAgICBpZiAoZHJvcHBlZE9uICE9PSBkcmFnZ2VkRnJvbSkge1xuICAgICAgY29uc3QgeWVhcjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5nZXRZZWFyKGRyb3BwZWRPbi5kYXRlKTtcbiAgICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSB0aGlzLmRhdGVBZGFwdGVyLmdldE1vbnRoKGRyb3BwZWRPbi5kYXRlKTtcbiAgICAgIGNvbnN0IGRhdGU6IG51bWJlciA9IHRoaXMuZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkcm9wcGVkT24uZGF0ZSk7XG4gICAgICBjb25zdCBuZXdTdGFydDogRGF0ZSA9IHRoaXMuZGF0ZUFkYXB0ZXIuc2V0RGF0ZShcbiAgICAgICAgdGhpcy5kYXRlQWRhcHRlci5zZXRNb250aChcbiAgICAgICAgICB0aGlzLmRhdGVBZGFwdGVyLnNldFllYXIoZXZlbnQuc3RhcnQsIHllYXIpLFxuICAgICAgICAgIG1vbnRoXG4gICAgICAgICksXG4gICAgICAgIGRhdGVcbiAgICAgICk7XG4gICAgICBsZXQgbmV3RW5kOiBEYXRlO1xuICAgICAgaWYgKGV2ZW50LmVuZCkge1xuICAgICAgICBjb25zdCBzZWNvbmRzRGlmZjogbnVtYmVyID0gdGhpcy5kYXRlQWRhcHRlci5kaWZmZXJlbmNlSW5TZWNvbmRzKFxuICAgICAgICAgIG5ld1N0YXJ0LFxuICAgICAgICAgIGV2ZW50LnN0YXJ0XG4gICAgICAgICk7XG4gICAgICAgIG5ld0VuZCA9IHRoaXMuZGF0ZUFkYXB0ZXIuYWRkU2Vjb25kcyhldmVudC5lbmQsIHNlY29uZHNEaWZmKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXZlbnRUaW1lc0NoYW5nZWQuZW1pdCh7XG4gICAgICAgIGV2ZW50LFxuICAgICAgICBuZXdTdGFydCxcbiAgICAgICAgbmV3RW5kLFxuICAgICAgICBkYXk6IGRyb3BwZWRPbixcbiAgICAgICAgdHlwZTogQ2FsZW5kYXJFdmVudFRpbWVzQ2hhbmdlZEV2ZW50VHlwZS5Ecm9wXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hIZWFkZXIoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5IZWFkZXJzID0gdGhpcy51dGlscy5nZXRXZWVrVmlld0hlYWRlcih7XG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2hCb2R5KCk6IHZvaWQge1xuICAgIHRoaXMudmlldyA9IHRoaXMudXRpbHMuZ2V0TW9udGhWaWV3KHtcbiAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICB2aWV3RGF0ZTogdGhpcy52aWV3RGF0ZSxcbiAgICAgIHdlZWtTdGFydHNPbjogdGhpcy53ZWVrU3RhcnRzT24sXG4gICAgICBleGNsdWRlZDogdGhpcy5leGNsdWRlRGF5cyxcbiAgICAgIHdlZWtlbmREYXlzOiB0aGlzLndlZWtlbmREYXlzXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQWN0aXZlRGF5SXNPcGVuKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFjdGl2ZURheUlzT3BlbiA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgYWN0aXZlRGF5ID0gdGhpcy5hY3RpdmVEYXkgfHwgdGhpcy52aWV3RGF0ZTtcbiAgICAgIHRoaXMub3BlbkRheSA9IHRoaXMudmlldy5kYXlzLmZpbmQoZGF5ID0+XG4gICAgICAgIHRoaXMuZGF0ZUFkYXB0ZXIuaXNTYW1lRGF5KGRheS5kYXRlLCBhY3RpdmVEYXkpXG4gICAgICApO1xuICAgICAgY29uc3QgaW5kZXg6IG51bWJlciA9IHRoaXMudmlldy5kYXlzLmluZGV4T2YodGhpcy5vcGVuRGF5KTtcbiAgICAgIHRoaXMub3BlblJvd0luZGV4ID1cbiAgICAgICAgTWF0aC5mbG9vcihpbmRleCAvIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrKSAqXG4gICAgICAgIHRoaXMudmlldy50b3RhbERheXNWaXNpYmxlSW5XZWVrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Sb3dJbmRleCA9IG51bGw7XG4gICAgICB0aGlzLm9wZW5EYXkgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaEFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZnJlc2hIZWFkZXIoKTtcbiAgICB0aGlzLnJlZnJlc2hCb2R5KCk7XG4gICAgdGhpcy5lbWl0QmVmb3JlVmlld1JlbmRlcigpO1xuICAgIHRoaXMuY2hlY2tBY3RpdmVEYXlJc09wZW4oKTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdEJlZm9yZVZpZXdSZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1uSGVhZGVycyAmJiB0aGlzLnZpZXcpIHtcbiAgICAgIHRoaXMuYmVmb3JlVmlld1JlbmRlci5lbWl0KHtcbiAgICAgICAgaGVhZGVyOiB0aGlzLmNvbHVtbkhlYWRlcnMsXG4gICAgICAgIGJvZHk6IHRoaXMudmlldy5kYXlzLFxuICAgICAgICBwZXJpb2Q6IHRoaXMudmlldy5wZXJpb2RcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19