import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const urlValidator = (): ValidatorFn => {
  const urlRegex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const urlIsValid = urlRegex.test(control.value);
    return !urlIsValid ? { invalidUrl: { value: control.value } } : null;
  };
};
