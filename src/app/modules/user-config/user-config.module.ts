import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserConfigComponent } from './user-config.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserConfigRoutingModule } from './user-config-routing.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
	declarations: [UserConfigComponent],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		NgbModule,
		UserConfigRoutingModule,
		NgxMaskModule.forRoot()
	]
})
export class UserConfigModule { }
