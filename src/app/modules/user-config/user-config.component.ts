import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { cpfCnpjMask, phoneMask } from '../../_helpers/utils';

@Component({
	selector: 'app-user-config',
	templateUrl: './user-config.component.html',
	styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

	product;
	formUser: FormGroup;
	submitted: boolean = false;
	enableEdit = false;
	maskPhone: string = '(00) 0000-0000||(00) 0 0000-0000';

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private userService: UserService,
		private tokenStorage: TokenStorageService
	) {
		this.userService.getUserById(tokenStorage.getUser().id).subscribe(e => {
			this.formUser.patchValue(e.user)
			this.maskPhone = phoneMask(this.formUser.value.tel || '')
		})
	}

	ngOnInit(): void {
		this.createForm();
	}

	createForm() {
		this.formUser = this.formBuilder.group({
			name: [{ value: '', disabled: !this.enableEdit }, Validators.required],
			company: [{ value: '', disabled: !this.enableEdit }, Validators.required],
			email: [{ value: '', disabled: !this.enableEdit }, Validators.required],
			tel: [{ value: '', disabled: !this.enableEdit }],
			address: [{ value: '', disabled: !this.enableEdit }],
		})
	}

	get form() { return this.formUser.controls; }

	onSubmit() {
		this.submitted = true;
		if (this.formUser.invalid) {
			this.submitted = false;
			return;
		}

		this.userService.updateUser(this.tokenStorage.getUser().id, this.formUser.value).subscribe((e) => {
			this.submitted = false;
			this.actionToDisabled();
			this.tokenStorage.saveUser(e.user)
		})
	}

	isValidInput(fieldName): boolean {
		return this.form[fieldName].invalid &&
			(this.form[fieldName].dirty || this.form[fieldName].touched);
	}

	actionToEnable() {
		this.enableEdit = !this.enableEdit
		this.form.name.enable();
		this.form.company.enable();
		this.form.email.enable();
		this.form.tel.enable();
		this.form.address.enable();
	}

	actionToDisabled() {
		this.enableEdit = !this.enableEdit
		this.form.name.disable();
		this.form.company.disable();
		this.form.email.disable();
		this.form.tel.disable();
		this.form.address.disable();
	}

	maskEventPhone(event) {
		this.maskPhone = '(00) 0000-0000||(00) 0 0000-0000'
	}
}
