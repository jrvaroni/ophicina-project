import { Component, OnInit } from '@angular/core'
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'platform';
	user = false;
	isLoggedIn = false;
	isMobile = false;

	routeSubscription: Subscription;

	constructor(
		//private accountService: AccountService
		private router: Router,
		private tokenStorageService: TokenStorageService
	) {
		//this.accountService.user.subscribe(x => this.user = x);
		if (window.innerWidth < 600) {
			this.isMobile = true;
		}
	}

	ngOnInit() {
		this.routeSubscription = this.router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				this.isLoggedIn = !!this.tokenStorageService.getToken()
			}
		});
	}

	logout() {
		//this.accountService.logout();
	}

	public canvas = false;

	offCanvas($event): void {
		this.canvas = $event;
	}
}
