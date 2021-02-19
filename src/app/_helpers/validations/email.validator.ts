import { FormGroup } from '@angular/forms';

export function EmailValidator(controlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


		if (!control.value.match(emailPattern)) {
			control.setErrors({ validatorError: true });
		} else {
			control.setErrors(null);
		}
	}
}
