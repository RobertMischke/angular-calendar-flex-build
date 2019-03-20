import { DragMoveEvent } from 'angular-draggable-droppable';
export default class CalendarDayAutoScroll {
    private event;
    private scrollContainer;
    constructor(scrollContainer: HTMLElement | Window);
    dragStart(event: any): void;
    dragMove(dragMoveEvent: DragMoveEvent): void;
}
