import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

export function flush(control: AbstractControl | null | undefined) {
  if (!control) {
    return;
  }

  if (control instanceof FormGroup || control instanceof FormArray) {
    Object.values(control.controls).forEach(childControl => flush(childControl));
    control.reset();
  } else {
    control.reset();
  }
}
