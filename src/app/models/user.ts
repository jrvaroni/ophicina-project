export interface IUser {
	id: number;
	name: string;
	email: string;
	company: string;
	password: string;
	token: string;
	address: string;
	tel: number;
}

export interface User {
	token: string;
	user: User
}
