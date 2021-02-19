import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { RegisterComponent } from './register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { ProductPipe } from '../../_helpers/pipes';

@NgModule({
	declarations: [ProductsComponent, RegisterComponent, ProductPipe],
	exports: [ProductsComponent],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		NgxMaskModule.forRoot()
	]
})
export class ProductsModule { }
