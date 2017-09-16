import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorsObj } from './Validators';
@Directive({
  selector: '[hsavalidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {

  @Input() hsavalidator : any;



  validate(control: AbstractControl): { [key: string]: any } {
    let validators: Array<any> = this.hsavalidator ? this.hsavalidator.split(",") : [];

    return customValidator(validators)(control);
  }

}

function customValidator(validators: Array<any>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let validationResult: object = null;
    let validatorsObj: object = ValidatorsObj;
    let isValid;

    for (let index = 0; index < validators.length; index++) {
      let valMsg, valExpression;
      

      if (typeof validators[index] == "string" && validators[index].trim().split(":").length > 0) {
        let valObjArr = validators[index].split(":")
        let valName = valObjArr[0].trim();
        valMsg = valObjArr.length > 1 ? valObjArr[1] : validatorsObj[valName].message;
        valExpression = validatorsObj[valName].expression;
      } else if (typeof validators[index] == "object") {
        valExpression = validators[index].expression;
      }

      isValid = valExpression.test(control.value);

      if (isValid == false) {
        validationResult = { message: valMsg };
        break;
      }
    }

    return validationResult;
  }
}

