import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'error-wrapper',
  templateUrl: './error-wrapper.component.html',
  styleUrls: ['./error-wrapper.component.scss'],
})
export class ErrorWrapperComponent implements OnInit {
  @Input('showError')
  public showError: boolean = false;
  @Input('control')
  public control: FormControl;
  @Input('form')
  public form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
