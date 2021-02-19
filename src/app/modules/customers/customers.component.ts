import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';
import { Customer } from '../../models/customer';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlert } from '../../components/modal-alert/modal.component';
import { cpfCnpjMask, phoneMask } from '../../_helpers/utils';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	customers: Customer[]
	filter: string;

	constructor(
		private customerService: CustomerService,
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
		this.customerService.getCustomers().subscribe(customers => {
			this.customers = customers;
		});
	}

	open(item: Customer) {
		const modalRef = this.modalService.open(ModalAlert, { centered: true });
		modalRef.componentInstance.item = item;

		modalRef.result.then((result) => {
			if (result === 'exclude') {
				this.customerService.deleteCustomer(item).subscribe(() => {
					this.getCustomers();
				})
			}
		})
	}

	edit(item: Customer) {
		this.router.navigateByUrl(`/customers/register/${item.id}`);
	}

	maskCpf(val) {
		return cpfCnpjMask(val)
	}

	maskPhone(val) {
		return phoneMask(val)
	}

}
