import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	@Output() offCanvas: EventEmitter<any> = new EventEmitter();
	@Input() isMobile: boolean;
	visible: boolean = false;

	public isCollapsed = false;

	constructor(
		private tokenStorage: TokenStorageService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.toggle()
	}


	toggle() {
		if (this.isMobile) {
			this.isCollapsed = !this.isCollapsed;
		} else {
			this.visible = !this.visible;
			this.offCanvas.emit(this.visible);
		}
	}

	signOut() {
		this.tokenStorage.signOut();
		this.router.navigateByUrl("/login");
	}

	goToUser() {
		this.router.navigateByUrl("/my-page");
	}
}
