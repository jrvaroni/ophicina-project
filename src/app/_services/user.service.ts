import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User, IUser } from '../models/user';
import { environment } from '../../../environments/environment'
import { TokenStorageService } from './token-storage.service'
@Injectable({
	providedIn: 'root'
})
export class UserService {

	url = environment.baseUrl;

	// injetando o HttpClient
	constructor(private httpClient: HttpClient, private tokenStorageService: TokenStorageService) { }

	// Headers
	httpOptionsSimple = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.tokenStorageService.getToken()}`
		})
	}

	login(User: User): Observable<User> {
		return this.httpClient.post<User>(`${this.url}/login`, JSON.stringify(User), this.httpOptionsSimple)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	// Obtem todos os Userros
	getUsers(): Observable<User[]> {
		return this.httpClient.get<User[]>(this.url)
			.pipe(
				retry(2),
				catchError(this.handleError))
	}

	// Obtem um Userro pelo id
	getUserById(id: number): Observable<User> {
		return this.httpClient.get<User>(this.url + '/get-user/' + id, this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	// salva um Userro
	saveUser(User: User): Observable<User> {
		return this.httpClient.post<User>(this.url, JSON.stringify(User), this.httpOptions)
			.pipe(
				retry(2),
				catchError(this.handleError)
			)
	}

	// utualiza um Userro
	updateUser(id, User: IUser): Observable<User> {
		return this.httpClient.put<User>(this.url + '/update/' + id, JSON.stringify(User), this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	// deleta um Userro
	deleteUser(User: IUser) {
		return this.httpClient.delete<User>(this.url + '/' + User.id, this.httpOptions)
			.pipe(
				retry(1),
				catchError(this.handleError)
			)
	}

	// Manipulação de erros
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
