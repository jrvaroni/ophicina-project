import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '../../_helpers/pipes/pipes.module';
import { ModalAlertModule } from '../../components/modal-alert/modal.module';

@NgModule({
	declarations: [CustomersComponent, RegisterComponent],
	exports: [CustomersComponent],
	imports: [
		CommonModule,
		CustomersRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		NgxMaskModule.forRoot(),
		ModalAlertModule,
		PipesModule
	]
})
export class CustomersModule { }
