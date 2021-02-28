import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceApiService } from '../device-api.service';
import { Device } from '../shared/device';
import { tap, map, debounceTime } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeviceFormComponent } from '../device-form/device-form.component';
import { AlertDialogService } from '../shared/alert/alert-modal.service';
import { DialogAlertComponent } from '../shared/alert/dialog-alert/dialog-alert.component';
import { Subscription } from 'rxjs';
import { DialogService } from '../shared/service/dialog-service/dialog-service.service';
import { SearchService } from '../shared/service/search-service/search-service.service';

@Component({
	selector: 'device-device-list',
	templateUrl: './device-list.component.html',
	styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
	devices: any[];
	device: Device;
	showAlert = false;
	deviceFormModalRef: BsModalRef<DeviceFormComponent>;
	alertModalRef: BsModalRef<DialogAlertComponent>;
	dialogSubscription: Subscription;
	searchSubscription: Subscription;
	searchModelo: string = '';

	constructor(
		private deviceService: DeviceApiService,
		private alertDialogService: AlertDialogService,
		private modalService: BsModalService,
		private dialogService: DialogService,
		private searchService: SearchService
	) {}

	async ngOnInit() {
		await this.loadDevices();
		this.subscribeToDialogService();
		this.subscribeToSearchService();
	}

	subscribeToSearchService() {
		this.searchSubscription = this.searchService
			.getSearchTypedValue()
			.pipe(debounceTime(300))
			.subscribe(modelo => {
				if (modelo) {
					this.searchModelo = modelo;
					this.pesquisarModelo();
				} else {
					this.loadDevices();
				}
			});
	}

	ngOnDestroy() {
		this.dialogSubscription && this.dialogSubscription.unsubscribe();
		this.searchSubscription && this.searchSubscription.unsubscribe();
	}

	subscribeToDialogService() {
		this.dialogSubscription = this.dialogService
			.getDialogResponse()
			.subscribe(value => value && this.loadDevices());
	}

	async loadDevices() {
		const devicesReceived = {
			next: (devices: Device[]) => {
				if (devices.length) {
					this.devices = devices;
				}
			},
			error: response => {
				this.alertDialogService.openAlertModal(response.error.message);
			}
		};

		await this.deviceService
			.getAllDevices()
			.pipe(tap(devicesReceived))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}

	editarDevice(device: Device) {
		this.deviceFormModalRef = this.modalService.show(DeviceFormComponent, {
			initialState: { device: device },
			animated: true,
			backdrop: false
		});

		this.deviceFormModalRef.onHidden.subscribe(() => this.loadDevices());
	}

	modalExcluiDispositivo(device: Device) {
		this.device = device;
		this.alertModalRef = this.alertDialogService.openAlertModal(
			`Tem certeza que deseja excluir o dispositivo ${device.device_modelo}?`,
			true,
			device
		);
		this.alertModalRef.onHidden.subscribe(
			res =>
				typeof res === 'boolean'
					? this.excluirDispositivo(device)
					: this.loadDevices()
		);
	}

	excluirDispositivo(device: Device) {
		this.deviceService.deleteDevice(device).subscribe((response: any) => {
			if (response.status === 200) {
				this.loadDevices();
			}
		});
	}

	pesquisarModelo() {
		const deviceSearched = {
			next: response => {
				this.devices = response;
				this.showAlert = true;
			},
			error: response => {
				this.alertDialogService
					.openAlertModal(response.error.message)
					.onHide.asObservable()
					.subscribe(() => this.searchService.clearField());
				this.searchModelo = '';
			}
		};

		this.deviceService
			.getByModelo(this.searchModelo)
			.pipe(tap(deviceSearched))
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}
}
