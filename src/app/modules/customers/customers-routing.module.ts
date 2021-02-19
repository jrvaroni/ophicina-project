import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		component: CustomersComponent
	},
	{
		path: 'register',
		component: RegisterComponent
	},
	{
		path: 'register/:id',
		component: RegisterComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CustomersRoutingModule { }
