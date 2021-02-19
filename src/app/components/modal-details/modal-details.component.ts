import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { phoneMask } from '../../_helpers/utils';
import { IorserService } from '../../models/order-service';
import { OrderServiceService } from '../../_services/order-service.service';
import { converterPrice } from '../../_helpers/utils'
import { TokenStorageService } from '../../_services/token-storage.service';
import { IUser } from '../../models/user';

@Component({
	selector: 'ngbd-modal-details-content',
	templateUrl: './modal-details.component.html',
	styleUrls: ['./modal-details.component.scss']
})
export class ModalDetails {

	@Input() item: IorserService;
	@Input() type: string;
	@Input() filterOpt: string;

	orderService: IorserService;
	user: IUser;

	constructor(
		public activeModal: NgbActiveModal,
		private orderServiceService: OrderServiceService,
		private tokenStorage: TokenStorageService
	) {
		this.user = tokenStorage.getUser()
	}

	ngOnInit(): void {
		this.orderServiceService.getOrderServiceById(this.item.id).subscribe(order => {
			this.orderService = order;
			console.log(this.orderService)
		})


	}

	maskPhone(val) {
		return phoneMask(val)
	}

	sumItens(qtd, value) {
		const val = this.converterPrice(value);
		return qtd * val;
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

	print() {
		window.print();
	}
}
