/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
var CalendarDayViewHourSegmentComponent = /** @class */ (function () {
    function CalendarDayViewHourSegmentComponent() {
    }
    CalendarDayViewHourSegmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-day-view-hour-segment',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\"\n      let-segmentHeight=\"segmentHeight\"\n    >\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\"\n      >\n        <div class=\"cal-time\">\n          {{ segment.date | calendarDate: 'dayViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale,\n        segmentHeight: segmentHeight\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarDayViewHourSegmentComponent.propDecorators = {
        segment: [{ type: Input }],
        segmentHeight: [{ type: Input }],
        locale: [{ type: Input }],
        customTemplate: [{ type: Input }]
    };
    return CalendarDayViewHourSegmentComponent;
}());
export { CalendarDayViewHourSegmentComponent };
if (false) {
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.segment;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.segmentHeight;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.locale;
    /** @type {?} */
    CalendarDayViewHourSegmentComponent.prototype.customTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZGF5LXZpZXctaG91ci1zZWdtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL2RheS9jYWxlbmRhci1kYXktdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUQ7SUFBQTtJQXdDQSxDQUFDOztnQkF4Q0EsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQ0FBb0M7b0JBQzlDLFFBQVEsRUFBRSx5eUJBNEJUO2lCQUNGOzs7MEJBRUUsS0FBSztnQ0FFTCxLQUFLO3lCQUVMLEtBQUs7aUNBRUwsS0FBSzs7SUFDUiwwQ0FBQztDQUFBLEFBeENELElBd0NDO1NBUlksbUNBQW1DOzs7SUFDOUMsc0RBQXFDOztJQUVyQyw0REFBK0I7O0lBRS9CLHFEQUF3Qjs7SUFFeEIsNkRBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERheVZpZXdIb3VyU2VnbWVudCB9IGZyb20gJ2NhbGVuZGFyLXV0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLWNhbGVuZGFyLWRheS12aWV3LWhvdXItc2VnbWVudCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlXG4gICAgICAjZGVmYXVsdFRlbXBsYXRlXG4gICAgICBsZXQtc2VnbWVudD1cInNlZ21lbnRcIlxuICAgICAgbGV0LWxvY2FsZT1cImxvY2FsZVwiXG4gICAgICBsZXQtc2VnbWVudEhlaWdodD1cInNlZ21lbnRIZWlnaHRcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJjYWwtaG91ci1zZWdtZW50XCJcbiAgICAgICAgW3N0eWxlLmhlaWdodC5weF09XCJzZWdtZW50SGVpZ2h0XCJcbiAgICAgICAgW2NsYXNzLmNhbC1ob3VyLXN0YXJ0XT1cInNlZ21lbnQuaXNTdGFydFwiXG4gICAgICAgIFtjbGFzcy5jYWwtYWZ0ZXItaG91ci1zdGFydF09XCIhc2VnbWVudC5pc1N0YXJ0XCJcbiAgICAgICAgW25nQ2xhc3NdPVwic2VnbWVudC5jc3NDbGFzc1wiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYWwtdGltZVwiPlxuICAgICAgICAgIHt7IHNlZ21lbnQuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ2RheVZpZXdIb3VyJzpsb2NhbGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIHNlZ21lbnQ6IHNlZ21lbnQsXG4gICAgICAgIGxvY2FsZTogbG9jYWxlLFxuICAgICAgICBzZWdtZW50SGVpZ2h0OiBzZWdtZW50SGVpZ2h0XG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhckRheVZpZXdIb3VyU2VnbWVudENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHNlZ21lbnQ6IERheVZpZXdIb3VyU2VnbWVudDtcblxuICBASW5wdXQoKSBzZWdtZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG59XG4iXX0=