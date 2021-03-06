(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('positioning'), require('rxjs'), require('rxjs/operators'), require('calendar-utils'), require('@angular/animations'), require('@angular/common'), require('angular-resizable-element'), require('angular-draggable-droppable'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('angular-calendar', ['exports', 'positioning', 'rxjs', 'rxjs/operators', 'calendar-utils', '@angular/animations', '@angular/common', 'angular-resizable-element', 'angular-draggable-droppable', '@angular/core'], factory) :
    (factory((global['angular-calendar'] = {}),global.positioning,global.rxjs,global.rxjs.operators,global.calendarUtils,global.ng.animations,global.ng.common,global['angular-resizable-element'],global['angular-draggable-droppable'],global.ng.core));
}(this, (function (exports,positioning,rxjs,operators,calendarUtils,animations,common,angularResizableElement,angularDraggableDroppable,core) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarEventActionsComponent = /** @class */ (function () {
        function CalendarEventActionsComponent() {
            this.trackByActionId = function (index, action) {
                return action.id ? action.id : event;
            };
        }
        CalendarEventActionsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-event-actions',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-event=\"event\"\n      let-trackByActionId=\"trackByActionId\"\n    >\n      <span *ngIf=\"event.actions\" class=\"cal-event-actions\">\n        <a\n          class=\"cal-event-action\"\n          href=\"javascript:;\"\n          *ngFor=\"let action of event.actions; trackBy: trackByActionId\"\n          (mwlClick)=\"action.onClick({ event: event })\"\n          [ngClass]=\"action.cssClass\"\n          [innerHtml]=\"action.label\"\n        >\n        </a>\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        trackByActionId: trackByActionId\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarEventActionsComponent.propDecorators = {
            event: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }]
        };
        return CalendarEventActionsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarEventTitleComponent = /** @class */ (function () {
        function CalendarEventTitleComponent() {
        }
        CalendarEventTitleComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-event-title',
                        template: "\n    <ng-template #defaultTemplate let-event=\"event\" let-view=\"view\">\n      <span\n        class=\"cal-event-title\"\n        [innerHTML]=\"event.title | calendarEventTitle: view:event\"\n      >\n      </span>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        event: event,\n        view: view\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarEventTitleComponent.propDecorators = {
            event: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            view: [{ type: core.Input }]
        };
        return CalendarEventTitleComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarTooltipWindowComponent = /** @class */ (function () {
        function CalendarTooltipWindowComponent() {
        }
        CalendarTooltipWindowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-tooltip-window',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-contents=\"contents\"\n      let-placement=\"placement\"\n      let-event=\"event\"\n    >\n      <div class=\"cal-tooltip\" [ngClass]=\"'cal-tooltip-' + placement\">\n        <div class=\"cal-tooltip-arrow\"></div>\n        <div class=\"cal-tooltip-inner\" [innerHtml]=\"contents\"></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        contents: contents,\n        placement: placement,\n        event: event\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarTooltipWindowComponent.propDecorators = {
            contents: [{ type: core.Input }],
            placement: [{ type: core.Input }],
            event: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }]
        };
        return CalendarTooltipWindowComponent;
    }());
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
            this.cancelTooltipDelay$ = new rxjs.Subject();
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
                var delay$ = this.delay === null ? rxjs.of('now') : rxjs.timer(this.delay);
                delay$.pipe(operators.takeUntil(this.cancelTooltipDelay$)).subscribe(function () {
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
                    this.tooltipRef.instance.placement = positioning.positionElements(this.elementRef.nativeElement, this.tooltipRef.location.nativeElement.children[0], this.placement, this.appendToBody);
                    // keep re-positioning the tooltip until the arrow position doesn't make a difference
                    if (previousPosition !== this.tooltipRef.instance.placement) {
                        this.positionTooltip(this.tooltipRef.instance.placement);
                    }
                }
            };
        CalendarTooltipDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarTooltip]'
                    },] }
        ];
        /** @nocollapse */
        CalendarTooltipDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.Injector },
                { type: core.Renderer2 },
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
            ];
        };
        CalendarTooltipDirective.propDecorators = {
            contents: [{ type: core.Input, args: ['mwlCalendarTooltip',] }],
            placement: [{ type: core.Input, args: ['tooltipPlacement',] }],
            customTemplate: [{ type: core.Input, args: ['tooltipTemplate',] }],
            event: [{ type: core.Input, args: ['tooltipEvent',] }],
            appendToBody: [{ type: core.Input, args: ['tooltipAppendToBody',] }],
            delay: [{ type: core.Input, args: ['tooltipDelay',] }],
            onMouseOver: [{ type: core.HostListener, args: ['mouseenter',] }],
            onMouseOut: [{ type: core.HostListener, args: ['mouseleave',] }]
        };
        return CalendarTooltipDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ DateAdapter = /** @class */ (function () {
        function DateAdapter() {
        }
        return DateAdapter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var CalendarView = {
        Month: 'month',
        Week: 'week',
        Day: 'day',
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var validateEvents = function (events) {
        /** @type {?} */
        var warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return console.warn.apply(console, __spread(['angular-calendar'], args));
        };
        return calendarUtils.validateEvents(events, warn);
    };
    /**
     * @param {?} outer
     * @param {?} inner
     * @return {?}
     */
    function isInside(outer, inner) {
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
    function roundToNearest(amount, precision) {
        return Math.round(amount / precision) * precision;
    }
    /** @type {?} */
    var trackByEventId = function (index, event) {
        return event.id ? event.id : event;
    };
    /** @type {?} */
    var trackByWeekDayHeaderDate = function (index, day) {
        return day.date.toISOString();
    };
    /** @type {?} */
    var trackByHourSegment = function (index, segment) { return segment.date.toISOString(); };
    /** @type {?} */
    var trackByHour = function (index, hour) {
        return hour.segments[0].date.toISOString();
    };
    /** @type {?} */
    var trackByDayOrWeekEvent = function (index, weekEvent) { return (weekEvent.event.id ? weekEvent.event.id : weekEvent.event); };
    /** @type {?} */
    var MINUTES_IN_HOUR = 60;
    /**
     * @param {?} movedY
     * @param {?} hourSegments
     * @param {?} hourSegmentHeight
     * @param {?} eventSnapSize
     * @return {?}
     */
    function getMinutesMoved(movedY, hourSegments, hourSegmentHeight, eventSnapSize) {
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
    function getMinimumEventHeightInMinutes(hourSegments, hourSegmentHeight) {
        return (MINUTES_IN_HOUR / (hourSegments * hourSegmentHeight)) * 30;
    }
    /**
     * @param {?} dateAdapter
     * @param {?} event
     * @param {?} minimumMinutes
     * @return {?}
     */
    function getDefaultEventEnd(dateAdapter, event, minimumMinutes) {
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
    function addDaysWithExclusions(dateAdapter, date, days, excluded) {
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
    function isDraggedWithinPeriod(newStart, newEnd, period) {
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
    function shouldFireDroppedEvent(dropEvent, date, allDay, calendarId) {
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
    function getWeekViewPeriod(dateAdapter, viewDate, weekStartsOn, excluded, daysInWeek) {
        if (excluded === void 0) {
            excluded = [];
        }
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Change the view date to the previous view. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarPreviousView
     *  [(viewDate)]="viewDate"
     *  [view]="view">
     *  Previous
     * </button>
     * ```
     */
    var CalendarPreviousViewDirective = /** @class */ (function () {
        function CalendarPreviousViewDirective(dateAdapter) {
            this.dateAdapter = dateAdapter;
            /**
             * Days to skip when going back by 1 day
             */
            this.excludeDays = [];
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarPreviousViewDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                /** @type {?} */
                var subFn = {
                    day: this.dateAdapter.subDays,
                    week: this.dateAdapter.subWeeks,
                    month: this.dateAdapter.subMonths
                }[this.view];
                if (this.view === CalendarView.Day) {
                    this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -1, this.excludeDays));
                }
                else if (this.view === CalendarView.Week && this.daysInWeek) {
                    this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, -this.daysInWeek, this.excludeDays));
                }
                else {
                    this.viewDateChange.emit(subFn(this.viewDate, 1));
                }
            };
        CalendarPreviousViewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarPreviousView]'
                    },] }
        ];
        /** @nocollapse */
        CalendarPreviousViewDirective.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        CalendarPreviousViewDirective.propDecorators = {
            view: [{ type: core.Input }],
            viewDate: [{ type: core.Input }],
            excludeDays: [{ type: core.Input }],
            daysInWeek: [{ type: core.Input }],
            viewDateChange: [{ type: core.Output }],
            onClick: [{ type: core.HostListener, args: ['click',] }]
        };
        return CalendarPreviousViewDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Change the view date to the next view. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarNextView
     *  [(viewDate)]="viewDate"
     *  [view]="view">
     *  Next
     * </button>
     * ```
     */
    var CalendarNextViewDirective = /** @class */ (function () {
        function CalendarNextViewDirective(dateAdapter) {
            this.dateAdapter = dateAdapter;
            /**
             * Days to skip when going forward by 1 day
             */
            this.excludeDays = [];
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarNextViewDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                /** @type {?} */
                var addFn = {
                    day: this.dateAdapter.addDays,
                    week: this.dateAdapter.addWeeks,
                    month: this.dateAdapter.addMonths
                }[this.view];
                if (this.view === CalendarView.Day) {
                    this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, 1, this.excludeDays));
                }
                else if (this.view === CalendarView.Week && this.daysInWeek) {
                    this.viewDateChange.emit(addDaysWithExclusions(this.dateAdapter, this.viewDate, this.daysInWeek, this.excludeDays));
                }
                else {
                    this.viewDateChange.emit(addFn(this.viewDate, 1));
                }
            };
        CalendarNextViewDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarNextView]'
                    },] }
        ];
        /** @nocollapse */
        CalendarNextViewDirective.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        CalendarNextViewDirective.propDecorators = {
            view: [{ type: core.Input }],
            viewDate: [{ type: core.Input }],
            excludeDays: [{ type: core.Input }],
            daysInWeek: [{ type: core.Input }],
            viewDateChange: [{ type: core.Output }],
            onClick: [{ type: core.HostListener, args: ['click',] }]
        };
        return CalendarNextViewDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Change the view date to the current day. For example:
     *
     * ```typescript
     * <button
     *  mwlCalendarToday
     *  [(viewDate)]="viewDate">
     *  Today
     * </button>
     * ```
     */
    var CalendarTodayDirective = /** @class */ (function () {
        function CalendarTodayDirective(dateAdapter) {
            this.dateAdapter = dateAdapter;
            /**
             * Called when the view date is changed
             */
            this.viewDateChange = new core.EventEmitter();
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarTodayDirective.prototype.onClick = /**
         * @hidden
         * @return {?}
         */
            function () {
                this.viewDateChange.emit(this.dateAdapter.startOfDay(new Date()));
            };
        CalendarTodayDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlCalendarToday]'
                    },] }
        ];
        /** @nocollapse */
        CalendarTodayDirective.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        CalendarTodayDirective.propDecorators = {
            viewDate: [{ type: core.Input }],
            viewDateChange: [{ type: core.Output }],
            onClick: [{ type: core.HostListener, args: ['click',] }]
        };
        return CalendarTodayDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This will use the angular date pipe to do all date formatting. It is the default date formatter used by the calendar.
     */
    var CalendarAngularDateFormatter = /** @class */ (function () {
        function CalendarAngularDateFormatter(dateAdapter) {
            this.dateAdapter = dateAdapter;
        }
        /**
         * The month view header week day labels
         */
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'EEEE', locale);
            };
        /**
         * The month view cell day number
         */
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'd', locale);
            };
        /**
         * The month view title
         */
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'LLLL y', locale);
            };
        /**
         * The week view header week day labels
         */
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'EEEE', locale);
            };
        /**
         * The week view sub header day and month labels
         */
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'MMM d', locale);
            };
        /**
         * The week view title
         */
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale, weekStartsOn = _a.weekStartsOn, excludeDays = _a.excludeDays, daysInWeek = _a.daysInWeek;
                var _b = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
                /** @type {?} */
                var format = function (dateToFormat, showYear) {
                    return common.formatDate(dateToFormat, 'MMM d' + (showYear ? ', yyyy' : ''), locale);
                };
                return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
            };
        /**
         * The time formatting down the left hand side of the week view
         */
        /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.weekViewHour = /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'h a', locale);
            };
        /**
         * The time formatting down the left hand side of the day view
         */
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'h a', locale);
            };
        /**
         * The day view title
         */
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarAngularDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return common.formatDate(date, 'EEEE, MMMM d, y', locale);
            };
        CalendarAngularDateFormatter.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CalendarAngularDateFormatter.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        return CalendarAngularDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This class is responsible for all formatting of dates. There are 3 implementations available, the `CalendarAngularDateFormatter` (default) which uses the angular date pipe to format dates, the `CalendarNativeDateFormatter` which will use the <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to format dates, or there is the `CalendarMomentDateFormatter` which uses <a href="http://momentjs.com/" target="_blank">moment</a>.
     *
     * If you wish, you may override any of the defaults via angulars DI. For example:
     *
     * ```typescript
     * import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
     * import { formatDate } from '\@angular/common';
     *
     * class CustomDateFormatter extends CalendarDateFormatter {
     *
     *   public monthViewColumnHeader({date, locale}: DateFormatterParams): string {
     *     return formatDate(date, 'EEE', locale); // use short week days
     *   }
     *
     * }
     *
     * // in your component that uses the calendar
     * providers: [{
     *   provide: CalendarDateFormatter,
     *   useClass: CustomDateFormatter
     * }]
     * ```
     */
    var CalendarDateFormatter = /** @class */ (function (_super) {
        __extends(CalendarDateFormatter, _super);
        function CalendarDateFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CalendarDateFormatter.decorators = [
            { type: core.Injectable }
        ];
        return CalendarDateFormatter;
    }(CalendarAngularDateFormatter));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This pipe is primarily for rendering the current view title. Example usage:
     * ```typescript
     * // where `viewDate` is a `Date` and view is `'month' | 'week' | 'day'`
     * {{ viewDate | calendarDate:(view + 'ViewTitle'):'en' }}
     * ```
     */
    var CalendarDatePipe = /** @class */ (function () {
        function CalendarDatePipe(dateFormatter, locale) {
            this.dateFormatter = dateFormatter;
            this.locale = locale;
        }
        /**
         * @param {?} date
         * @param {?} method
         * @param {?=} locale
         * @param {?=} weekStartsOn
         * @param {?=} excludeDays
         * @param {?=} daysInWeek
         * @return {?}
         */
        CalendarDatePipe.prototype.transform = /**
         * @param {?} date
         * @param {?} method
         * @param {?=} locale
         * @param {?=} weekStartsOn
         * @param {?=} excludeDays
         * @param {?=} daysInWeek
         * @return {?}
         */
            function (date, method, locale, weekStartsOn, excludeDays, daysInWeek) {
                if (locale === void 0) {
                    locale = this.locale;
                }
                if (weekStartsOn === void 0) {
                    weekStartsOn = 0;
                }
                if (excludeDays === void 0) {
                    excludeDays = [];
                }
                return this.dateFormatter[method]({
                    date: date,
                    locale: locale,
                    weekStartsOn: weekStartsOn,
                    excludeDays: excludeDays,
                    daysInWeek: daysInWeek
                });
            };
        CalendarDatePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'calendarDate'
                    },] }
        ];
        /** @nocollapse */
        CalendarDatePipe.ctorParameters = function () {
            return [
                { type: CalendarDateFormatter },
                { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] }
            ];
        };
        return CalendarDatePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
     *
     * ```typescript
     * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
     *
     * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
     *
     *   month(event: CalendarEvent): string {
     *     return `Custom prefix: ${event.title}`;
     *   }
     *
     * }
     *
     * // in your component
     * providers: [{
     *  provide: CalendarEventTitleFormatter,
     *  useClass: CustomEventTitleFormatter
     * }]
     * ```
     */
    var /**
     * This class is responsible for displaying all event titles within the calendar. You may override any of its methods via angulars DI to suit your requirements. For example:
     *
     * ```typescript
     * import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
     *
     * class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
     *
     *   month(event: CalendarEvent): string {
     *     return `Custom prefix: ${event.title}`;
     *   }
     *
     * }
     *
     * // in your component
     * providers: [{
     *  provide: CalendarEventTitleFormatter,
     *  useClass: CustomEventTitleFormatter
     * }]
     * ```
     */ CalendarEventTitleFormatter = /** @class */ (function () {
        function CalendarEventTitleFormatter() {
        }
        /**
         * The month view event title.
         */
        /**
         * The month view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.month = /**
         * The month view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.monthTooltip = /**
         * The month view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        /**
         * The week view event title.
         */
        /**
         * The week view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.week = /**
         * The week view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.weekTooltip = /**
         * The week view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        /**
         * The day view event title.
         */
        /**
         * The day view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.day = /**
         * The day view event title.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         */
        /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
        CalendarEventTitleFormatter.prototype.dayTooltip = /**
         * The day view event tooltip. Return a falsey value from this to disable the tooltip.
         * @param {?} event
         * @param {?} title
         * @return {?}
         */
            function (event, title) {
                return event.title;
            };
        return CalendarEventTitleFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarEventTitlePipe = /** @class */ (function () {
        function CalendarEventTitlePipe(calendarEventTitle) {
            this.calendarEventTitle = calendarEventTitle;
        }
        /**
         * @param {?} title
         * @param {?} titleType
         * @param {?} event
         * @return {?}
         */
        CalendarEventTitlePipe.prototype.transform = /**
         * @param {?} title
         * @param {?} titleType
         * @param {?} event
         * @return {?}
         */
            function (title, titleType, event) {
                return this.calendarEventTitle[titleType](event, title);
            };
        CalendarEventTitlePipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'calendarEventTitle'
                    },] }
        ];
        /** @nocollapse */
        CalendarEventTitlePipe.ctorParameters = function () {
            return [
                { type: CalendarEventTitleFormatter }
            ];
        };
        return CalendarEventTitlePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var clickElements = new Set();
    var ClickDirective = /** @class */ (function () {
        function ClickDirective(renderer, elm, document) {
            this.renderer = renderer;
            this.elm = elm;
            this.document = document;
            this.click = new core.EventEmitter(); // tslint:disable-line
        }
        /**
         * @return {?}
         */
        ClickDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                clickElements.add(this.elm.nativeElement);
                /** @type {?} */
                var eventName = typeof window !== 'undefined' && typeof window['Hammer'] !== 'undefined'
                    ? 'tap'
                    : 'click';
                this.removeListener = this.renderer.listen(this.elm.nativeElement, eventName, function (event) {
                    // prevent child click events from firing on parent elements that also have click events
                    /** @type {?} */
                    var nearestClickableParent = event.target;
                    while (!clickElements.has(nearestClickableParent) &&
                        nearestClickableParent !== _this.document.body) {
                        nearestClickableParent = nearestClickableParent.parentElement;
                    }
                    /** @type {?} */
                    var isThisClickableElement = _this.elm.nativeElement === nearestClickableParent;
                    if (isThisClickableElement) {
                        _this.click.next(event);
                    }
                });
            };
        /**
         * @return {?}
         */
        ClickDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.removeListener();
                clickElements.delete(this.elm.nativeElement);
            };
        ClickDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mwlClick]'
                    },] }
        ];
        /** @nocollapse */
        ClickDirective.ctorParameters = function () {
            return [
                { type: core.Renderer2 },
                { type: core.ElementRef },
                { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
            ];
        };
        ClickDirective.propDecorators = {
            click: [{ type: core.Output, args: ['mwlClick',] }]
        };
        return ClickDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarUtils = /** @class */ (function () {
        function CalendarUtils(dateAdapter) {
            this.dateAdapter = dateAdapter;
        }
        /**
         * @param {?} args
         * @return {?}
         */
        CalendarUtils.prototype.getMonthView = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                return calendarUtils.getMonthView(this.dateAdapter, args);
            };
        /**
         * @param {?} args
         * @return {?}
         */
        CalendarUtils.prototype.getWeekViewHeader = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                return calendarUtils.getWeekViewHeader(this.dateAdapter, args);
            };
        /**
         * @param {?} args
         * @return {?}
         */
        CalendarUtils.prototype.getWeekView = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                return calendarUtils.getWeekView(this.dateAdapter, args);
            };
        /**
         * @param {?} args
         * @return {?}
         */
        CalendarUtils.prototype.getDayView = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                return calendarUtils.getDayView(this.dateAdapter, args);
            };
        /**
         * @param {?} args
         * @return {?}
         */
        CalendarUtils.prototype.getDayViewHourGrid = /**
         * @param {?} args
         * @return {?}
         */
            function (args) {
                return calendarUtils.getDayViewHourGrid(this.dateAdapter, args);
            };
        CalendarUtils.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CalendarUtils.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        return CalendarUtils;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MOMENT = new core.InjectionToken('Moment');
    /**
     * This will use <a href="http://momentjs.com/" target="_blank">moment</a> to do all date formatting. To use this class:
     *
     * ```typescript
     * import { CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
     * import moment from 'moment';
     *
     * // in your component
     * provide: [{
     *   provide: MOMENT, useValue: moment
     * }, {
     *   provide: CalendarDateFormatter, useClass: CalendarMomentDateFormatter
     * }]
     *
     * ```
     */
    var CalendarMomentDateFormatter = /** @class */ (function () {
        /**
         * @hidden
         */
        function CalendarMomentDateFormatter(moment, dateAdapter) {
            this.moment = moment;
            this.dateAdapter = dateAdapter;
        }
        /**
         * The month view header week day labels
         */
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd');
            };
        /**
         * The month view cell day number
         */
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('D');
            };
        /**
         * The month view title
         */
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('MMMM YYYY');
            };
        /**
         * The week view header week day labels
         */
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd');
            };
        /**
         * The week view sub header day and month labels
         */
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('MMM D');
            };
        /**
         * The week view title
         */
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var _this = this;
                var date = _a.date, locale = _a.locale, weekStartsOn = _a.weekStartsOn, excludeDays = _a.excludeDays, daysInWeek = _a.daysInWeek;
                var _b = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
                /** @type {?} */
                var format = function (dateToFormat, showYear) {
                    return _this.moment(dateToFormat)
                        .locale(locale)
                        .format('MMM D' + (showYear ? ', YYYY' : ''));
                };
                return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
            };
        /**
         * The time formatting down the left hand side of the week view
         */
        /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.weekViewHour = /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('ha');
            };
        /**
         * The time formatting down the left hand side of the day view
         */
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('ha');
            };
        /**
         * The day view title
         */
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarMomentDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return this.moment(date)
                    .locale(locale)
                    .format('dddd, D MMMM, YYYY');
            };
        CalendarMomentDateFormatter.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CalendarMomentDateFormatter.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [MOMENT,] }] },
                { type: DateAdapter }
            ];
        };
        return CalendarMomentDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This will use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Intl" target="_blank">Intl</a> API to do all date formatting.
     *
     * You will need to include a <a href="https://github.com/andyearnshaw/Intl.js/">polyfill</a> for older browsers.
     */
    var CalendarNativeDateFormatter = /** @class */ (function () {
        function CalendarNativeDateFormatter(dateAdapter) {
            this.dateAdapter = dateAdapter;
        }
        /**
         * The month view header week day labels
         */
        /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewColumnHeader = /**
         * The month view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
            };
        /**
         * The month view cell day number
         */
        /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewDayNumber = /**
         * The month view cell day number
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date);
            };
        /**
         * The month view title
         */
        /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.monthViewTitle = /**
         * The month view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    year: 'numeric',
                    month: 'long'
                }).format(date);
            };
        /**
         * The week view header week day labels
         */
        /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewColumnHeader = /**
         * The week view header week day labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
            };
        /**
         * The week view sub header day and month labels
         */
        /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewColumnSubHeader = /**
         * The week view sub header day and month labels
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    day: 'numeric',
                    month: 'short'
                }).format(date);
            };
        /**
         * The week view title
         */
        /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewTitle = /**
         * The week view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale, weekStartsOn = _a.weekStartsOn, excludeDays = _a.excludeDays, daysInWeek = _a.daysInWeek;
                var _b = getWeekViewPeriod(this.dateAdapter, date, weekStartsOn, excludeDays, daysInWeek), viewStart = _b.viewStart, viewEnd = _b.viewEnd;
                /** @type {?} */
                var format = function (dateToFormat, showYear) {
                    return new Intl.DateTimeFormat(locale, {
                        day: 'numeric',
                        month: 'short',
                        year: showYear ? 'numeric' : undefined
                    }).format(dateToFormat);
                };
                return format(viewStart, viewStart.getUTCFullYear() !== viewEnd.getUTCFullYear()) + " - " + format(viewEnd, true);
            };
        /**
         * The time formatting down the left hand side of the week view
         */
        /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.weekViewHour = /**
         * The time formatting down the left hand side of the week view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
            };
        /**
         * The time formatting down the left hand side of the day view
         */
        /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.dayViewHour = /**
         * The time formatting down the left hand side of the day view
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, { hour: 'numeric' }).format(date);
            };
        /**
         * The day view title
         */
        /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
        CalendarNativeDateFormatter.prototype.dayViewTitle = /**
         * The day view title
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var date = _a.date, locale = _a.locale;
                return new Intl.DateTimeFormat(locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    weekday: 'long'
                }).format(date);
            };
        CalendarNativeDateFormatter.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        CalendarNativeDateFormatter.ctorParameters = function () {
            return [
                { type: DateAdapter }
            ];
        };
        return CalendarNativeDateFormatter;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var CalendarEventTimesChangedEventType = {
        Drag: 'drag',
        Drop: 'drop',
        Resize: 'resize',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Import this module to if you're just using a singular view and want to save on bundle size. Example usage:
     *
     * ```typescript
     * import { CalendarCommonModule, CalendarMonthModule } from 'angular-calendar';
     *
     * \@NgModule({
     *   imports: [
     *     CalendarCommonModule.forRoot(),
     *     CalendarMonthModule
     *   ]
     * })
     * class MyModule {}
     * ```
     *
     */
    var CalendarCommonModule = /** @class */ (function () {
        function CalendarCommonModule() {
        }
        /**
         * @param {?} dateAdapter
         * @param {?=} config
         * @return {?}
         */
        CalendarCommonModule.forRoot = /**
         * @param {?} dateAdapter
         * @param {?=} config
         * @return {?}
         */
            function (dateAdapter, config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: CalendarCommonModule,
                    providers: [
                        dateAdapter,
                        config.eventTitleFormatter || CalendarEventTitleFormatter,
                        config.dateFormatter || CalendarDateFormatter,
                        config.utils || CalendarUtils
                    ]
                };
            };
        CalendarCommonModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            CalendarEventActionsComponent,
                            CalendarEventTitleComponent,
                            CalendarTooltipWindowComponent,
                            CalendarTooltipDirective,
                            CalendarPreviousViewDirective,
                            CalendarNextViewDirective,
                            CalendarTodayDirective,
                            CalendarDatePipe,
                            CalendarEventTitlePipe,
                            ClickDirective
                        ],
                        imports: [common.CommonModule],
                        exports: [
                            CalendarEventActionsComponent,
                            CalendarEventTitleComponent,
                            CalendarTooltipWindowComponent,
                            CalendarTooltipDirective,
                            CalendarPreviousViewDirective,
                            CalendarNextViewDirective,
                            CalendarTodayDirective,
                            CalendarDatePipe,
                            CalendarEventTitlePipe,
                            ClickDirective
                        ],
                        entryComponents: [CalendarTooltipWindowComponent]
                    },] }
        ];
        return CalendarCommonModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
    var CalendarMonthViewComponent = /** @class */ (function () {
        /**
         * @hidden
         */
        function CalendarMonthViewComponent(cdr, utils, locale, dateAdapter) {
            var _this = this;
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
            this.beforeViewRender = new core.EventEmitter();
            /**
             * Called when the day cell is clicked
             */
            this.dayClicked = new core.EventEmitter();
            /**
             * Called when the event title is clicked
             */
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when a header week day is clicked. Returns ISO day number.
             */
            this.columnHeaderClicked = new core.EventEmitter();
            /**
             * Called when an event is dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * @hidden
             */
            this.trackByRowOffset = function (index, offset) {
                return _this.view.days
                    .slice(offset, _this.view.totalDaysVisibleInWeek)
                    .map(function (day) { return day.date.toISOString(); })
                    .join('-');
            };
            /**
             * @hidden
             */
            this.trackByDate = function (index, day) { return day.date.toISOString(); };
            this.locale = locale;
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnInit = /**
         * @hidden
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.refresh) {
                    this.refreshSubscription = this.refresh.subscribe(function () {
                        _this.refreshAll();
                        _this.cdr.markForCheck();
                    });
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnChanges = /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                /** @type {?} */
                var refreshHeader = changes.viewDate || changes.excludeDays || changes.weekendDays;
                /** @type {?} */
                var refreshBody = changes.viewDate ||
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
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.ngOnDestroy = /**
         * @hidden
         * @return {?}
         */
            function () {
                if (this.refreshSubscription) {
                    this.refreshSubscription.unsubscribe();
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} event
         * @param {?} isHighlighted
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.toggleDayHighlight = /**
         * @hidden
         * @param {?} event
         * @param {?} isHighlighted
         * @return {?}
         */
            function (event, isHighlighted) {
                this.view.days.forEach(function (day) {
                    if (isHighlighted && day.events.indexOf(event) > -1) {
                        day.backgroundColor =
                            (event.color && event.color.secondary) || '#D1E8FF';
                    }
                    else {
                        delete day.backgroundColor;
                    }
                });
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} droppedOn
         * @param {?} event
         * @param {?=} draggedFrom
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.eventDropped = /**
         * @hidden
         * @param {?} droppedOn
         * @param {?} event
         * @param {?=} draggedFrom
         * @return {?}
         */
            function (droppedOn, event, draggedFrom) {
                if (droppedOn !== draggedFrom) {
                    /** @type {?} */
                    var year = this.dateAdapter.getYear(droppedOn.date);
                    /** @type {?} */
                    var month = this.dateAdapter.getMonth(droppedOn.date);
                    /** @type {?} */
                    var date = this.dateAdapter.getDate(droppedOn.date);
                    /** @type {?} */
                    var newStart = this.dateAdapter.setDate(this.dateAdapter.setMonth(this.dateAdapter.setYear(event.start, year), month), date);
                    /** @type {?} */
                    var newEnd = void 0;
                    if (event.end) {
                        /** @type {?} */
                        var secondsDiff = this.dateAdapter.differenceInSeconds(newStart, event.start);
                        newEnd = this.dateAdapter.addSeconds(event.end, secondsDiff);
                    }
                    this.eventTimesChanged.emit({
                        event: event,
                        newStart: newStart,
                        newEnd: newEnd,
                        day: droppedOn,
                        type: CalendarEventTimesChangedEventType.Drop
                    });
                }
            };
        /**
         * @private
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshHeader = /**
         * @private
         * @return {?}
         */
            function () {
                this.columnHeaders = this.utils.getWeekViewHeader({
                    viewDate: this.viewDate,
                    weekStartsOn: this.weekStartsOn,
                    excluded: this.excludeDays,
                    weekendDays: this.weekendDays
                });
            };
        /**
         * @private
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshBody = /**
         * @private
         * @return {?}
         */
            function () {
                this.view = this.utils.getMonthView({
                    events: this.events,
                    viewDate: this.viewDate,
                    weekStartsOn: this.weekStartsOn,
                    excluded: this.excludeDays,
                    weekendDays: this.weekendDays
                });
            };
        /**
         * @private
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.checkActiveDayIsOpen = /**
         * @private
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.activeDayIsOpen === true) {
                    /** @type {?} */
                    var activeDay_1 = this.activeDay || this.viewDate;
                    this.openDay = this.view.days.find(function (day) {
                        return _this.dateAdapter.isSameDay(day.date, activeDay_1);
                    });
                    /** @type {?} */
                    var index = this.view.days.indexOf(this.openDay);
                    this.openRowIndex =
                        Math.floor(index / this.view.totalDaysVisibleInWeek) *
                            this.view.totalDaysVisibleInWeek;
                }
                else {
                    this.openRowIndex = null;
                    this.openDay = null;
                }
            };
        /**
         * @private
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.refreshAll = /**
         * @private
         * @return {?}
         */
            function () {
                this.refreshHeader();
                this.refreshBody();
                this.emitBeforeViewRender();
                this.checkActiveDayIsOpen();
            };
        /**
         * @private
         * @return {?}
         */
        CalendarMonthViewComponent.prototype.emitBeforeViewRender = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.columnHeaders && this.view) {
                    this.beforeViewRender.emit({
                        header: this.columnHeaders,
                        body: this.view.days,
                        period: this.view.period
                    });
                }
            };
        CalendarMonthViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-month-view',
                        template: "\n    <div class=\"cal-month-view\">\n      <mwl-calendar-month-view-header\n        [days]=\"columnHeaders\"\n        [locale]=\"locale\"\n        (columnHeaderClicked)=\"columnHeaderClicked.emit($event)\"\n        [customTemplate]=\"headerTemplate\"\n      >\n        >\n      </mwl-calendar-month-view-header>\n      <div class=\"cal-days\">\n        <div\n          *ngFor=\"let rowIndex of view.rowOffsets; trackBy: trackByRowOffset\"\n        >\n          <div class=\"cal-cell-row\">\n            <mwl-calendar-month-cell\n              *ngFor=\"\n                let day of (view.days\n                  | slice: rowIndex:rowIndex + view.totalDaysVisibleInWeek);\n                trackBy: trackByDate\n              \"\n              [ngClass]=\"day?.cssClass\"\n              [day]=\"day\"\n              [openDay]=\"openDay\"\n              [locale]=\"locale\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"cellTemplate\"\n              (mwlClick)=\"dayClicked.emit({ day: day })\"\n              (highlightDay)=\"toggleDayHighlight($event.event, true)\"\n              (unhighlightDay)=\"toggleDayHighlight($event.event, false)\"\n              mwlDroppable\n              dragOverClass=\"cal-drag-over\"\n              (drop)=\"\n                eventDropped(\n                  day,\n                  $event.dropData.event,\n                  $event.dropData.draggedFrom\n                )\n              \"\n              (eventClicked)=\"eventClicked.emit({ event: $event.event })\"\n            >\n            </mwl-calendar-month-cell>\n          </div>\n          <mwl-calendar-open-day-events\n            [isOpen]=\"openRowIndex === rowIndex\"\n            [events]=\"openDay?.events\"\n            [customTemplate]=\"openDayEventsTemplate\"\n            [eventTitleTemplate]=\"eventTitleTemplate\"\n            [eventActionsTemplate]=\"eventActionsTemplate\"\n            (eventClicked)=\"eventClicked.emit({ event: $event.event })\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            (drop)=\"\n              eventDropped(\n                openDay,\n                $event.dropData.event,\n                $event.dropData.draggedFrom\n              )\n            \"\n          >\n          </mwl-calendar-open-day-events>\n        </div>\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        CalendarMonthViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: CalendarUtils },
                { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] },
                { type: DateAdapter }
            ];
        };
        CalendarMonthViewComponent.propDecorators = {
            viewDate: [{ type: core.Input }],
            events: [{ type: core.Input }],
            excludeDays: [{ type: core.Input }],
            activeDayIsOpen: [{ type: core.Input }],
            activeDay: [{ type: core.Input }],
            refresh: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            weekStartsOn: [{ type: core.Input }],
            headerTemplate: [{ type: core.Input }],
            cellTemplate: [{ type: core.Input }],
            openDayEventsTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            weekendDays: [{ type: core.Input }],
            beforeViewRender: [{ type: core.Output }],
            dayClicked: [{ type: core.Output }],
            eventClicked: [{ type: core.Output }],
            columnHeaderClicked: [{ type: core.Output }],
            eventTimesChanged: [{ type: core.Output }]
        };
        return CalendarMonthViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarMonthViewHeaderComponent = /** @class */ (function () {
        function CalendarMonthViewHeaderComponent() {
            this.columnHeaderClicked = new core.EventEmitter();
            this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        }
        CalendarMonthViewHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-month-view-header',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-trackByWeekDayHeaderDate=\"trackByWeekDayHeaderDate\"\n    >\n      <div class=\"cal-cell-row cal-header\">\n        <div\n          class=\"cal-cell\"\n          *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          (click)=\"columnHeaderClicked.emit(day.day)\"\n          [ngClass]=\"day.cssClass\"\n        >\n          {{ day.date | calendarDate: 'monthViewColumnHeader':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        days: days,\n        locale: locale,\n        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarMonthViewHeaderComponent.propDecorators = {
            days: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            columnHeaderClicked: [{ type: core.Output }]
        };
        return CalendarMonthViewHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarMonthCellComponent = /** @class */ (function () {
        function CalendarMonthCellComponent() {
            this.highlightDay = new core.EventEmitter();
            this.unhighlightDay = new core.EventEmitter();
            this.eventClicked = new core.EventEmitter();
            this.trackByEventId = trackByEventId;
        }
        CalendarMonthCellComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-month-cell',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-day=\"day\"\n      let-openDay=\"openDay\"\n      let-locale=\"locale\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-highlightDay=\"highlightDay\"\n      let-unhighlightDay=\"unhighlightDay\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDelay=\"tooltipDelay\"\n      let-trackByEventId=\"trackByEventId\"\n    >\n      <div class=\"cal-cell-top\">\n        <span class=\"cal-day-badge\" *ngIf=\"day.badgeTotal > 0\">{{\n          day.badgeTotal\n        }}</span>\n        <span class=\"cal-day-number\">{{\n          day.date | calendarDate: 'monthViewDayNumber':locale\n        }}</span>\n      </div>\n      <div class=\"cal-events\" *ngIf=\"day.events.length > 0\">\n        <div\n          class=\"cal-event\"\n          *ngFor=\"let event of day.events; trackBy: trackByEventId\"\n          [style.backgroundColor]=\"event.color?.primary\"\n          [ngClass]=\"event?.cssClass\"\n          (mouseenter)=\"highlightDay.emit({ event: event })\"\n          (mouseleave)=\"unhighlightDay.emit({ event: event })\"\n          [mwlCalendarTooltip]=\"\n            event.title | calendarEventTitle: 'monthTooltip':event\n          \"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipEvent]=\"event\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, draggedFrom: day }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n          (mwlClick)=\"eventClicked.emit({ event: event })\"\n        ></div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        day: day,\n        openDay: openDay,\n        locale: locale,\n        tooltipPlacement: tooltipPlacement,\n        highlightDay: highlightDay,\n        unhighlightDay: unhighlightDay,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDelay: tooltipDelay,\n        trackByEventId: trackByEventId\n      }\"\n    >\n    </ng-template>\n  ",
                        host: {
                            class: 'cal-cell cal-day-cell',
                            '[class.cal-past]': 'day.isPast',
                            '[class.cal-today]': 'day.isToday',
                            '[class.cal-future]': 'day.isFuture',
                            '[class.cal-weekend]': 'day.isWeekend',
                            '[class.cal-in-month]': 'day.inMonth',
                            '[class.cal-out-month]': '!day.inMonth',
                            '[class.cal-has-events]': 'day.events.length > 0',
                            '[class.cal-open]': 'day === openDay',
                            '[class.cal-event-highlight]': '!!day.backgroundColor',
                            '[style.backgroundColor]': 'day.backgroundColor'
                        }
                    }] }
        ];
        CalendarMonthCellComponent.propDecorators = {
            day: [{ type: core.Input }],
            openDay: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            highlightDay: [{ type: core.Output }],
            unhighlightDay: [{ type: core.Output }],
            eventClicked: [{ type: core.Output }]
        };
        return CalendarMonthCellComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var collapseAnimation = animations.trigger('collapse', [
        animations.transition('void => *', [
            animations.style({ height: 0, overflow: 'hidden' }),
            animations.animate('150ms', animations.style({ height: '*' }))
        ]),
        animations.transition('* => void', [
            animations.style({ height: '*', overflow: 'hidden' }),
            animations.animate('150ms', animations.style({ height: 0 }))
        ])
    ]);
    var CalendarOpenDayEventsComponent = /** @class */ (function () {
        function CalendarOpenDayEventsComponent() {
            this.isOpen = false;
            this.eventClicked = new core.EventEmitter();
            this.trackByEventId = trackByEventId;
        }
        CalendarOpenDayEventsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-open-day-events',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-events=\"events\"\n      let-eventClicked=\"eventClicked\"\n      let-isOpen=\"isOpen\"\n      let-trackByEventId=\"trackByEventId\"\n    >\n      <div class=\"cal-open-day-events\" [@collapse] *ngIf=\"isOpen\">\n        <div\n          *ngFor=\"let event of events; trackBy: trackByEventId\"\n          [ngClass]=\"event?.cssClass\"\n          mwlDraggable\n          [class.cal-draggable]=\"event.draggable\"\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event }\"\n          [dragAxis]=\"{ x: event.draggable, y: event.draggable }\"\n        >\n          <span\n            class=\"cal-event\"\n            [style.backgroundColor]=\"event.color?.primary\"\n          >\n          </span>\n          &ngsp;\n          <mwl-calendar-event-title\n            [event]=\"event\"\n            [customTemplate]=\"eventTitleTemplate\"\n            view=\"month\"\n            (mwlClick)=\"eventClicked.emit({ event: event })\"\n          >\n          </mwl-calendar-event-title>\n          &ngsp;\n          <mwl-calendar-event-actions\n            [event]=\"event\"\n            [customTemplate]=\"eventActionsTemplate\"\n          >\n          </mwl-calendar-event-actions>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        events: events,\n        eventClicked: eventClicked,\n        isOpen: isOpen,\n        trackByEventId: trackByEventId\n      }\"\n    >\n    </ng-template>\n  ",
                        animations: [collapseAnimation]
                    }] }
        ];
        CalendarOpenDayEventsComponent.propDecorators = {
            isOpen: [{ type: core.Input }],
            events: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            eventClicked: [{ type: core.Output }]
        };
        return CalendarOpenDayEventsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarMonthModule = /** @class */ (function () {
        function CalendarMonthModule() {
        }
        CalendarMonthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, angularDraggableDroppable.DragAndDropModule, CalendarCommonModule],
                        declarations: [
                            CalendarMonthViewComponent,
                            CalendarMonthCellComponent,
                            CalendarOpenDayEventsComponent,
                            CalendarMonthViewHeaderComponent
                        ],
                        exports: [
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarMonthViewComponent,
                            CalendarMonthCellComponent,
                            CalendarOpenDayEventsComponent,
                            CalendarMonthViewHeaderComponent
                        ]
                    },] }
        ];
        return CalendarMonthModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarResizeHelper = /** @class */ (function () {
        function CalendarResizeHelper(resizeContainerElement, minWidth) {
            this.resizeContainerElement = resizeContainerElement;
            this.minWidth = minWidth;
        }
        /**
         * @param {?} __0
         * @return {?}
         */
        CalendarResizeHelper.prototype.validateResize = /**
         * @param {?} __0
         * @return {?}
         */
            function (_a) {
                var rectangle = _a.rectangle;
                if (this.minWidth &&
                    Math.ceil(rectangle.width) < Math.ceil(this.minWidth)) {
                    return false;
                }
                return isInside(this.resizeContainerElement.getBoundingClientRect(), rectangle);
            };
        return CalendarResizeHelper;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Shows all events on a given week. Example usage:
     *
     * ```typescript
     * <mwl-calendar-week-view
     *  [viewDate]="viewDate"
     *  [events]="events">
     * </mwl-calendar-week-view>
     * ```
     */
    var CalendarWeekViewComponent = /** @class */ (function () {
        /**
         * @hidden
         */
        function CalendarWeekViewComponent(cdr, utils, locale, dateAdapter) {
            this.cdr = cdr;
            this.utils = utils;
            this.dateAdapter = dateAdapter;
            /**
             * An array of events to display on view
             * The schema is available here: https://github.com/mattlewis92/calendar-utils/blob/c51689985f59a271940e30bc4e2c4e1fee3fcb5c/src/calendarUtils.ts#L49-L63
             */
            this.events = [];
            /**
             * An array of day indexes (0 = sunday, 1 = monday etc) that will be hidden on the view
             */
            this.excludeDays = [];
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
             * The precision to display events.
             * `days` will round event start and end dates to the nearest day and `minutes` will not do this rounding
             */
            this.precision = 'days';
            /**
             * Whether to snap events to a grid when dragging
             */
            this.snapDraggedEvents = true;
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
             * Called when a header week day is clicked. Adding a `cssClass` property on `$event.day` will add that class to the header element
             */
            this.dayHeaderClicked = new core.EventEmitter();
            /**
             * Called when the event title is clicked
             */
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when an event is resized or dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * An output that will be called before the view is rendered for the current week.
             * If you add the `cssClass` property to a day in the header it will add that class to the cell element in the template
             */
            this.beforeViewRender = new core.EventEmitter();
            /**
             * Called when an hour segment is clicked
             */
            this.hourSegmentClicked = new core.EventEmitter();
            /**
             * @hidden
             */
            this.allDayEventResizes = new Map();
            /**
             * @hidden
             */
            this.timeEventResizes = new Map();
            /**
             * @hidden
             */
            this.eventDragEnter = 0;
            /**
             * @hidden
             */
            this.dragActive = false;
            /**
             * @hidden
             */
            this.dragAlreadyMoved = false;
            /**
             * @hidden
             */
            this.calendarId = Symbol('angular calendar week view id');
            /**
             * @hidden
             */
            this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
            /**
             * @hidden
             */
            this.trackByHourSegment = trackByHourSegment;
            /**
             * @hidden
             */
            this.trackByHour = trackByHour;
            /**
             * @hidden
             */
            this.trackByDayOrWeekEvent = trackByDayOrWeekEvent;
            /**
             * @hidden
             */
            this.trackByHourColumn = function (index, column) {
                return column.hours[0] ? column.hours[0].segments[0].date.toISOString() : column;
            };
            /**
             * @hidden
             */
            this.trackById = function (index, row) { return row.id; };
            this.locale = locale;
        }
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnInit = /**
         * @hidden
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.refresh) {
                    this.refreshSubscription = this.refresh.subscribe(function () {
                        _this.refreshAll();
                        _this.cdr.markForCheck();
                    });
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnChanges = /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                /** @type {?} */
                var refreshHeader = changes.viewDate ||
                    changes.excludeDays ||
                    changes.weekendDays ||
                    changes.daysInWeek;
                /** @type {?} */
                var refreshBody = changes.viewDate ||
                    changes.dayStartHour ||
                    changes.dayStartMinute ||
                    changes.dayEndHour ||
                    changes.dayEndMinute ||
                    changes.hourSegments ||
                    changes.weekStartsOn ||
                    changes.weekendDays ||
                    changes.excludeDays ||
                    changes.hourSegmentHeight ||
                    changes.events ||
                    changes.daysInWeek;
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
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.ngOnDestroy = /**
         * @hidden
         * @return {?}
         */
            function () {
                if (this.refreshSubscription) {
                    this.refreshSubscription.unsubscribe();
                }
            };
        /**
         * @private
         * @param {?} eventsContainer
         * @param {?=} minWidth
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.resizeStarted = /**
         * @private
         * @param {?} eventsContainer
         * @param {?=} minWidth
         * @return {?}
         */
            function (eventsContainer, minWidth) {
                this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
                /** @type {?} */
                var resizeHelper = new CalendarResizeHelper(eventsContainer, minWidth);
                this.validateResize = function (_a) {
                    var rectangle = _a.rectangle;
                    return resizeHelper.validateResize({ rectangle: rectangle });
                };
                this.cdr.markForCheck();
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} eventsContainer
         * @param {?} timeEvent
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.timeEventResizeStarted = /**
         * @hidden
         * @param {?} eventsContainer
         * @param {?} timeEvent
         * @param {?} resizeEvent
         * @return {?}
         */
            function (eventsContainer, timeEvent, resizeEvent) {
                this.timeEventResizes.set(timeEvent.event, resizeEvent);
                this.resizeStarted(eventsContainer);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} timeEvent
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.timeEventResizing = /**
         * @hidden
         * @param {?} timeEvent
         * @param {?} resizeEvent
         * @return {?}
         */
            function (timeEvent, resizeEvent) {
                var _this = this;
                this.timeEventResizes.set(timeEvent.event, resizeEvent);
                /** @type {?} */
                var adjustedEvents = new Map();
                /** @type {?} */
                var tempEvents = __spread(this.events);
                this.timeEventResizes.forEach(function (lastResizeEvent, event) {
                    /** @type {?} */
                    var newEventDates = _this.getTimeEventResizedDates(event, lastResizeEvent);
                    /** @type {?} */
                    var adjustedEvent = __assign({}, event, newEventDates);
                    adjustedEvents.set(adjustedEvent, event);
                    /** @type {?} */
                    var eventIndex = tempEvents.indexOf(event);
                    tempEvents[eventIndex] = adjustedEvent;
                });
                this.restoreOriginalEvents(tempEvents, adjustedEvents);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} timeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.timeEventResizeEnded = /**
         * @hidden
         * @param {?} timeEvent
         * @return {?}
         */
            function (timeEvent) {
                this.view = this.getWeekView(this.events);
                /** @type {?} */
                var lastResizeEvent = this.timeEventResizes.get(timeEvent.event);
                if (lastResizeEvent) {
                    this.timeEventResizes.delete(timeEvent.event);
                    /** @type {?} */
                    var newEventDates = this.getTimeEventResizedDates(timeEvent.event, lastResizeEvent);
                    this.eventTimesChanged.emit({
                        newStart: newEventDates.start,
                        newEnd: newEventDates.end,
                        event: timeEvent.event,
                        type: CalendarEventTimesChangedEventType.Resize
                    });
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} allDayEventsContainer
         * @param {?} allDayEvent
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.allDayEventResizeStarted = /**
         * @hidden
         * @param {?} allDayEventsContainer
         * @param {?} allDayEvent
         * @param {?} resizeEvent
         * @return {?}
         */
            function (allDayEventsContainer, allDayEvent, resizeEvent) {
                this.allDayEventResizes.set(allDayEvent, {
                    originalOffset: allDayEvent.offset,
                    originalSpan: allDayEvent.span,
                    edge: typeof resizeEvent.edges.left !== 'undefined' ? 'left' : 'right'
                });
                this.resizeStarted(allDayEventsContainer, this.getDayColumnWidth(allDayEventsContainer));
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} allDayEvent
         * @param {?} resizeEvent
         * @param {?} dayWidth
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.allDayEventResizing = /**
         * @hidden
         * @param {?} allDayEvent
         * @param {?} resizeEvent
         * @param {?} dayWidth
         * @return {?}
         */
            function (allDayEvent, resizeEvent, dayWidth) {
                /** @type {?} */
                var currentResize = this.allDayEventResizes.get(allDayEvent);
                if (typeof resizeEvent.edges.left !== 'undefined') {
                    /** @type {?} */
                    var diff = Math.round(+resizeEvent.edges.left / dayWidth);
                    allDayEvent.offset = currentResize.originalOffset + diff;
                    allDayEvent.span = currentResize.originalSpan - diff;
                }
                else if (typeof resizeEvent.edges.right !== 'undefined') {
                    /** @type {?} */
                    var diff = Math.round(+resizeEvent.edges.right / dayWidth);
                    allDayEvent.span = currentResize.originalSpan + diff;
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} allDayEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.allDayEventResizeEnded = /**
         * @hidden
         * @param {?} allDayEvent
         * @return {?}
         */
            function (allDayEvent) {
                /** @type {?} */
                var currentResize = this.allDayEventResizes.get(allDayEvent);
                if (currentResize) {
                    /** @type {?} */
                    var allDayEventResizingBeforeStart = currentResize.edge === 'left';
                    /** @type {?} */
                    var daysDiff = void 0;
                    if (allDayEventResizingBeforeStart) {
                        daysDiff = allDayEvent.offset - currentResize.originalOffset;
                    }
                    else {
                        daysDiff = allDayEvent.span - currentResize.originalSpan;
                    }
                    allDayEvent.offset = currentResize.originalOffset;
                    allDayEvent.span = currentResize.originalSpan;
                    /** @type {?} */
                    var newStart = allDayEvent.event.start;
                    /** @type {?} */
                    var newEnd = allDayEvent.event.end || allDayEvent.event.start;
                    if (allDayEventResizingBeforeStart) {
                        newStart = addDaysWithExclusions(this.dateAdapter, newStart, daysDiff, this.excludeDays);
                    }
                    else {
                        newEnd = addDaysWithExclusions(this.dateAdapter, newEnd, daysDiff, this.excludeDays);
                    }
                    this.eventTimesChanged.emit({
                        newStart: newStart,
                        newEnd: newEnd,
                        event: allDayEvent.event,
                        type: CalendarEventTimesChangedEventType.Resize
                    });
                    this.allDayEventResizes.delete(allDayEvent);
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} eventRowContainer
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.getDayColumnWidth = /**
         * @hidden
         * @param {?} eventRowContainer
         * @return {?}
         */
            function (eventRowContainer) {
                return Math.floor(eventRowContainer.offsetWidth / this.days.length);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} dropEvent
         * @param {?} date
         * @param {?} allDay
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.eventDropped = /**
         * @hidden
         * @param {?} dropEvent
         * @param {?} date
         * @param {?} allDay
         * @return {?}
         */
            function (dropEvent, date, allDay) {
                if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
                    this.eventTimesChanged.emit({
                        type: CalendarEventTimesChangedEventType.Drop,
                        event: dropEvent.dropData.event,
                        newStart: date,
                        allDay: allDay
                    });
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} eventsContainer
         * @param {?} event
         * @param {?=} dayEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.dragStarted = /**
         * @hidden
         * @param {?} eventsContainer
         * @param {?} event
         * @param {?=} dayEvent
         * @return {?}
         */
            function (eventsContainer, event, dayEvent) {
                var _this = this;
                this.dayColumnWidth = this.getDayColumnWidth(eventsContainer);
                /** @type {?} */
                var dragHelper = new CalendarDragHelper(eventsContainer, event);
                this.validateDrag = function (_a) {
                    var x = _a.x, y = _a.y;
                    return _this.allDayEventResizes.size === 0 &&
                        _this.timeEventResizes.size === 0 &&
                        dragHelper.validateDrag({
                            x: x,
                            y: y,
                            snapDraggedEvents: _this.snapDraggedEvents,
                            dragAlreadyMoved: _this.dragAlreadyMoved
                        });
                };
                this.dragActive = true;
                this.dragAlreadyMoved = false;
                this.eventDragEnter = 0;
                if (!this.snapDraggedEvents && dayEvent) {
                    this.view.hourColumns.forEach(function (column) {
                        /** @type {?} */
                        var linkedEvent = column.events.find(function (columnEvent) {
                            return columnEvent.event === dayEvent.event && columnEvent !== dayEvent;
                        });
                        // hide any linked events while dragging
                        if (linkedEvent) {
                            linkedEvent.width = 0;
                            linkedEvent.height = 0;
                        }
                    });
                }
                this.cdr.markForCheck();
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} dayEvent
         * @param {?} dragEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.dragMove = /**
         * @hidden
         * @param {?} dayEvent
         * @param {?} dragEvent
         * @return {?}
         */
            function (dayEvent, dragEvent) {
                if (this.snapDraggedEvents) {
                    /** @type {?} */
                    var newEventTimes = this.getDragMovedEventTimes(dayEvent, dragEvent, this.dayColumnWidth, true);
                    /** @type {?} */
                    var originalEvent_1 = dayEvent.event;
                    /** @type {?} */
                    var adjustedEvent_1 = __assign({}, originalEvent_1, newEventTimes);
                    /** @type {?} */
                    var tempEvents = this.events.map(function (event) {
                        if (event === originalEvent_1) {
                            return adjustedEvent_1;
                        }
                        return event;
                    });
                    this.restoreOriginalEvents(tempEvents, new Map([[adjustedEvent_1, originalEvent_1]]));
                }
                this.dragAlreadyMoved = true;
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.allDayEventDragMove = /**
         * @hidden
         * @return {?}
         */
            function () {
                this.dragAlreadyMoved = true;
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} weekEvent
         * @param {?} dragEndEvent
         * @param {?} dayWidth
         * @param {?=} useY
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.dragEnded = /**
         * @hidden
         * @param {?} weekEvent
         * @param {?} dragEndEvent
         * @param {?} dayWidth
         * @param {?=} useY
         * @return {?}
         */
            function (weekEvent, dragEndEvent, dayWidth, useY) {
                if (useY === void 0) {
                    useY = false;
                }
                this.view = this.getWeekView(this.events);
                this.dragActive = false;
                var _a = this.getDragMovedEventTimes(weekEvent, dragEndEvent, dayWidth, useY), start = _a.start, end = _a.end;
                if (this.eventDragEnter > 0 &&
                    isDraggedWithinPeriod(start, end, this.view.period)) {
                    this.eventTimesChanged.emit({
                        newStart: start,
                        newEnd: end,
                        event: weekEvent.event,
                        type: CalendarEventTimesChangedEventType.Drag,
                        allDay: !useY
                    });
                }
            };
        /**
         * @private
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshHeader = /**
         * @private
         * @return {?}
         */
            function () {
                this.days = this.utils.getWeekViewHeader(__assign({ viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
            };
        /**
         * @private
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshBody = /**
         * @private
         * @return {?}
         */
            function () {
                this.view = this.getWeekView(this.events);
            };
        /**
         * @private
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.refreshAll = /**
         * @private
         * @return {?}
         */
            function () {
                this.refreshHeader();
                this.refreshBody();
                this.emitBeforeViewRender();
            };
        /**
         * @private
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.emitBeforeViewRender = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.days && this.view) {
                    this.beforeViewRender.emit(__assign({ header: this.days }, this.view));
                }
            };
        /**
         * @private
         * @param {?} events
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.getWeekView = /**
         * @private
         * @param {?} events
         * @return {?}
         */
            function (events) {
                return this.utils.getWeekView(__assign({ events: events, viewDate: this.viewDate, weekStartsOn: this.weekStartsOn, excluded: this.excludeDays, precision: this.precision, absolutePositionedEvents: true, hourSegments: this.hourSegments, dayStart: {
                        hour: this.dayStartHour,
                        minute: this.dayStartMinute
                    }, dayEnd: {
                        hour: this.dayEndHour,
                        minute: this.dayEndMinute
                    }, segmentHeight: this.hourSegmentHeight, weekendDays: this.weekendDays }, getWeekViewPeriod(this.dateAdapter, this.viewDate, this.weekStartsOn, this.excludeDays, this.daysInWeek)));
            };
        /**
         * @private
         * @param {?} weekEvent
         * @param {?} dragEndEvent
         * @param {?} dayWidth
         * @param {?} useY
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.getDragMovedEventTimes = /**
         * @private
         * @param {?} weekEvent
         * @param {?} dragEndEvent
         * @param {?} dayWidth
         * @param {?} useY
         * @return {?}
         */
            function (weekEvent, dragEndEvent, dayWidth, useY) {
                /** @type {?} */
                var daysDragged = roundToNearest(dragEndEvent.x, dayWidth) / dayWidth;
                /** @type {?} */
                var minutesMoved = useY
                    ? getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize)
                    : 0;
                /** @type {?} */
                var start = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.start, daysDragged, this.excludeDays), minutesMoved);
                /** @type {?} */
                var end;
                if (weekEvent.event.end) {
                    end = this.dateAdapter.addMinutes(addDaysWithExclusions(this.dateAdapter, weekEvent.event.end, daysDragged, this.excludeDays), minutesMoved);
                }
                return { start: start, end: end };
            };
        /**
         * @private
         * @param {?} tempEvents
         * @param {?} adjustedEvents
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.restoreOriginalEvents = /**
         * @private
         * @param {?} tempEvents
         * @param {?} adjustedEvents
         * @return {?}
         */
            function (tempEvents, adjustedEvents) {
                this.view = this.getWeekView(tempEvents);
                /** @type {?} */
                var adjustedEventsArray = tempEvents.filter(function (event) {
                    return adjustedEvents.has(event);
                });
                this.view.hourColumns.forEach(function (column) {
                    adjustedEventsArray.forEach(function (adjustedEvent) {
                        /** @type {?} */
                        var originalEvent = adjustedEvents.get(adjustedEvent);
                        /** @type {?} */
                        var existingColumnEvent = column.events.find(function (columnEvent) { return columnEvent.event === adjustedEvent; });
                        if (existingColumnEvent) {
                            // restore the original event so trackBy kicks in and the dom isn't changed
                            existingColumnEvent.event = originalEvent;
                        }
                        else {
                            // add a dummy event to the drop so if the event was removed from the original column the drag doesn't end early
                            column.events.push({
                                event: originalEvent,
                                left: 0,
                                top: 0,
                                height: 0,
                                width: 0,
                                startsBeforeDay: false,
                                endsAfterDay: false
                            });
                        }
                    });
                });
                adjustedEvents.clear();
            };
        /**
         * @private
         * @param {?} calendarEvent
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarWeekViewComponent.prototype.getTimeEventResizedDates = /**
         * @private
         * @param {?} calendarEvent
         * @param {?} resizeEvent
         * @return {?}
         */
            function (calendarEvent, resizeEvent) {
                /** @type {?} */
                var minimumEventHeight = getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight);
                /** @type {?} */
                var newEventDates = {
                    start: calendarEvent.start,
                    end: getDefaultEventEnd(this.dateAdapter, calendarEvent, minimumEventHeight)
                };
                var end = calendarEvent.end, eventWithoutEnd = __rest(calendarEvent, ["end"]);
                /** @type {?} */
                var smallestResizes = {
                    start: this.dateAdapter.addMinutes(newEventDates.end, minimumEventHeight * -1),
                    end: getDefaultEventEnd(this.dateAdapter, eventWithoutEnd, minimumEventHeight)
                };
                if (typeof resizeEvent.edges.left !== 'undefined') {
                    /** @type {?} */
                    var daysDiff = Math.round(+resizeEvent.edges.left / this.dayColumnWidth);
                    /** @type {?} */
                    var newStart = addDaysWithExclusions(this.dateAdapter, newEventDates.start, daysDiff, this.excludeDays);
                    if (newStart < smallestResizes.start) {
                        newEventDates.start = newStart;
                    }
                    else {
                        newEventDates.start = smallestResizes.start;
                    }
                }
                else if (typeof resizeEvent.edges.right !== 'undefined') {
                    /** @type {?} */
                    var daysDiff = Math.round(+resizeEvent.edges.right / this.dayColumnWidth);
                    /** @type {?} */
                    var newEnd = addDaysWithExclusions(this.dateAdapter, newEventDates.end, daysDiff, this.excludeDays);
                    if (newEnd > smallestResizes.end) {
                        newEventDates.end = newEnd;
                    }
                    else {
                        newEventDates.end = smallestResizes.end;
                    }
                }
                if (typeof resizeEvent.edges.top !== 'undefined') {
                    /** @type {?} */
                    var minutesMoved = getMinutesMoved(( /** @type {?} */(resizeEvent.edges.top)), this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
                    /** @type {?} */
                    var newStart = this.dateAdapter.addMinutes(newEventDates.start, minutesMoved);
                    if (newStart < smallestResizes.start) {
                        newEventDates.start = newStart;
                    }
                    else {
                        newEventDates.start = smallestResizes.start;
                    }
                }
                else if (typeof resizeEvent.edges.bottom !== 'undefined') {
                    /** @type {?} */
                    var minutesMoved = getMinutesMoved(( /** @type {?} */(resizeEvent.edges.bottom)), this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
                    /** @type {?} */
                    var newEnd = this.dateAdapter.addMinutes(newEventDates.end, minutesMoved);
                    if (newEnd > smallestResizes.end) {
                        newEventDates.end = newEnd;
                    }
                    else {
                        newEventDates.end = smallestResizes.end;
                    }
                }
                return newEventDates;
            };
        CalendarWeekViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view',
                        template: "\n    <div class=\"cal-week-view\">\n      <mwl-calendar-week-view-header\n        [days]=\"days\"\n        [locale]=\"locale\"\n        [customTemplate]=\"headerTemplate\"\n        (dayHeaderClicked)=\"dayHeaderClicked.emit($event)\"\n        (eventDropped)=\"\n          eventDropped({ dropData: $event }, $event.newStart, true)\n        \"\n      >\n      </mwl-calendar-week-view-header>\n      <div\n        class=\"cal-all-day-events\"\n        #allDayEventsContainer\n        *ngIf=\"view.allDayEventRows.length > 0\"\n        mwlDroppable\n        (dragEnter)=\"eventDragEnter = eventDragEnter + 1\"\n        (dragLeave)=\"eventDragEnter = eventDragEnter - 1\"\n      >\n        <div class=\"cal-day-columns\">\n          <div\n            class=\"cal-time-label-column\"\n            [ngTemplateOutlet]=\"allDayEventsLabelTemplate\"\n          ></div>\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            (drop)=\"eventDropped($event, day.date, true)\"\n          ></div>\n        </div>\n        <div\n          *ngFor=\"let eventRow of view.allDayEventRows; trackBy: trackById\"\n          #eventRowContainer\n          class=\"cal-events-row\"\n        >\n          <div\n            *ngFor=\"\n              let allDayEvent of eventRow.row;\n              trackBy: trackByDayOrWeekEvent\n            \"\n            #event\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"\n              allDayEvent.event.draggable && allDayEventResizes.size === 0\n            \"\n            [class.cal-starts-within-week]=\"!allDayEvent.startsBeforeWeek\"\n            [class.cal-ends-within-week]=\"!allDayEvent.endsAfterWeek\"\n            [ngClass]=\"allDayEvent.event?.cssClass\"\n            [style.width.%]=\"(100 / days.length) * allDayEvent.span\"\n            [style.marginLeft.%]=\"(100 / days.length) * allDayEvent.offset\"\n            mwlResizable\n            [resizeSnapGrid]=\"{ left: dayColumnWidth, right: dayColumnWidth }\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"\n              allDayEventResizeStarted(eventRowContainer, allDayEvent, $event)\n            \"\n            (resizing)=\"\n              allDayEventResizing(allDayEvent, $event, dayColumnWidth)\n            \"\n            (resizeEnd)=\"allDayEventResizeEnded(allDayEvent)\"\n            mwlDraggable\n            dragActiveClass=\"cal-drag-active\"\n            [dropData]=\"{ event: allDayEvent.event, calendarId: calendarId }\"\n            [dragAxis]=\"{\n              x: allDayEvent.event.draggable && allDayEventResizes.size === 0,\n              y:\n                !snapDraggedEvents &&\n                allDayEvent.event.draggable &&\n                allDayEventResizes.size === 0\n            }\"\n            [dragSnapGrid]=\"snapDraggedEvents ? { x: dayColumnWidth } : {}\"\n            [validateDrag]=\"validateDrag\"\n            (dragPointerDown)=\"dragStarted(eventRowContainer, event)\"\n            (dragging)=\"allDayEventDragMove()\"\n            (dragEnd)=\"dragEnded(allDayEvent, $event, dayColumnWidth)\"\n          >\n            <div\n              class=\"cal-resize-handle cal-resize-handle-before-start\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.beforeStart &&\n                !allDayEvent.startsBeforeWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ left: true }\"\n            ></div>\n            <mwl-calendar-week-view-event\n              [weekEvent]=\"allDayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              [eventActionsTemplate]=\"eventActionsTemplate\"\n              (eventClicked)=\"eventClicked.emit({ event: allDayEvent.event })\"\n            >\n            </mwl-calendar-week-view-event>\n            <div\n              class=\"cal-resize-handle cal-resize-handle-after-end\"\n              *ngIf=\"\n                allDayEvent.event?.resizable?.afterEnd &&\n                !allDayEvent.endsAfterWeek\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ right: true }\"\n            ></div>\n          </div>\n        </div>\n      </div>\n      <div\n        class=\"cal-time-events\"\n        mwlDroppable\n        (dragEnter)=\"eventDragEnter = eventDragEnter + 1\"\n        (dragLeave)=\"eventDragEnter = eventDragEnter - 1\"\n      >\n        <div class=\"cal-time-label-column\" *ngIf=\"view.hourColumns.length > 0\">\n          <div\n            *ngFor=\"\n              let hour of view.hourColumns[0].hours;\n              trackBy: trackByHour;\n              let odd = odd\n            \"\n            class=\"cal-hour\"\n            [class.cal-hour-odd]=\"odd\"\n          >\n            <mwl-calendar-week-view-hour-segment\n              *ngFor=\"let segment of hour.segments; trackBy: trackByHourSegment\"\n              [style.height.px]=\"hourSegmentHeight\"\n              [segment]=\"segment\"\n              [segmentHeight]=\"hourSegmentHeight\"\n              [locale]=\"locale\"\n              [customTemplate]=\"hourSegmentTemplate\"\n              [isTimeLabel]=\"true\"\n            >\n            </mwl-calendar-week-view-hour-segment>\n          </div>\n        </div>\n        <div\n          class=\"cal-day-columns\"\n          [class.cal-resize-active]=\"timeEventResizes.size > 0\"\n          #dayColumns\n        >\n          <div\n            class=\"cal-day-column\"\n            *ngFor=\"let column of view.hourColumns; trackBy: trackByHourColumn\"\n          >\n            <div\n              *ngFor=\"\n                let timeEvent of column.events;\n                trackBy: trackByDayOrWeekEvent\n              \"\n              #event\n              class=\"cal-event-container\"\n              [class.cal-draggable]=\"\n                timeEvent.event.draggable && timeEventResizes.size === 0\n              \"\n              [class.cal-starts-within-day]=\"!timeEvent.startsBeforeDay\"\n              [class.cal-ends-within-day]=\"!timeEvent.endsAfterDay\"\n              [ngClass]=\"timeEvent.event.cssClass\"\n              [hidden]=\"timeEvent.height === 0 && timeEvent.width === 0\"\n              [style.top.px]=\"timeEvent.top\"\n              [style.height.px]=\"timeEvent.height\"\n              [style.left.%]=\"timeEvent.left\"\n              [style.width.%]=\"timeEvent.width\"\n              mwlResizable\n              [resizeSnapGrid]=\"{\n                left: dayColumnWidth,\n                right: dayColumnWidth,\n                top: eventSnapSize || hourSegmentHeight,\n                bottom: eventSnapSize || hourSegmentHeight\n              }\"\n              [validateResize]=\"validateResize\"\n              [allowNegativeResizes]=\"true\"\n              (resizeStart)=\"\n                timeEventResizeStarted(dayColumns, timeEvent, $event)\n              \"\n              (resizing)=\"timeEventResizing(timeEvent, $event)\"\n              (resizeEnd)=\"timeEventResizeEnded(timeEvent)\"\n              mwlDraggable\n              dragActiveClass=\"cal-drag-active\"\n              [dropData]=\"{ event: timeEvent.event, calendarId: calendarId }\"\n              [dragAxis]=\"{\n                x: timeEvent.event.draggable && timeEventResizes.size === 0,\n                y: timeEvent.event.draggable && timeEventResizes.size === 0\n              }\"\n              [dragSnapGrid]=\"\n                snapDraggedEvents\n                  ? { x: dayColumnWidth, y: eventSnapSize || hourSegmentHeight }\n                  : {}\n              \"\n              [ghostDragEnabled]=\"!snapDraggedEvents\"\n              [validateDrag]=\"validateDrag\"\n              (dragPointerDown)=\"dragStarted(dayColumns, event, timeEvent)\"\n              (dragging)=\"dragMove(timeEvent, $event)\"\n              (dragEnd)=\"dragEnded(timeEvent, $event, dayColumnWidth, true)\"\n            >\n              <div\n                class=\"cal-resize-handle cal-resize-handle-before-start\"\n                *ngIf=\"\n                  timeEvent.event?.resizable?.beforeStart &&\n                  !timeEvent.startsBeforeDay\n                \"\n                mwlResizeHandle\n                [resizeEdges]=\"{\n                  left: true,\n                  top: true\n                }\"\n              ></div>\n              <mwl-calendar-week-view-event\n                [weekEvent]=\"timeEvent\"\n                [tooltipPlacement]=\"tooltipPlacement\"\n                [tooltipTemplate]=\"tooltipTemplate\"\n                [tooltipAppendToBody]=\"tooltipAppendToBody\"\n                [tooltipDisabled]=\"dragActive || timeEventResizes.size > 0\"\n                [tooltipDelay]=\"tooltipDelay\"\n                [customTemplate]=\"eventTemplate\"\n                [eventTitleTemplate]=\"eventTitleTemplate\"\n                [eventActionsTemplate]=\"eventActionsTemplate\"\n                (eventClicked)=\"eventClicked.emit({ event: timeEvent.event })\"\n              >\n              </mwl-calendar-week-view-event>\n              <div\n                class=\"cal-resize-handle cal-resize-handle-after-end\"\n                *ngIf=\"\n                  timeEvent.event?.resizable?.afterEnd &&\n                  !timeEvent.endsAfterDay\n                \"\n                mwlResizeHandle\n                [resizeEdges]=\"{\n                  right: true,\n                  bottom: true\n                }\"\n              ></div>\n            </div>\n\n            <div\n              *ngFor=\"\n                let hour of column.hours;\n                trackBy: trackByHour;\n                let odd = odd\n              \"\n              class=\"cal-hour\"\n              [class.cal-hour-odd]=\"odd\"\n            >\n              <mwl-calendar-week-view-hour-segment\n                *ngFor=\"\n                  let segment of hour.segments;\n                  trackBy: trackByHourSegment\n                \"\n                [style.height.px]=\"hourSegmentHeight\"\n                [segment]=\"segment\"\n                [segmentHeight]=\"hourSegmentHeight\"\n                [locale]=\"locale\"\n                [customTemplate]=\"hourSegmentTemplate\"\n                (mwlClick)=\"hourSegmentClicked.emit({ date: segment.date })\"\n                mwlDroppable\n                [dragOverClass]=\"\n                  !dragActive || !snapDraggedEvents ? 'cal-drag-over' : null\n                \"\n                dragActiveClass=\"cal-drag-active\"\n                (drop)=\"eventDropped($event, segment.date, false)\"\n              >\n              </mwl-calendar-week-view-hour-segment>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        CalendarWeekViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: CalendarUtils },
                { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] },
                { type: DateAdapter }
            ];
        };
        CalendarWeekViewComponent.propDecorators = {
            viewDate: [{ type: core.Input }],
            events: [{ type: core.Input }],
            excludeDays: [{ type: core.Input }],
            refresh: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            weekStartsOn: [{ type: core.Input }],
            headerTemplate: [{ type: core.Input }],
            eventTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            precision: [{ type: core.Input }],
            weekendDays: [{ type: core.Input }],
            snapDraggedEvents: [{ type: core.Input }],
            hourSegments: [{ type: core.Input }],
            hourSegmentHeight: [{ type: core.Input }],
            dayStartHour: [{ type: core.Input }],
            dayStartMinute: [{ type: core.Input }],
            dayEndHour: [{ type: core.Input }],
            dayEndMinute: [{ type: core.Input }],
            hourSegmentTemplate: [{ type: core.Input }],
            eventSnapSize: [{ type: core.Input }],
            allDayEventsLabelTemplate: [{ type: core.Input }],
            daysInWeek: [{ type: core.Input }],
            dayHeaderClicked: [{ type: core.Output }],
            eventClicked: [{ type: core.Output }],
            eventTimesChanged: [{ type: core.Output }],
            beforeViewRender: [{ type: core.Output }],
            hourSegmentClicked: [{ type: core.Output }]
        };
        return CalendarWeekViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarWeekViewHeaderComponent = /** @class */ (function () {
        function CalendarWeekViewHeaderComponent() {
            this.dayHeaderClicked = new core.EventEmitter();
            this.eventDropped = new core.EventEmitter();
            this.trackByWeekDayHeaderDate = trackByWeekDayHeaderDate;
        }
        CalendarWeekViewHeaderComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view-header',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-days=\"days\"\n      let-locale=\"locale\"\n      let-dayHeaderClicked=\"dayHeaderClicked\"\n      let-eventDropped=\"eventDropped\"\n      let-trackByWeekDayHeaderDate=\"trackByWeekDayHeaderDate\"\n    >\n      <div class=\"cal-day-headers\">\n        <div\n          class=\"cal-header\"\n          *ngFor=\"let day of days; trackBy: trackByWeekDayHeaderDate\"\n          [class.cal-past]=\"day.isPast\"\n          [class.cal-today]=\"day.isToday\"\n          [class.cal-future]=\"day.isFuture\"\n          [class.cal-weekend]=\"day.isWeekend\"\n          [ngClass]=\"day.cssClass\"\n          (mwlClick)=\"dayHeaderClicked.emit({ day: day })\"\n          mwlDroppable\n          dragOverClass=\"cal-drag-over\"\n          (drop)=\"\n            eventDropped.emit({\n              event: $event.dropData.event,\n              newStart: day.date\n            })\n          \"\n        >\n          <b>{{ day.date | calendarDate: 'weekViewColumnHeader':locale }}</b\n          ><br />\n          <span>{{\n            day.date | calendarDate: 'weekViewColumnSubHeader':locale\n          }}</span>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        days: days,\n        locale: locale,\n        dayHeaderClicked: dayHeaderClicked,\n        eventDropped: eventDropped,\n        trackByWeekDayHeaderDate: trackByWeekDayHeaderDate\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarWeekViewHeaderComponent.propDecorators = {
            days: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            dayHeaderClicked: [{ type: core.Output }],
            eventDropped: [{ type: core.Output }]
        };
        return CalendarWeekViewHeaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarWeekViewEventComponent = /** @class */ (function () {
        function CalendarWeekViewEventComponent() {
            this.eventClicked = new core.EventEmitter();
        }
        CalendarWeekViewEventComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view-event',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-weekEvent=\"weekEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDisabled=\"tooltipDisabled\"\n      let-tooltipDelay=\"tooltipDelay\"\n    >\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"weekEvent.event.color?.secondary\"\n        [style.borderColor]=\"weekEvent.event.color?.primary\"\n        [mwlCalendarTooltip]=\"\n          !tooltipDisabled\n            ? (weekEvent.event.title\n              | calendarEventTitle: 'weekTooltip':weekEvent.event)\n            : ''\n        \"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"weekEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\"\n        [tooltipDelay]=\"tooltipDelay\"\n        (mwlClick)=\"eventClicked.emit()\"\n      >\n        <mwl-calendar-event-actions\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventActionsTemplate\"\n        >\n        </mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"weekEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"week\"\n        >\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        weekEvent: weekEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDisabled: tooltipDisabled,\n        tooltipDelay: tooltipDelay\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarWeekViewEventComponent.propDecorators = {
            weekEvent: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            tooltipDisabled: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            eventClicked: [{ type: core.Output }]
        };
        return CalendarWeekViewEventComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarWeekViewHourSegmentComponent = /** @class */ (function () {
        function CalendarWeekViewHourSegmentComponent() {
        }
        CalendarWeekViewHourSegmentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-week-view-hour-segment',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\"\n      let-segmentHeight=\"segmentHeight\"\n      let-isTimeLabel=\"isTimeLabel\"\n    >\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\"\n      >\n        <div class=\"cal-time\" *ngIf=\"isTimeLabel\">\n          {{ segment.date | calendarDate: 'weekViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale,\n        segmentHeight: segmentHeight,\n        isTimeLabel: isTimeLabel\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarWeekViewHourSegmentComponent.propDecorators = {
            segment: [{ type: core.Input }],
            segmentHeight: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            isTimeLabel: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }]
        };
        return CalendarWeekViewHourSegmentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarWeekModule = /** @class */ (function () {
        function CalendarWeekModule() {
        }
        CalendarWeekModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarCommonModule
                        ],
                        declarations: [
                            CalendarWeekViewComponent,
                            CalendarWeekViewHeaderComponent,
                            CalendarWeekViewEventComponent,
                            CalendarWeekViewHourSegmentComponent
                        ],
                        exports: [
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarWeekViewComponent,
                            CalendarWeekViewHeaderComponent,
                            CalendarWeekViewEventComponent,
                            CalendarWeekViewHourSegmentComponent
                        ]
                    },] }
        ];
        return CalendarWeekModule;
    }());

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
    var CalendarDayViewComponent = /** @class */ (function () {
        /**
         * @hidden
         */
        function CalendarDayViewComponent(cdr, utils, locale, dateAdapter) {
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
            this.eventClicked = new core.EventEmitter();
            /**
             * Called when an hour segment is clicked
             */
            this.hourSegmentClicked = new core.EventEmitter();
            /**
             * Called when an event is resized or dragged and dropped
             */
            this.eventTimesChanged = new core.EventEmitter();
            /**
             * An output that will be called before the view is rendered for the current day.
             * If you add the `cssClass` property to an hour grid segment it will add that class to the hour segment in the template
             */
            this.beforeViewRender = new core.EventEmitter();
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
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarDayViewComponent.prototype.ngOnInit = /**
         * @hidden
         * @return {?}
         */
            function () {
                var _this = this;
                if (this.refresh) {
                    this.refreshSubscription = this.refresh.subscribe(function () {
                        _this.refreshAll();
                        _this.cdr.markForCheck();
                    });
                }
                this.calendarDayAutoScroll = new CalendarDayAutoScroll(this.scrollContainer);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @return {?}
         */
        CalendarDayViewComponent.prototype.ngOnDestroy = /**
         * @hidden
         * @return {?}
         */
            function () {
                if (this.refreshSubscription) {
                    this.refreshSubscription.unsubscribe();
                }
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
        CalendarDayViewComponent.prototype.ngOnChanges = /**
         * @hidden
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                /** @type {?} */
                var refreshHourGrid = changes.viewDate ||
                    changes.dayStartHour ||
                    changes.dayStartMinute ||
                    changes.dayEndHour ||
                    changes.dayEndMinute ||
                    changes.hourSegments;
                /** @type {?} */
                var refreshView = changes.viewDate ||
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
            };
        /**
         * @param {?} dropEvent
         * @param {?} date
         * @param {?} allDay
         * @return {?}
         */
        CalendarDayViewComponent.prototype.eventDropped = /**
         * @param {?} dropEvent
         * @param {?} date
         * @param {?} allDay
         * @return {?}
         */
            function (dropEvent, date, allDay) {
                if (shouldFireDroppedEvent(dropEvent, date, allDay, this.calendarId)) {
                    this.eventTimesChanged.emit({
                        type: CalendarEventTimesChangedEventType.Drop,
                        event: dropEvent.dropData.event,
                        newStart: date,
                        allDay: allDay
                    });
                }
            };
        /**
         * @param {?} event
         * @param {?} resizeEvent
         * @param {?} dayEventsContainer
         * @return {?}
         */
        CalendarDayViewComponent.prototype.resizeStarted = /**
         * @param {?} event
         * @param {?} resizeEvent
         * @param {?} dayEventsContainer
         * @return {?}
         */
            function (event, resizeEvent, dayEventsContainer) {
                this.currentResizes.set(event, {
                    originalTop: event.top,
                    originalHeight: event.height,
                    edge: typeof resizeEvent.edges.top !== 'undefined' ? 'top' : 'bottom'
                });
                /** @type {?} */
                var resizeHelper = new CalendarResizeHelper(dayEventsContainer);
                this.validateResize = function (_a) {
                    var rectangle = _a.rectangle;
                    return resizeHelper.validateResize({ rectangle: rectangle });
                };
                this.cdr.markForCheck();
            };
        /**
         * @param {?} event
         * @param {?} resizeEvent
         * @return {?}
         */
        CalendarDayViewComponent.prototype.resizing = /**
         * @param {?} event
         * @param {?} resizeEvent
         * @return {?}
         */
            function (event, resizeEvent) {
                /** @type {?} */
                var currentResize = this.currentResizes.get(event);
                if (typeof resizeEvent.edges.top !== 'undefined') {
                    event.top = currentResize.originalTop + +resizeEvent.edges.top;
                    event.height = currentResize.originalHeight - +resizeEvent.edges.top;
                }
                else if (typeof resizeEvent.edges.bottom !== 'undefined') {
                    event.height = currentResize.originalHeight + +resizeEvent.edges.bottom;
                }
            };
        /**
         * @param {?} dayEvent
         * @return {?}
         */
        CalendarDayViewComponent.prototype.resizeEnded = /**
         * @param {?} dayEvent
         * @return {?}
         */
            function (dayEvent) {
                /** @type {?} */
                var currentResize = this.currentResizes.get(dayEvent);
                /** @type {?} */
                var resizingBeforeStart = currentResize.edge === 'top';
                /** @type {?} */
                var pixelsMoved;
                if (resizingBeforeStart) {
                    pixelsMoved = dayEvent.top - currentResize.originalTop;
                }
                else {
                    pixelsMoved = dayEvent.height - currentResize.originalHeight;
                }
                dayEvent.top = currentResize.originalTop;
                dayEvent.height = currentResize.originalHeight;
                /** @type {?} */
                var minutesMoved = getMinutesMoved(pixelsMoved, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
                /** @type {?} */
                var newStart = dayEvent.event.start;
                /** @type {?} */
                var newEnd = getDefaultEventEnd(this.dateAdapter, dayEvent.event, getMinimumEventHeightInMinutes(this.hourSegments, this.hourSegmentHeight));
                if (resizingBeforeStart) {
                    newStart = this.dateAdapter.addMinutes(newStart, minutesMoved);
                }
                else {
                    newEnd = this.dateAdapter.addMinutes(newEnd, minutesMoved);
                }
                this.eventTimesChanged.emit({
                    newStart: newStart,
                    newEnd: newEnd,
                    event: dayEvent.event,
                    type: CalendarEventTimesChangedEventType.Resize
                });
                this.currentResizes.delete(dayEvent);
            };
        /**
         * @param {?} event
         * @param {?} dayEventsContainer
         * @return {?}
         */
        CalendarDayViewComponent.prototype.dragStarted = /**
         * @param {?} event
         * @param {?} dayEventsContainer
         * @return {?}
         */
            function (event, dayEventsContainer) {
                var _this = this;
                /** @type {?} */
                var dragHelper = new CalendarDragHelper(dayEventsContainer, event);
                this.validateDrag = function (_a) {
                    var x = _a.x, y = _a.y;
                    return _this.currentResizes.size === 0 &&
                        dragHelper.validateDrag({
                            x: x,
                            y: y,
                            snapDraggedEvents: _this.snapDraggedEvents,
                            dragAlreadyMoved: _this.dragAlreadyMoved
                        });
                };
                this.eventDragEnter = 0;
                this.dragAlreadyMoved = false;
                this.cdr.markForCheck();
                this.calendarDayAutoScroll.dragStart(event);
            };
        /**
         * @hidden
         */
        /**
         * @hidden
         * @param {?} dragMoveEvent
         * @return {?}
         */
        CalendarDayViewComponent.prototype.dragMove = /**
         * @hidden
         * @param {?} dragMoveEvent
         * @return {?}
         */
            function (dragMoveEvent) {
                this.dragAlreadyMoved = true;
                this.calendarDayAutoScroll.dragMove(dragMoveEvent);
            };
        /**
         * @param {?} dayEvent
         * @param {?} dragEndEvent
         * @return {?}
         */
        CalendarDayViewComponent.prototype.dragEnded = /**
         * @param {?} dayEvent
         * @param {?} dragEndEvent
         * @return {?}
         */
            function (dayEvent, dragEndEvent) {
                if (this.eventDragEnter > 0) {
                    /** @type {?} */
                    var minutesMoved = getMinutesMoved(dragEndEvent.y, this.hourSegments, this.hourSegmentHeight, this.eventSnapSize);
                    /** @type {?} */
                    var newStart = this.dateAdapter.addMinutes(dayEvent.event.start, minutesMoved);
                    if (dragEndEvent.y < 0 && newStart < this.view.period.start) {
                        minutesMoved += this.dateAdapter.differenceInMinutes(this.view.period.start, newStart);
                        newStart = this.view.period.start;
                    }
                    /** @type {?} */
                    var newEnd = void 0;
                    if (dayEvent.event.end) {
                        newEnd = this.dateAdapter.addMinutes(dayEvent.event.end, minutesMoved);
                    }
                    if (isDraggedWithinPeriod(newStart, newEnd, this.view.period)) {
                        this.eventTimesChanged.emit({
                            newStart: newStart,
                            newEnd: newEnd,
                            event: dayEvent.event,
                            type: CalendarEventTimesChangedEventType.Drag,
                            allDay: false
                        });
                    }
                }
            };
        /**
         * @private
         * @return {?}
         */
        CalendarDayViewComponent.prototype.refreshHourGrid = /**
         * @private
         * @return {?}
         */
            function () {
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
            };
        /**
         * @private
         * @return {?}
         */
        CalendarDayViewComponent.prototype.refreshView = /**
         * @private
         * @return {?}
         */
            function () {
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
            };
        /**
         * @private
         * @return {?}
         */
        CalendarDayViewComponent.prototype.refreshAll = /**
         * @private
         * @return {?}
         */
            function () {
                this.refreshHourGrid();
                this.refreshView();
                this.emitBeforeViewRender();
            };
        /**
         * @private
         * @return {?}
         */
        CalendarDayViewComponent.prototype.emitBeforeViewRender = /**
         * @private
         * @return {?}
         */
            function () {
                if (this.hours && this.view) {
                    this.beforeViewRender.emit({
                        body: {
                            hourGrid: this.hours,
                            allDayEvents: this.view.allDayEvents
                        },
                        period: this.view.period
                    });
                }
            };
        CalendarDayViewComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view',
                        template: "\n    <div class=\"cal-day-view\">\n      <div\n        class=\"cal-all-day-events\"\n        mwlDroppable\n        dragOverClass=\"cal-drag-over\"\n        dragActiveClass=\"cal-drag-active\"\n        (drop)=\"eventDropped($event, view.period.start, true)\"\n      >\n        <mwl-calendar-day-view-event\n          *ngFor=\"let event of view.allDayEvents; trackBy: trackByEventId\"\n          [ngClass]=\"event.cssClass\"\n          [dayEvent]=\"{ event: event }\"\n          [tooltipPlacement]=\"tooltipPlacement\"\n          [tooltipTemplate]=\"tooltipTemplate\"\n          [tooltipAppendToBody]=\"tooltipAppendToBody\"\n          [tooltipDelay]=\"tooltipDelay\"\n          [customTemplate]=\"eventTemplate\"\n          [eventTitleTemplate]=\"eventTitleTemplate\"\n          [eventActionsTemplate]=\"eventActionsTemplate\"\n          (eventClicked)=\"eventClicked.emit({ event: event })\"\n          [class.cal-draggable]=\"!snapDraggedEvents && event.draggable\"\n          mwlDraggable\n          dragActiveClass=\"cal-drag-active\"\n          [dropData]=\"{ event: event, calendarId: calendarId }\"\n          [dragAxis]=\"{\n            x: !snapDraggedEvents && event.draggable,\n            y: !snapDraggedEvents && event.draggable\n          }\"\n        >\n        </mwl-calendar-day-view-event>\n      </div>\n      <div\n        class=\"cal-hour-rows\"\n        #dayEventsContainer\n        mwlDroppable\n        (dragEnter)=\"eventDragEnter = eventDragEnter + 1\"\n        (dragLeave)=\"eventDragEnter = eventDragEnter - 1\"\n      >\n        <div class=\"cal-events\">\n          <div\n            #event\n            *ngFor=\"let dayEvent of view?.events; trackBy: trackByDayEvent\"\n            class=\"cal-event-container\"\n            [class.cal-draggable]=\"dayEvent.event.draggable\"\n            [class.cal-starts-within-day]=\"!dayEvent.startsBeforeDay\"\n            [class.cal-ends-within-day]=\"!dayEvent.endsAfterDay\"\n            [ngClass]=\"dayEvent.event.cssClass\"\n            mwlResizable\n            [resizeSnapGrid]=\"{\n              top: eventSnapSize || hourSegmentHeight,\n              bottom: eventSnapSize || hourSegmentHeight\n            }\"\n            [validateResize]=\"validateResize\"\n            (resizeStart)=\"resizeStarted(dayEvent, $event, dayEventsContainer)\"\n            (resizing)=\"resizing(dayEvent, $event)\"\n            (resizeEnd)=\"resizeEnded(dayEvent)\"\n            mwlDraggable\n            dragActiveClass=\"cal-drag-active\"\n            [dropData]=\"{ event: dayEvent.event, calendarId: calendarId }\"\n            [dragAxis]=\"{\n              x:\n                !snapDraggedEvents &&\n                dayEvent.event.draggable &&\n                currentResizes.size === 0,\n              y: dayEvent.event.draggable && currentResizes.size === 0\n            }\"\n            [dragSnapGrid]=\"\n              snapDraggedEvents ? { y: eventSnapSize || hourSegmentHeight } : {}\n            \"\n            [validateDrag]=\"validateDrag\"\n            (dragPointerDown)=\"dragStarted(event, dayEventsContainer)\"\n            (dragging)=\"dragMove($event)\"\n            (dragEnd)=\"dragEnded(dayEvent, $event)\"\n            [style.marginTop.px]=\"dayEvent.top\"\n            [style.height.px]=\"dayEvent.height\"\n            [style.marginLeft.px]=\"dayEvent.left + 70\"\n            [style.width.px]=\"dayEvent.width - 1\"\n          >\n            <div\n              class=\"cal-resize-handle cal-resize-handle-before-start\"\n              *ngIf=\"\n                dayEvent.event?.resizable?.beforeStart &&\n                !dayEvent.startsBeforeDay\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ top: true }\"\n            ></div>\n            <mwl-calendar-day-view-event\n              [dayEvent]=\"dayEvent\"\n              [tooltipPlacement]=\"tooltipPlacement\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipAppendToBody]=\"tooltipAppendToBody\"\n              [tooltipDelay]=\"tooltipDelay\"\n              [customTemplate]=\"eventTemplate\"\n              [eventTitleTemplate]=\"eventTitleTemplate\"\n              [eventActionsTemplate]=\"eventActionsTemplate\"\n              (eventClicked)=\"eventClicked.emit({ event: dayEvent.event })\"\n            >\n            </mwl-calendar-day-view-event>\n            <div\n              class=\"cal-resize-handle cal-resize-handle-after-end\"\n              *ngIf=\"\n                dayEvent.event?.resizable?.afterEnd && !dayEvent.endsAfterDay\n              \"\n              mwlResizeHandle\n              [resizeEdges]=\"{ bottom: true }\"\n            ></div>\n          </div>\n        </div>\n        <div\n          class=\"cal-hour\"\n          *ngFor=\"let hour of hours; trackBy: trackByHour\"\n          [style.minWidth.px]=\"view?.width + 70\"\n        >\n          <mwl-calendar-day-view-hour-segment\n            *ngFor=\"let segment of hour.segments; trackBy: trackByHourSegment\"\n            [style.height.px]=\"hourSegmentHeight\"\n            [segment]=\"segment\"\n            [segmentHeight]=\"hourSegmentHeight\"\n            [locale]=\"locale\"\n            [customTemplate]=\"hourSegmentTemplate\"\n            (mwlClick)=\"hourSegmentClicked.emit({ date: segment.date })\"\n            mwlDroppable\n            dragOverClass=\"cal-drag-over\"\n            dragActiveClass=\"cal-drag-active\"\n            (drop)=\"eventDropped($event, segment.date, false)\"\n          >\n          </mwl-calendar-day-view-hour-segment>\n        </div>\n      </div>\n    </div>\n  "
                    }] }
        ];
        /** @nocollapse */
        CalendarDayViewComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef },
                { type: CalendarUtils },
                { type: String, decorators: [{ type: core.Inject, args: [core.LOCALE_ID,] }] },
                { type: DateAdapter }
            ];
        };
        CalendarDayViewComponent.propDecorators = {
            viewDate: [{ type: core.Input }],
            events: [{ type: core.Input }],
            hourSegments: [{ type: core.Input }],
            hourSegmentHeight: [{ type: core.Input }],
            dayStartHour: [{ type: core.Input }],
            dayStartMinute: [{ type: core.Input }],
            dayEndHour: [{ type: core.Input }],
            dayEndMinute: [{ type: core.Input }],
            eventWidth: [{ type: core.Input }],
            refresh: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            eventSnapSize: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            hourSegmentTemplate: [{ type: core.Input }],
            eventTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            snapDraggedEvents: [{ type: core.Input }],
            scrollContainer: [{ type: core.Input }],
            eventClicked: [{ type: core.Output }],
            hourSegmentClicked: [{ type: core.Output }],
            eventTimesChanged: [{ type: core.Output }],
            beforeViewRender: [{ type: core.Output }]
        };
        return CalendarDayViewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarDayViewHourSegmentComponent = /** @class */ (function () {
        function CalendarDayViewHourSegmentComponent() {
        }
        CalendarDayViewHourSegmentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view-hour-segment',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\"\n      let-segmentHeight=\"segmentHeight\"\n    >\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\"\n      >\n        <div class=\"cal-time\">\n          {{ segment.date | calendarDate: 'dayViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale,\n        segmentHeight: segmentHeight\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarDayViewHourSegmentComponent.propDecorators = {
            segment: [{ type: core.Input }],
            segmentHeight: [{ type: core.Input }],
            locale: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }]
        };
        return CalendarDayViewHourSegmentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarDayViewEventComponent = /** @class */ (function () {
        function CalendarDayViewEventComponent() {
            this.eventClicked = new core.EventEmitter();
        }
        CalendarDayViewEventComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mwl-calendar-day-view-event',
                        template: "\n    <ng-template\n      #defaultTemplate\n      let-dayEvent=\"dayEvent\"\n      let-tooltipPlacement=\"tooltipPlacement\"\n      let-eventClicked=\"eventClicked\"\n      let-tooltipTemplate=\"tooltipTemplate\"\n      let-tooltipAppendToBody=\"tooltipAppendToBody\"\n      let-tooltipDelay=\"tooltipDelay\"\n    >\n      <div\n        class=\"cal-event\"\n        [style.backgroundColor]=\"dayEvent.event.color?.secondary\"\n        [style.borderColor]=\"dayEvent.event.color?.primary\"\n        [mwlCalendarTooltip]=\"\n          dayEvent.event.title | calendarEventTitle: 'dayTooltip':dayEvent.event\n        \"\n        [tooltipPlacement]=\"tooltipPlacement\"\n        [tooltipEvent]=\"dayEvent.event\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipAppendToBody]=\"tooltipAppendToBody\"\n        [tooltipDelay]=\"tooltipDelay\"\n        (mwlClick)=\"eventClicked.emit()\"\n      >\n        <mwl-calendar-event-actions\n          [event]=\"dayEvent.event\"\n          [customTemplate]=\"eventActionsTemplate\"\n        >\n        </mwl-calendar-event-actions>\n        &ngsp;\n        <mwl-calendar-event-title\n          [event]=\"dayEvent.event\"\n          [customTemplate]=\"eventTitleTemplate\"\n          view=\"day\"\n        >\n        </mwl-calendar-event-title>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        dayEvent: dayEvent,\n        tooltipPlacement: tooltipPlacement,\n        eventClicked: eventClicked,\n        tooltipTemplate: tooltipTemplate,\n        tooltipAppendToBody: tooltipAppendToBody,\n        tooltipDelay: tooltipDelay\n      }\"\n    >\n    </ng-template>\n  "
                    }] }
        ];
        CalendarDayViewEventComponent.propDecorators = {
            dayEvent: [{ type: core.Input }],
            tooltipPlacement: [{ type: core.Input }],
            tooltipAppendToBody: [{ type: core.Input }],
            customTemplate: [{ type: core.Input }],
            eventTitleTemplate: [{ type: core.Input }],
            eventActionsTemplate: [{ type: core.Input }],
            tooltipTemplate: [{ type: core.Input }],
            tooltipDelay: [{ type: core.Input }],
            eventClicked: [{ type: core.Output }]
        };
        return CalendarDayViewEventComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CalendarDayModule = /** @class */ (function () {
        function CalendarDayModule() {
        }
        CalendarDayModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarCommonModule
                        ],
                        declarations: [
                            CalendarDayViewComponent,
                            CalendarDayViewHourSegmentComponent,
                            CalendarDayViewEventComponent
                        ],
                        exports: [
                            angularResizableElement.ResizableModule,
                            angularDraggableDroppable.DragAndDropModule,
                            CalendarDayViewComponent,
                            CalendarDayViewHourSegmentComponent,
                            CalendarDayViewEventComponent
                        ]
                    },] }
        ];
        return CalendarDayModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * The main module of this library. Example usage:
     *
     * ```typescript
     * import { CalenderModule } from 'angular-calendar';
     *
     * \@NgModule({
     *   imports: [
     *     CalenderModule.forRoot()
     *   ]
     * })
     * class MyModule {}
     * ```
     *
     */
    var CalendarModule = /** @class */ (function () {
        function CalendarModule() {
        }
        /**
         * @param {?} dateAdapter
         * @param {?=} config
         * @return {?}
         */
        CalendarModule.forRoot = /**
         * @param {?} dateAdapter
         * @param {?=} config
         * @return {?}
         */
            function (dateAdapter, config) {
                if (config === void 0) {
                    config = {};
                }
                return {
                    ngModule: CalendarModule,
                    providers: [
                        dateAdapter,
                        config.eventTitleFormatter || CalendarEventTitleFormatter,
                        config.dateFormatter || CalendarDateFormatter,
                        config.utils || CalendarUtils
                    ]
                };
            };
        CalendarModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            CalendarCommonModule,
                            CalendarMonthModule,
                            CalendarWeekModule,
                            CalendarDayModule
                        ],
                        exports: [
                            CalendarCommonModule,
                            CalendarMonthModule,
                            CalendarWeekModule,
                            CalendarDayModule
                        ]
                    },] }
        ];
        return CalendarModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.DAYS_OF_WEEK = calendarUtils.DAYS_OF_WEEK;
    exports.CalendarModule = CalendarModule;
    exports.CalendarCommonModule = CalendarCommonModule;
    exports.CalendarEventTitleFormatter = CalendarEventTitleFormatter;
    exports.MOMENT = MOMENT;
    exports.CalendarMomentDateFormatter = CalendarMomentDateFormatter;
    exports.CalendarNativeDateFormatter = CalendarNativeDateFormatter;
    exports.CalendarAngularDateFormatter = CalendarAngularDateFormatter;
    exports.CalendarDateFormatter = CalendarDateFormatter;
    exports.CalendarUtils = CalendarUtils;
    exports.CalendarEventTimesChangedEventType = CalendarEventTimesChangedEventType;
    exports.DateAdapter = DateAdapter;
    exports.CalendarView = CalendarView;
    exports.CalendarMonthViewComponent = CalendarMonthViewComponent;
    exports.collapseAnimation = collapseAnimation;
    exports.CalendarMonthModule = CalendarMonthModule;
    exports.CalendarWeekViewComponent = CalendarWeekViewComponent;
    exports.getWeekViewPeriod = getWeekViewPeriod;
    exports.CalendarWeekModule = CalendarWeekModule;
    exports.CalendarDayViewComponent = CalendarDayViewComponent;
    exports.CalendarDayModule = CalendarDayModule;
    exports.ɵi = CalendarDatePipe;
    exports.ɵb = CalendarEventActionsComponent;
    exports.ɵc = CalendarEventTitleComponent;
    exports.ɵj = CalendarEventTitlePipe;
    exports.ɵg = CalendarNextViewDirective;
    exports.ɵf = CalendarPreviousViewDirective;
    exports.ɵh = CalendarTodayDirective;
    exports.ɵe = CalendarTooltipDirective;
    exports.ɵd = CalendarTooltipWindowComponent;
    exports.ɵk = ClickDirective;
    exports.ɵr = CalendarDayViewEventComponent;
    exports.ɵq = CalendarDayViewHourSegmentComponent;
    exports.ɵl = CalendarMonthCellComponent;
    exports.ɵm = CalendarMonthViewHeaderComponent;
    exports.ɵa = CalendarOpenDayEventsComponent;
    exports.ɵo = CalendarWeekViewEventComponent;
    exports.ɵn = CalendarWeekViewHeaderComponent;
    exports.ɵp = CalendarWeekViewHourSegmentComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=angular-calendar.umd.js.map