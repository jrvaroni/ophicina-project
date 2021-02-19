import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/Product';
import { environment } from '../../../environments/environment'
import { TokenStorageService } from './token-storage.service'
@Injectable({
	providedIn: 'root'
})
export class ProductService {

	url = `${environment.baseUrl}/product`

	// injetando o HttpClient
	constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

	// Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.tokenStorageService.getToken()}`
		})
	}


	getProducts(): Observable<Product[]> {
		return this.httpClient.get<Product[]>(this.url, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError))
	}

	getProductById(id: number): Observable<Product> {
		return this.httpClient.get<Product>(`${this.url}/${id}`, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	saveProduct(Product: Product): Observable<Product> {
		return this.httpClient.post<Product>(`${this.url}/register`, JSON.stringify(Product), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	updateProduct(id, Product: Product): Observable<Product> {
		return this.httpClient.put<Product>(`${this.url}/update/${id}`, JSON.stringify(Product), this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	deleteProduct(Product: Product) {
		return this.httpClient.delete<Product>(`${this.url}/delete/${Product.id}`, this.httpOptions)
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
