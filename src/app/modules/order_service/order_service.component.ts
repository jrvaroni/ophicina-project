import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from '../../_services/order-service.service';
import { OrderService, IorserService } from '../../models';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalDetails } from '../../components/modal-details/modal-details.component';

@Component({
	selector: 'app-OrderServices',
	templateUrl: './order_service.component.html',
	styleUrls: ['./order_service.component.scss']
})
export class OrderServicesComponent implements OnInit {

	orderService: OrderService[]
	filter: string;
	filterOpt: string = 'Pagos';

	constructor(
		private orderServiceService: OrderServiceService,
		private modalService: NgbModal,
		config: NgbModalConfig
	) {
		config.backdrop = 'static';
		config.keyboard = false;
	}

	ngOnInit(): void {
		this.getOrserService(1);
	}

	getOrserService(status) {
		this.orderServiceService.getOrderServices(`status=${status}`).subscribe(orderService => {
			this.orderService = orderService;
		});
	}

	openDetail(item: IorserService, type = '') {
		const modalRef = this.modalService.open(ModalDetails, { size: 'lg' });
		modalRef.componentInstance.item = item;
		modalRef.componentInstance.type = type;
		modalRef.componentInstance.filterOpt = this.filterOpt;

		modalRef.result.then((result) => {
			if (result === 'closeOrder') {
				this.orderServiceService.changeStatusOrderService(item.id, item.status).subscribe(() => {
					this.getOrserService(item.status);
				})
			}
		})
	}

	changeFilter(status) {
		this.filterOpt = status ? 'Pagos' : 'Em aberto'
		this.getOrserService(status)
	}


}
