import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { User } from '../../models/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	user: User[];
	formUser: FormGroup;
	submitted: boolean = false;
	error: boolean = false;

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private tokenStorage: TokenStorageService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.createForm();
	}

	createForm() {
		this.formUser = this.formBuilder.group({
			email: new FormControl(),
			password: new FormControl()
		})
	}

	onSubmit() {
		this.submitted = true;
		this.error = false;
		if (this.formUser.invalid) {
			this.submitted = false;
			return;
		}

		this.userService.login(this.formUser.value).subscribe((e) => {
			this.tokenStorage.saveToken(e.token);
			this.tokenStorage.saveUser(e.user)
			this.router.navigateByUrl("/");
		}, err => {
			this.submitted = false;
			this.error = true;
		});
	}
}
