import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Customer } from '../models/customer';
import { environment } from '../../../environments/environment'
import { TokenStorageService } from './token-storage.service'
@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	url = `${environment.baseUrl}/customer`

	// injetando o HttpClient
	constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

	// Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.tokenStorageService.getToken()}`
		})
	}


	getCustomers(): Observable<Customer[]> {
		return this.httpClient.get<Customer[]>(this.url, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError))
	}

	getCustomerById(id: number): Observable<Customer> {
		return this.httpClient.get<Customer>(`${this.url}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	saveCustomer(Customer: Customer): Observable<Customer> {
		return this.httpClient.post<Customer>(`${this.url}/register`, JSON.stringify(Customer), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	updateCustomer(id, Customer: Customer): Observable<Customer> {
		return this.httpClient.put<Customer>(`${this.url}/update/${id}`, JSON.stringify(Customer), this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	deleteCustomer(Customer: Customer) {
		return this.httpClient.delete<Customer>(`${this.url}/delete/${Customer.id}`, this.httpOptions)
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
