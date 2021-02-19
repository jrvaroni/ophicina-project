import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { OrderServiceService } from '../../../_services/order-service.service';
import { ProductService } from '../../../_services/product.service';
import { CustomerService } from '../../../_services/customer.service';
import { OrderService, Customer, Product } from '../../../models';
import { converterPrice } from '../../../_helpers/utils'
import {
	NgbCalendar,
	NgbDate,
	NgbDateStruct,
	NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { DateValidator } from '../../../_helpers/validations';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

	@ViewChild("open") datePickerOpen: any;
	@ViewChild("close") datePickerClose: any;

	loadingForm: boolean = false;
	orderServiceForm: FormGroup;
	customers: Customer[] = [];
	products: Product[] = [];

	product: OrderService[];
	formOrderService: FormGroup;
	submitted: boolean = false;

	model: NgbDateStruct;

	orderId: number;

	constructor(
		private orderService: OrderServiceService,
		private customerService: CustomerService,
		private productService: ProductService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		config: NgSelectConfig,
		datepickerConfig: NgbInputDatepickerConfig,
		calendar: NgbCalendar
	) {
		config.notFoundText = 'Cliente não encontrado';
		datepickerConfig.minDate = { year: 1900, month: 1, day: 1 };
		datepickerConfig.maxDate = { year: 2099, month: 12, day: 31 };
		datepickerConfig.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
		datepickerConfig.placement = ['bottom-left', 'bottom-right'];
		// if (this.activeRoute.snapshot.params.id) {
		// 	this.orderId = this.activeRoute.snapshot.params.id;
		// 	this.getProductById(this.orderId)
		// }
	}

	getCustomers() {
		this.customerService.getCustomers().subscribe(customers => {
			this.customers = customers;
		})
	}

	getProducts() {
		this.productService.getProducts().subscribe(products => {
			// this.products = products;


			this.products = products.map(e => ({
				...e,
				price: this.converterPrice(e.price)
			}));
		})
	}

	ngOnInit(): void {
		this.getCustomers();
		this.getProducts();
		this.createForm();
	}

	createForm() {
		this.formOrderService = this.formBuilder.group({
			orderService: this.formBuilder.group({
				customerId: [null, Validators.required],
				openDate: ['', Validators.required],
				status: ['', Validators.required],
				closeDate: [''],
				car: [''],
				enterKm: [''],
				exitedKm: [''],
				carLicensePlate: [''],
				totalValue: [''],
				anotation: ['']
			},
				{
					validators: [DateValidator('openDate')]
				}),
			product: new FormArray([]),
			service: new FormArray([])
		})
		this.loadingForm = true;
	}

	// dynamic form
	get form() { return this.formOrderService.controls; }
	get orderF() { return this.form.orderService as FormGroup; }
	get productF() { return this.form.product as FormArray; }
	get serviceF() { return this.form.service as FormArray; }
	get productFormGroups() { return this.productF.controls as FormGroup[]; }
	get serviceFormGroups() { return this.serviceF.controls as FormGroup[]; }

	addProduct() {
		this.productF.push(this.formBuilder.group({
			id: [null, Validators.required],
			name: ['', Validators.required],
			unitPrice: ['', Validators.required],
			qtd: ['', Validators.required]
		}));
	}

	removeProduct(index) {
		this.productF.removeAt(index);
	}

	addService() {
		this.serviceF.push(this.formBuilder.group({
			value: ['', Validators.required],
			anotation: ['', Validators.required]
		}));
	}

	removeService(index) {
		this.serviceF.removeAt(index);
	}

	changedValue(eventId, index) {
		let product = this.products.filter(e => e.id === eventId)
		let controls = this.productFormGroups[index].controls;
		controls.name.setValue(product[0].name);
		controls.unitPrice.setValue(product[0].price);
		controls.qtd.setValue(1);
	}


	checkEmptyValue(type, index) {
		if (type === 'service') {
			return this.serviceFormGroups[index].controls.value.value ? 'R$ ' : ''
		} else {
			return this.productFormGroups[index].controls.unitPrice.value ? 'R$ ' : ''
		}

	}

	onSubmit() {
		this.submitted = true;

		if (this.formOrderService.invalid) {
			this.submitted = false;
			return;
		} else {

			// não funcionou
			this.orderF.controls.openDate.setValue(this.translateDate(this.orderF.controls.openDate.value))
			this.orderF.controls.closeDate.setValue(this.translateDate(this.orderF.controls.closeDate.value))
			let service = this.orderService.saveOrderService(this.formOrderService.value)


			if (this.orderId) {
				service = this.orderService.updateOrderService(this.orderId, this.formOrderService.value)
			}

			service.subscribe(() => {
				this.submitted = false;
				this.router.navigateByUrl("/");
			});
		}
	}

	translateDate(date) {
		if (date) {
			return new Date(`${date.year}/${date.month}/${date.day}`)
		} else {
			return ''
		}
	}

	getTotalValue() {
		const product = this.productFormGroups.reduce((sum, current) => sum + current.controls.unitPrice.value * current.controls.qtd.value, 0);
		const service = this.serviceFormGroups.reduce((sum, current) => sum + this.converterPrice(current.controls.value.value), 0);
		let sum = product + service;
		this.orderF.controls.totalValue.setValue(sum);
		return sum;
	}


	isValidInput(fieldName): boolean {
		return this.orderF.controls[fieldName].invalid &&
			(this.orderF.controls[fieldName].dirty || this.orderF.controls[fieldName].touched);
	}

	converterPrice(value) {
		if (value === "") {
			value = 0;
		} else {
			value = value.replace(",", ",");
			value = parseFloat(value);
		}
		return value;
	}


}

