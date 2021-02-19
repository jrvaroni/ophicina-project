import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderServicesComponent } from './order_service.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		component: OrderServicesComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrderServicesRoutingModule { }
