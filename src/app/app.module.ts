import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

//plugins
import { NgxMaskModule, IConfig } from 'ngx-mask'

// modules
import { EventsModule } from './modules/events/events.module'
import { HeaderModule } from './modules/header/header.module'
import { FeedModule } from './modules/feed/feed.module'
import { AsideMenuModule } from './modules/aside-menu/aside-menu.module'
import { CustomersModule } from './modules/customers/customers.module'
import { ProductsModule } from './modules/products/products.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	imports: [
		BrowserModule,
		NgbModule,
		AppRoutingModule,
		HttpClientModule,
		HeaderModule,
		EventsModule,
		FeedModule,
		AsideMenuModule,
		CustomersModule,
		ProductsModule,
		NgxMaskModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	declarations: [
		AppComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
