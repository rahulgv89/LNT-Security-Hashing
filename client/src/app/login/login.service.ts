import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {

	url = 'http://localhost:3000/api/user/login';
	userInfo;
	
	constructor(private http: HttpClient) { }

	validateLogin(user: User) {
		return this.http.post(this.url, user).pipe(
			map(response => {
				this.userInfo = response;
				return response;
			})
		)
	}

	get isLoggedIn() {
		return this.userInfo.isLoggedIn;
	}

	addUser(user: User) {
		return this.http.post('http://localhost:3000/api/user/create', user)
	}
}