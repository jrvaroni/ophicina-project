import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-aside-menu',
	templateUrl: './aside-menu.component.html',
	styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent implements OnInit {

	@Input() canvas: boolean;

	constructor() { }

	ngOnInit(): void {
	}

}
