import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalAlert } from './modal.component';

@NgModule({
	imports: [NgbModule, CommonModule],
	declarations: [ModalAlert],
	exports: [ModalAlert],
	bootstrap: [ModalAlert],
	entryComponents: [ModalAlert]
})
export class ModalAlertModule { }
