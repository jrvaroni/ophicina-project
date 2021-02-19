import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../models/product';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlert } from '../../components/modal-alert/modal.component';

@Component({
	selector: 'app-Products',
	templateUrl: './Products.component.html',
	styleUrls: ['./Products.component.scss']
})
export class ProductsComponent implements OnInit {

	products: Product[]
	filter: string;

	constructor(
		private productService: ProductService,
		private router: Router,
		private modalService: NgbModal,
		config: NgbModalConfig
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit(): void {
		this.getCustomers();
	}

	getCustomers() {
		this.productService.getProducts().subscribe(products => {
			this.products = products;
		});
	}

	open(item: Product) {
		const modalRef = this.modalService.open(ModalAlert, { centered: true });
		modalRef.componentInstance.item = item;

		modalRef.result.then((result) => {
			if (result === 'exclude') {
				this.productService.deleteProduct(item).subscribe(() => {
					this.getCustomers();
				})
			}
		})
	}

	edit(item: Product) {
		this.router.navigateByUrl(`/products/register/${item.id}`);
	}


}
