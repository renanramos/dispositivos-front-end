import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Device } from '../../device';

@Component({
	selector: 'device-dialog-alert',
	templateUrl: './dialog-alert.component.html',
	styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {
	message: string;
	device: Device;
	isDeleting: boolean = true;

	constructor(private dialogAlertRef: BsModalRef) {}

	ngOnInit() {}

	confirm() {
		this.dialogAlertRef.onHidden.next(true);
		this.closeDialog();
	}

	closeDialog() {
		this.dialogAlertRef.hide();
	}
}
