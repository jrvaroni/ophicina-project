import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guards'
const routes: Routes = [
	{
		path: 'customers',
		canActivate: [AuthGuard],
		loadChildren: () => import(`./modules/customers/customers.module`).then(e => e.CustomersModule)
	},
	{
		path: 'products',
		canActivate: [AuthGuard],
		loadChildren: () => import(`./modules/products/products.module`).then(e => e.ProductsModule)
	},
	{
		path: '',
		canActivate: [AuthGuard],
		loadChildren: () => import(`./modules/order_service/order_service.module`).then(e => e.OrderServicesModule)
	},
	{
		path: 'my-page',
		canActivate: [AuthGuard],
		loadChildren: () => import(`./modules/user-config/user-config.module`).then(e => e.UserConfigModule)
	},
	{
		path: 'login',
		loadChildren: () => import(`./modules/login/login.module`).then(e => e.LoginModule)
	},
	{
		path: '**',
		redirectTo: '',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
