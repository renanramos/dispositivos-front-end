import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceViewComponent } from './device-view/device-view.component';



@NgModule({
  declarations: [DeviceListComponent, DeviceViewComponent],
  imports: [
    CommonModule
  ],
  exports: [RouterModule]
})
export class DeviceModule { }
