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
import { DialogAlertComponent } from './device/shared/alert/dialog-alert/dialog-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AddButtonComponent,
    DialogAlertComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    DeviceModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogAlertComponent]
})
export class AppModule { }
