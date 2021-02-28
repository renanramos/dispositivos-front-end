import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';

@NgModule({
  declarations: [DialogAlertComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DialogAlertComponent],
  entryComponents: [DialogAlertComponent]
})
export class DialogAlertModule { }