import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideMenuComponent } from './aside-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [AsideMenuComponent],
	exports: [AsideMenuComponent],
	imports: [
		CommonModule,
		RouterModule
	]
})
export class AsideMenuModule { }
