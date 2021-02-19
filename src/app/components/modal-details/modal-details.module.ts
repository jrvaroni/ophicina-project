import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { ModalDetails } from './modal-details.component';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
	imports: [NgbModule, CommonModule, NgxMaskModule.forRoot(), NgxPrintModule],
	declarations: [ModalDetails],
	exports: [ModalDetails],
	bootstrap: [ModalDetails],
	entryComponents: [ModalDetails]
})
export class ModalDetailsModule { }
