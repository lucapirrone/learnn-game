import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit {
  // Loading state
  @Input() loading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
