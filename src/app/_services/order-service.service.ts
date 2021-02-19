import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { OrderService, IorserService, IStatus } from '../models/order-service';
import { environment } from '../../../environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class OrderServiceService {

	url = `${environment.baseUrl}/service`

	// injetando o HttpClient
	constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

	// Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.tokenStorageService.getToken()}`
		})
	}


	getOrderServices(queryParam: string = ''): Observable<OrderService[]> {
		const newUrl = queryParam ? `${this.url}?${queryParam}` : this.url
		return this.httpClient.get<OrderService[]>(newUrl, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError))
	}

	getOrderServiceById(id: number): Observable<IorserService> {
		return this.httpClient.get<IorserService>(`${this.url}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	saveOrderService(OrderService: OrderService): Observable<OrderService> {
		return this.httpClient.post<OrderService>(`${this.url}/register`, JSON.stringify(OrderService), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	updateOrderService(id, OrderService: OrderService): Observable<OrderService> {
		return this.httpClient.put<OrderService>(`${this.url}/update/${id}`, JSON.stringify(OrderService), this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	deleteOrderService(OrderService: OrderService) {
		return this.httpClient.delete<OrderService>(`${this.url}/delete/${OrderService.orderService.id}`, this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}


	changeStatusOrderService(id, status: IStatus): Observable<IStatus> {
		return this.httpClient.put<IStatus>(`${this.url}/status/${id}`, JSON.stringify({ status: !status }), this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	handleError(error: HttpErrorResponse) {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// Erro ocorreu no lado do client
			errorMessage = error.error.message;
		} else {
			// Erro ocorreu no lado do servidor
			errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	};

}
