import {
  Directive,
  EventEmitter,
  Output,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  pressing: boolean;
  isLongPressing: boolean;
  timeout: any;
  interval: any;

  @Output() longPressing = new EventEmitter();

  @HostBinding('class.press') get press() { return this.pressing; }

  constructor() { }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.pressing = true;
    this.isLongPressing = false;
    this.longPressing.emit(event);
    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.interval = setInterval(() => {
        this.longPressing.emit(event);
      }, 50);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.isLongPressing = false;
    this.pressing = false;
  }

}
