import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../_services/customer.service';
import { Customer } from '../../../models/customer';
import { EmailValidator, CpfCnpjValidator, NameValidator } from '../../../_helpers/validations';
import { cpfCnpjMask, phoneMask } from '../../../_helpers/utils';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	customer: Customer[];
	formCustomer: FormGroup;
	submitted: boolean = false;
	maskCpf: string = '000.000.000-00||00.000.000/0000-00';
	maskPhone: string = '(00) 0000-0000||(00) 0 0000-0000';
	customerId: number;
	loading = false;

	public onlyNumber = { '0': { pattern: new RegExp('\[0-9\]') } };
	public emailParttner = { '0': { pattern: new RegExp('\/\S+@\S+\.\S+/]') } };
	constructor(
		private customerService: CustomerService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute
	) {
		if (this.activeRoute.snapshot.params.id) {
			this.customerId = this.activeRoute.snapshot.params.id;
			this.getCustomerById(this.customerId)
		} else {
			this.loading = true
		}
	}

	getCustomerById(id) {
		this.customerService.getCustomerById(id).subscribe((e: Customer) => {
			this.formCustomer.patchValue(e)
			this.maskCpf = cpfCnpjMask(this.formCustomer.value.document)
			this.maskPhone = phoneMask(this.formCustomer.value.tel)
			this.loading = true
		})
	}

	ngOnInit(): void {
		this.createForm();
	}

	createForm() {
		this.formCustomer = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.email],
			tel: [''],
			tel2: [''],
			document: [''],
			address: [''],
			anotation: [''],
		},
			{
				validators: [CpfCnpjValidator('document'), NameValidator('name')]
			})
	}



	get form() { return this.formCustomer.controls; }

	onSubmit() {
		this.submitted = true;
		let service = this.customerService.saveCustomer(this.formCustomer.value)
		if (this.formCustomer.invalid) {
			this.submitted = false;
			return;
		}

		if (this.customerId) {
			service = this.customerService.updateCustomer(this.customerId, this.formCustomer.value)
		}

		service.subscribe(() => {
			this.submitted = false;
			this.router.navigateByUrl("/customers");
		});
	}

	isValidInput(fieldName): boolean {
		return this.formCustomer.controls[fieldName].invalid &&
			(this.formCustomer.controls[fieldName].dirty || this.formCustomer.controls[fieldName].touched);
	}

	maskEvent() {
		this.maskCpf = '000.000.000-00||00.000.000/0000-00'
	}

	maskEventPhone() {
		this.maskPhone = '(00) 0000-0000||(00) 0 0000-0000'
	}

}

