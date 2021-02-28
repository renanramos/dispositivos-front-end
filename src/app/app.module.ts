import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceModule } from './device/device.module';
import { HttpClientModule } from '@angular/common/http';
import { AddButtonComponent } from './device/shared/components/add-button/add-button.component';
import { DialogAlertModule } from './device/shared/alert/alert-modal.module';

@NgModule({
	declarations: [AppComponent, AddButtonComponent],
	imports: [
		BrowserModule,
		BsDropdownModule.forRoot(),
		TooltipModule.forRoot(),
		ModalModule.forRoot(),
		AppRoutingModule,
		DeviceModule,
		HttpClientModule,
		DialogAlertModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
