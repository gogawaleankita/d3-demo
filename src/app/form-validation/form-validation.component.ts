import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent  {
  /** create a form (contactForm) with following controls/groups and  validations
   *    - name: control,    valiations: required
   *    - phone: control,   validations: required, number of 10 digits
   *    - address: group
   *      - street: control
   *      - city: control
   *      - zip: number of 6 digits
   */

  contactForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'phone':new FormControl('',
  [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern(/^-?(0|[1-9]\d*)?$/),
    Validators.minLength(10)
  ]   
  ),
    'address': new FormGroup({
    'street':new FormControl(''),
    'city': new FormControl(''),
    'zip':new FormControl('',
    [Validators.maxLength(6)
      ,Validators.pattern(/^-?(0|[1-9]\d*)?$/)
    ,Validators.minLength(6)])
    }) });
    
      onSubmit() {
        console.log('form value =>', this.contactForm.value);
      }
    
      get name() { return this.contactForm.get('name'); }
      get phone() { return this.contactForm.get('phone'); }
      get zip() { return this.contactForm.controls['address'].get('zip'); }
    

  
}
