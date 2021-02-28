import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { Device } from '../device';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(private modalService: BsModalService){ }

  openAlertModal(message: string, isDeleting?: boolean, device?: Device) {
   return this.modalService.show(DialogAlertComponent, {
        initialState: {
          message: message, 
          device: device,
          isDeleting: isDeleting
        },
        animated: true,
        ignoreBackdropClick: true,
        keyboard: true
      });
  }
}