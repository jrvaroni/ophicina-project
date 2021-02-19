import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPipe } from './';

@NgModule({
	declarations: [CustomerPipe],
	exports: [CustomerPipe],
	imports: [
		CommonModule
	]
})
export class PipesModule { }
