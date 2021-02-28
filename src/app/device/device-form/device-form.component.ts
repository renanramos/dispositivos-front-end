import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Device } from '../shared/device';
import { DeviceApiService } from '../device-api.service';
import { DialogService } from '../shared/service/dialog-service/dialog-service.service';

@Component({
	selector: 'device-device-form',
	templateUrl: './device-form.component.html',
	styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {
	deviceForm: FormGroup;
	device: Device;
	isFormSubmitted: boolean = false;
	isUpdateOperation: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private deviceService: DeviceApiService,
		private deviceFormModalRef: BsModalRef<DeviceFormComponent>,
		private dialogService: DialogService
	) {}

	ngOnInit() {
		this.setDeviceValueToForm();
		this.deviceFormInit();
	}

	setDeviceValueToForm() {
		this.device = this.device ? this.device : new Device();
		this.isUpdateOperation = !!this.device['device_id'];
	}

	/**
   * Inicializa as propriedades do formulário
   */
	deviceFormInit() {
		this.deviceForm = this.formBuilder.group({
			id: [this.device.device_id],
			modelo: [this.device.device_modelo, Validators.required],
			fabricante: [this.device.device_fabricante, Validators.required],
			capacidadeArmazenamento: [
				this.device.device_capacidade_armazenamento,
				Validators.required
			],
			tamanhoTela: [this.device.device_tamanho_tela, Validators.required],
			versaoSO: [this.device.device_versao_so, Validators.required]
		});
	}

	get modelo() {
		return this.deviceForm.get('modelo');
	}

	get fabricante() {
		return this.deviceForm.get('fabricante');
	}

	get capacidadeArmazenamento() {
		return this.deviceForm.get('capacidadeArmazenamento');
	}

	get tamanhoTela() {
		return this.deviceForm.get('tamanhoTela');
	}

	get versaoSO() {
		return this.deviceForm.get('versaoSO');
	}

	onSubmit() {
		this.isFormSubmitted = true;
		if (this.deviceForm.valid) {
			this.saveDevice();
		}
	}

	saveDevice() {
		const device: Device = this.getDeviceValuesFromForm();
		device['device_id'] ? this.updateDevice(device) : this.createDevice(device);
	}

	createDevice(device: Device) {
		const createdDevice = {
			next: response => {
				if (response) {
					this.dialogService.dialogClosed(response);
					this.deviceFormModalRef.hide();
				}
			},
			error: response => {
				console.log(response);
			}
		};

		this.deviceService
			.createNewDevice(device)
			.pipe(tap(createdDevice))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	updateDevice(device: Device) {
		const updatedDevice = {
			next: response => {
				if (response.status === 200) {
					this.deviceFormModalRef.hide();
				}
			},
			error: response => {
				console.log(response);
			}
		};

		this.deviceService
			.updateDevice(device)
			.pipe(tap(updatedDevice))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	getDeviceValuesFromForm(): Device {
		return {
			device_id: this.device.device_id,
			device_modelo: this.modelo.value,
			device_fabricante: this.fabricante.value,
			device_capacidade_armazenamento: Number(
				this.capacidadeArmazenamento.value
			),
			device_tamanho_tela: Number(this.tamanhoTela.value),
			device_versao_so: this.versaoSO.value
		};
	}

	closeModal() {
		this.deviceFormModalRef.hide();
	}
}
