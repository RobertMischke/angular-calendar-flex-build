/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef } from '@angular/core';
var CalendarWeekViewHourSegmentComponent = /** @class */ (function () {
    function CalendarWeekViewHourSegmentComponent() {
    }
    CalendarWeekViewHourSegmentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-calendar-week-view-hour-segment',
                    template: "\n    <ng-template\n      #defaultTemplate\n      let-segment=\"segment\"\n      let-locale=\"locale\"\n      let-segmentHeight=\"segmentHeight\"\n      let-isTimeLabel=\"isTimeLabel\"\n    >\n      <div\n        class=\"cal-hour-segment\"\n        [style.height.px]=\"segmentHeight\"\n        [class.cal-hour-start]=\"segment.isStart\"\n        [class.cal-after-hour-start]=\"!segment.isStart\"\n        [ngClass]=\"segment.cssClass\"\n      >\n        <div class=\"cal-time\" *ngIf=\"isTimeLabel\">\n          {{ segment.date | calendarDate: 'weekViewHour':locale }}\n        </div>\n      </div>\n    </ng-template>\n    <ng-template\n      [ngTemplateOutlet]=\"customTemplate || defaultTemplate\"\n      [ngTemplateOutletContext]=\"{\n        segment: segment,\n        locale: locale,\n        segmentHeight: segmentHeight,\n        isTimeLabel: isTimeLabel\n      }\"\n    >\n    </ng-template>\n  "
                }] }
    ];
    CalendarWeekViewHourSegmentComponent.propDecorators = {
        segment: [{ type: Input }],
        segmentHeight: [{ type: Input }],
        locale: [{ type: Input }],
        isTimeLabel: [{ type: Input }],
        customTemplate: [{ type: Input }]
    };
    return CalendarWeekViewHourSegmentComponent;
}());
export { CalendarWeekViewHourSegmentComponent };
if (false) {
    /** @type {?} */
    CalendarWeekViewHourSegmentComponent.prototype.segment;
    /** @type {?} */
    CalendarWeekViewHourSegmentComponent.prototype.segmentHeight;
    /** @type {?} */
    CalendarWeekViewHourSegmentComponent.prototype.locale;
    /** @type {?} */
    CalendarWeekViewHourSegmentComponent.prototype.isTimeLabel;
    /** @type {?} */
    CalendarWeekViewHourSegmentComponent.prototype.customTemplate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItd2Vlay12aWV3LWhvdXItc2VnbWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWNhbGVuZGFyLyIsInNvdXJjZXMiOlsibW9kdWxlcy93ZWVrL2NhbGVuZGFyLXdlZWstdmlldy1ob3VyLXNlZ21lbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUQ7SUFBQTtJQTRDQSxDQUFDOztnQkE1Q0EsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLFFBQVEsRUFBRSwwNEJBOEJUO2lCQUNGOzs7MEJBRUUsS0FBSztnQ0FFTCxLQUFLO3lCQUVMLEtBQUs7OEJBRUwsS0FBSztpQ0FFTCxLQUFLOztJQUNSLDJDQUFDO0NBQUEsQUE1Q0QsSUE0Q0M7U0FWWSxvQ0FBb0M7OztJQUMvQyx1REFBcUM7O0lBRXJDLDZEQUErQjs7SUFFL0Isc0RBQXdCOztJQUV4QiwyREFBOEI7O0lBRTlCLDhEQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWVrVmlld0hvdXJDb2x1bW4gfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci13ZWVrLXZpZXctaG91ci1zZWdtZW50JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctdGVtcGxhdGVcbiAgICAgICNkZWZhdWx0VGVtcGxhdGVcbiAgICAgIGxldC1zZWdtZW50PVwic2VnbWVudFwiXG4gICAgICBsZXQtbG9jYWxlPVwibG9jYWxlXCJcbiAgICAgIGxldC1zZWdtZW50SGVpZ2h0PVwic2VnbWVudEhlaWdodFwiXG4gICAgICBsZXQtaXNUaW1lTGFiZWw9XCJpc1RpbWVMYWJlbFwiXG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz1cImNhbC1ob3VyLXNlZ21lbnRcIlxuICAgICAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cInNlZ21lbnRIZWlnaHRcIlxuICAgICAgICBbY2xhc3MuY2FsLWhvdXItc3RhcnRdPVwic2VnbWVudC5pc1N0YXJ0XCJcbiAgICAgICAgW2NsYXNzLmNhbC1hZnRlci1ob3VyLXN0YXJ0XT1cIiFzZWdtZW50LmlzU3RhcnRcIlxuICAgICAgICBbbmdDbGFzc109XCJzZWdtZW50LmNzc0NsYXNzXCJcbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNhbC10aW1lXCIgKm5nSWY9XCJpc1RpbWVMYWJlbFwiPlxuICAgICAgICAgIHt7IHNlZ21lbnQuZGF0ZSB8IGNhbGVuZGFyRGF0ZTogJ3dlZWtWaWV3SG91cic6bG9jYWxlIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8bmctdGVtcGxhdGVcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImN1c3RvbVRlbXBsYXRlIHx8IGRlZmF1bHRUZW1wbGF0ZVwiXG4gICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xuICAgICAgICBzZWdtZW50OiBzZWdtZW50LFxuICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgc2VnbWVudEhlaWdodDogc2VnbWVudEhlaWdodCxcbiAgICAgICAgaXNUaW1lTGFiZWw6IGlzVGltZUxhYmVsXG4gICAgICB9XCJcbiAgICA+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBDYWxlbmRhcldlZWtWaWV3SG91clNlZ21lbnRDb21wb25lbnQge1xuICBASW5wdXQoKSBzZWdtZW50OiBXZWVrVmlld0hvdXJDb2x1bW47XG5cbiAgQElucHV0KCkgc2VnbWVudEhlaWdodDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIGlzVGltZUxhYmVsOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGN1c3RvbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xufVxuIl19