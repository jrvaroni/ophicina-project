import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LoginComponent],
	exports: [LoginComponent],
	imports: [
		CommonModule,
		LoginRoutingModule,
		RouterModule,
		ReactiveFormsModule
	]
})
export class LoginModule { }
