import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeviceFormComponent } from 'src/app/device/device-form/device-form.component';

@Component({
	selector: 'device-add-button',
	templateUrl: './add-button.component.html',
	styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
	constructor(private modalService: BsModalService) {}

	ngOnInit() {}

	addNewDevice() {
		this.modalService.show(DeviceFormComponent, {
			id: 1,
			animated: true,
			ignoreBackdropClick: true
		});
	}
}
