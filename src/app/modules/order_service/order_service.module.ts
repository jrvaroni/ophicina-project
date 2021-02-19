import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { OrderServicesComponent } from './order_service.component';
import { OrderServicesRoutingModule } from './order_service-routing.module';
import { RegisterComponent } from './register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalDetailsModule } from '../../components/modal-details/modal-details.module';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatePTParserFormatter } from '../../_helpers/utils/NgbDatePTParserFormatter';
import { CustomDatepickerI18n, I18n } from '../../_helpers/utils/CustomDatepickerI18n';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '../../_helpers/pipes/pipes.module';

@NgModule({
	declarations: [OrderServicesComponent, RegisterComponent],
	exports: [OrderServicesComponent],
	imports: [
		CommonModule,
		OrderServicesRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		RouterModule,
		NgSelectModule,
		NgxMaskModule.forRoot(),
		ModalDetailsModule,
		NgbModule,
		PipesModule
	],
	providers: [
		[I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
		[{ provide: NgbDateParserFormatter, useClass: NgbDatePTParserFormatter }]
	]
})
export class OrderServicesModule { }
