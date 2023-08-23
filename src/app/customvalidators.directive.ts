import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCustomvalidators]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomvalidatorsDirective, multi: true }]
})
export class CustomvalidatorsDirective implements Validator {

  @Input('phoneNumber') validatePhoneNumber: any;

  constructor() { }

    validate(control: AbstractControl): ValidationErrors | null {
        throw new Error('Method not implemented.');
    }

}
