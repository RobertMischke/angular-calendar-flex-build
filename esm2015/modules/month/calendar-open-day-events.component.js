/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { trackByEventId } from '../common/util';
/** @type {?} */
export const collapseAnimation = trigger('collapse', [
    transition('void => *', [
        style({ height: 0, overflow: 'hidden' }),
        animate('150ms', style({ height: '*' }))
    ]),
    transition('* => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate('150ms', style({ height: 0 }))
    ])
]);
export class CalendarOpenDayEventsComponent {
    constructor() {
        this.isOpen = false;
        this.eventClicked = new EventEmitter();
        this.trackByEventId = trackByEventId;
    }
}
CalendarOpenDayEventsComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-calendar-open-day-events',
                template: `
    <ng-template
      #defaultTemplate
      let-events="events"
      let-eventClicked="eventClicked"
      let-isOpen="isOpen"
      let-trackByEventId="trackByEventId"
    >
      <div class="cal-open-day-events" [@collapse] *ngIf="isOpen">
        <div
          *ngFor="let event of events; trackBy: trackByEventId"
          [ngClass]="event?.cssClass"
          mwlDraggable
          [class.cal-draggable]="event.draggable"
          dragActiveClass="cal-drag-active"
          [dropData]="{ event: event }"
          [dragAxis]="{ x: event.draggable, y: event.draggable }"
        >
          <span
            class="cal-event"
            [style.backgroundColor]="event.color?.primary"
          >
          </span>
          &ngsp;
          <mwl-calendar-event-title
            [event]="event"
            [customTemplate]="eventTitleTemplate"
            view="month"
            (mwlClick)="eventClicked.emit({ event: event })"
          >
          </mwl-calendar-event-title>
          &ngsp;
          <mwl-calendar-event-actions
            [event]="event"
            [customTemplate]="eventActionsTemplate"
          >
          </mwl-calendar-event-actions>
        </div>
      </div>
    </ng-template>
    <ng-template
      [ngTemplateOutlet]="customTemplate || defaultTemplate"
      [ngTemplateOutletContext]="{
        events: events,
        eventClicked: eventClicked,
        isOpen: isOpen,
        trackByEventId: trackByEventId
      }"
    >
    </ng-template>
  `,
                animations: [collapseAnimation]
            }] }
];
CalendarOpenDayEventsComponent.propDecorators = {
    isOpen: [{ type: Input }],
    events: [{ type: Input }],
    customTemplate: [{ type: Input }],
    eventTitleTemplate: [{ type: Input }],
    eventActionsTemplate: [{ type: Input }],
    eventClicked: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.isOpen;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.events;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.customTemplate;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.eventTitleTemplate;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.eventActionsTemplate;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.eventClicked;
    /** @type {?} */
    CalendarOpenDayEventsComponent.prototype.trackByEventId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItb3Blbi1kYXktZXZlbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItY2FsZW5kYXIvIiwic291cmNlcyI6WyJtb2R1bGVzL21vbnRoL2NhbGVuZGFyLW9wZW4tZGF5LWV2ZW50cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDTCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBRVIsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRWhELE1BQU0sT0FBTyxpQkFBaUIsR0FBNkIsT0FBTyxDQUFDLFVBQVUsRUFBRTtJQUM3RSxVQUFVLENBQUMsV0FBVyxFQUFFO1FBQ3RCLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDekMsQ0FBQztJQUNGLFVBQVUsQ0FBQyxXQUFXLEVBQUU7UUFDdEIsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN2QyxDQUFDO0NBQ0gsQ0FBQztBQXlERixNQUFNLE9BQU8sOEJBQThCO0lBdkQzQztRQXdEVyxXQUFNLEdBQVksS0FBSyxDQUFDO1FBV2pDLGlCQUFZLEdBQTJDLElBQUksWUFBWSxFQUVuRSxDQUFDO1FBRUwsbUJBQWMsR0FBRyxjQUFjLENBQUM7SUFDbEMsQ0FBQzs7O1lBeEVBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsOEJBQThCO2dCQUN4QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RUO2dCQUNELFVBQVUsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2FBQ2hDOzs7cUJBRUUsS0FBSztxQkFFTCxLQUFLOzZCQUVMLEtBQUs7aUNBRUwsS0FBSzttQ0FFTCxLQUFLOzJCQUVMLE1BQU07Ozs7SUFWUCxnREFBaUM7O0lBRWpDLGdEQUFpQzs7SUFFakMsd0RBQTBDOztJQUUxQyw0REFBOEM7O0lBRTlDLDhEQUFnRDs7SUFFaEQsc0RBR0s7O0lBRUwsd0RBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgdHJpZ2dlcixcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIGFuaW1hdGUsXG4gIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVxufSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENhbGVuZGFyRXZlbnQgfSBmcm9tICdjYWxlbmRhci11dGlscyc7XG5pbXBvcnQgeyB0cmFja0J5RXZlbnRJZCB9IGZyb20gJy4uL2NvbW1vbi91dGlsJztcblxuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQW5pbWF0aW9uOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgPSB0cmlnZ2VyKCdjb2xsYXBzZScsIFtcbiAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgIHN0eWxlKHsgaGVpZ2h0OiAwLCBvdmVyZmxvdzogJ2hpZGRlbicgfSksXG4gICAgYW5pbWF0ZSgnMTUwbXMnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKVxuICBdKSxcbiAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG92ZXJmbG93OiAnaGlkZGVuJyB9KSxcbiAgICBhbmltYXRlKCcxNTBtcycsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKVxuICBdKVxuXSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC1jYWxlbmRhci1vcGVuLWRheS1ldmVudHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgI2RlZmF1bHRUZW1wbGF0ZVxuICAgICAgbGV0LWV2ZW50cz1cImV2ZW50c1wiXG4gICAgICBsZXQtZXZlbnRDbGlja2VkPVwiZXZlbnRDbGlja2VkXCJcbiAgICAgIGxldC1pc09wZW49XCJpc09wZW5cIlxuICAgICAgbGV0LXRyYWNrQnlFdmVudElkPVwidHJhY2tCeUV2ZW50SWRcIlxuICAgID5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYWwtb3Blbi1kYXktZXZlbnRzXCIgW0Bjb2xsYXBzZV0gKm5nSWY9XCJpc09wZW5cIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBldmVudCBvZiBldmVudHM7IHRyYWNrQnk6IHRyYWNrQnlFdmVudElkXCJcbiAgICAgICAgICBbbmdDbGFzc109XCJldmVudD8uY3NzQ2xhc3NcIlxuICAgICAgICAgIG13bERyYWdnYWJsZVxuICAgICAgICAgIFtjbGFzcy5jYWwtZHJhZ2dhYmxlXT1cImV2ZW50LmRyYWdnYWJsZVwiXG4gICAgICAgICAgZHJhZ0FjdGl2ZUNsYXNzPVwiY2FsLWRyYWctYWN0aXZlXCJcbiAgICAgICAgICBbZHJvcERhdGFdPVwieyBldmVudDogZXZlbnQgfVwiXG4gICAgICAgICAgW2RyYWdBeGlzXT1cInsgeDogZXZlbnQuZHJhZ2dhYmxlLCB5OiBldmVudC5kcmFnZ2FibGUgfVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3M9XCJjYWwtZXZlbnRcIlxuICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJldmVudC5jb2xvcj8ucHJpbWFyeVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAmbmdzcDtcbiAgICAgICAgICA8bXdsLWNhbGVuZGFyLWV2ZW50LXRpdGxlXG4gICAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50VGl0bGVUZW1wbGF0ZVwiXG4gICAgICAgICAgICB2aWV3PVwibW9udGhcIlxuICAgICAgICAgICAgKG13bENsaWNrKT1cImV2ZW50Q2xpY2tlZC5lbWl0KHsgZXZlbnQ6IGV2ZW50IH0pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtdGl0bGU+XG4gICAgICAgICAgJm5nc3A7XG4gICAgICAgICAgPG13bC1jYWxlbmRhci1ldmVudC1hY3Rpb25zXG4gICAgICAgICAgICBbZXZlbnRdPVwiZXZlbnRcIlxuICAgICAgICAgICAgW2N1c3RvbVRlbXBsYXRlXT1cImV2ZW50QWN0aW9uc1RlbXBsYXRlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9td2wtY2FsZW5kYXItZXZlbnQtYWN0aW9ucz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuICAgIDxuZy10ZW1wbGF0ZVxuICAgICAgW25nVGVtcGxhdGVPdXRsZXRdPVwiY3VzdG9tVGVtcGxhdGUgfHwgZGVmYXVsdFRlbXBsYXRlXCJcbiAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7XG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICBldmVudENsaWNrZWQ6IGV2ZW50Q2xpY2tlZCxcbiAgICAgICAgaXNPcGVuOiBpc09wZW4sXG4gICAgICAgIHRyYWNrQnlFdmVudElkOiB0cmFja0J5RXZlbnRJZFxuICAgICAgfVwiXG4gICAgPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGFuaW1hdGlvbnM6IFtjb2xsYXBzZUFuaW1hdGlvbl1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJPcGVuRGF5RXZlbnRzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZXZlbnRzOiBDYWxlbmRhckV2ZW50W107XG5cbiAgQElucHV0KCkgY3VzdG9tVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KCkgZXZlbnRUaXRsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpIGV2ZW50QWN0aW9uc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBPdXRwdXQoKVxuICBldmVudENsaWNrZWQ6IEV2ZW50RW1pdHRlcjx7IGV2ZW50OiBDYWxlbmRhckV2ZW50IH0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgZXZlbnQ6IENhbGVuZGFyRXZlbnQ7XG4gIH0+KCk7XG5cbiAgdHJhY2tCeUV2ZW50SWQgPSB0cmFja0J5RXZlbnRJZDtcbn1cbiJdfQ==