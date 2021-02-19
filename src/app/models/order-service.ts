import { Customer } from './customer';

export interface IorderServiceProducts {
	OrderServiceId: number;
	id: number;
	anotation: string;
	servicePrice: string;
}

export interface IorderServiceService {
	OrderServiceId: number;
	ProductsId: number;
	id: number;
	prodName: string;
	prodQdt: number;
	prodUnitPrice: string;
}

export interface IorserService extends Array<IorderServiceProducts | IorderServiceService> {
	id: number;
	customerId: number;
	openDate: Date;
	status: IStatus;
	totalValue: number;
	anotation: string;
	closeDate: Date;
	car: string;
	enterKm: number;
	exitedKm: number;
	carLicensePlate: string;
	customer: Customer;
	order_service_products: IorderServiceProducts;
	order_service_services: IorderServiceService;
}

export interface Iproduct {
	id: number;
	name: string;
	unitPrice: number;
	qtd: number;
}

export interface Iservice {
	value: number;
	anotation: string;
}

export interface OrderService extends Array<IorserService | Iproduct | Iservice> {
	orderService: IorserService;
	product: Array<Iproduct>;
	service: Array<Iservice>
}

export interface IStatus {
	status: boolean;
}
