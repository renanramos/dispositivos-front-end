import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceFormComponent } from './device-form/device-form.component';
import { SpanErrorComponent } from './shared/components/span-error/span-error.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DeviceSearchComponent } from './device-search/device-search.component';

const routes: Routes = [{ path: 'novo', component: DeviceFormComponent }];

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	declarations: [DeviceListComponent, DeviceFormComponent, SpanErrorComponent, DeviceSearchComponent],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ReactiveFormsModule,
		NgxMaskModule.forRoot()
	],
	exports: [RouterModule]
})
export class DeviceModule {}
