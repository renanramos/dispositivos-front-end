import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceViewComponent } from './device-view/device-view.component';
import { DeviceFormComponent } from './device-form/device-form.component';

const routes: Routes = [
  { path: 'novo', component: DeviceFormComponent }
];

@NgModule({
  declarations: [DeviceListComponent, DeviceViewComponent, DeviceFormComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class DeviceModule { }
