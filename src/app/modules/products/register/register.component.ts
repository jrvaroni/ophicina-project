import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../_services/product.service';
import { Product } from '../../../models/product';
import { converterPrice } from '../../../_helpers/utils'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	product: Product[];
	formProduct: FormGroup;
	submitted: boolean = false;

	productId: number;

	constructor(
		private productService: ProductService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute
	) {
		if (this.activeRoute.snapshot.params.id) {
			this.productId = this.activeRoute.snapshot.params.id;
			this.getProductById(this.productId)
		}
	}

	getProductById(id) {
		this.productService.getProductById(id).subscribe((e: Product) => {
			let itens = {
				...e,
				price: converterPrice(e.price)
			}
			this.formProduct.patchValue(itens)
		})
	}

	ngOnInit(): void {
		this.createForm();
	}

	createForm() {
		this.formProduct = this.formBuilder.group({
			cod: [''],
			name: ['', Validators.required],
			price: ['', Validators.required],
			qtd: [''],
			qtdMin: ['']
		})
	}

	get form() { return this.formProduct.controls; }

	onSubmit() {
		this.submitted = true;
		let service = this.productService.saveProduct(this.formProduct.value)
		if (this.formProduct.invalid) {
			this.submitted = false;
			return;
		}

		if (this.productId) {
			service = this.productService.updateProduct(this.productId, this.formProduct.value)
		}

		service.subscribe(() => {
			this.submitted = false;
			this.router.navigateByUrl("/products");
		});
	}

	isValidInput(fieldName): boolean {
		return this.formProduct.controls[fieldName].invalid &&
			(this.formProduct.controls[fieldName].dirty || this.formProduct.controls[fieldName].touched);
	}

}

