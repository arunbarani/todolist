import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[validate-onblur]'
})
export class ValidationOnBlurDirective {
  private validators: any;
  private asyncValidators: any;
  private valueChanged: any;

  constructor(public formControl: NgControl) {
  }

  
  @HostListener("focus") onFocus($event) {
    this.valueChanged = false;
    this.validators = this.formControl.control.validator;
    this.asyncValidators = this.formControl.control.asyncValidator;
    this.formControl.control.clearAsyncValidators();
    this.formControl.control.clearValidators();
  }

   @HostListener("keyup") onKeyup($event) {
    this.valueChanged = true; 
  }

   @HostListener("change") onChange($event) {
    this.valueChanged = true; 
  }

  @HostListener("ngModelChange") onNgModelChange($event) {
    this.valueChanged = true;
  }
  @HostListener("blur") onBlur($event) {
    this.formControl.control.setAsyncValidators(this.asyncValidators);
    this.formControl.control.setValidators(this.validators);
    if (this.valueChanged)
      this.formControl.control.updateValueAndValidity();
  }
}