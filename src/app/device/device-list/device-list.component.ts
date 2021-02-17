import { Component, OnInit } from '@angular/core';
import { DeviceApiService } from '../device-api.service';
import { Device } from '../shared/device';
import { Router } from '@angular/router';
import { tap, map } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeviceFormComponent } from "../device-form/device-form.component";

declare var $: any;

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class DeviceListComponent implements OnInit {
  searchModelo = "";
  devices: any[];
  device: Device;
  showAlert = false;
  deviceFormModalRef: BsModalRef<DeviceFormComponent>;

  constructor(
    private deviceService: DeviceApiService,
    private modalService: BsModalService
  ) {}

  async ngOnInit() {
    await this.loadDevices();
  }

  async loadDevices() {
    const devicesReceived = {
      next: (devices: Device[]) => {
        if (devices.length) {
          this.devices = devices;
        }
      },
      error: (response) => {
        console.log(response);
      },
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
      backdrop: "static",
    });

    this.deviceFormModalRef.onHidden.subscribe(() => this.loadDevices());
  }

  modalExcluiDispositivo(device: Device) {
    this.device = device;
    $("#excluirDevice").modal("show");
  }

  excluirDispositivo(device: Device) {
    this.deviceService.deleteDevice(device).subscribe((response: any) => {
      if (response.status === 200) {
        this.loadDevices();
      }
    });
  }

  pesquisarModelo() {
    this.deviceService
      .getByModelo(this.searchModelo)
      .subscribe((response: any) => {
        if (response.length > 0) {
          this.devices = response;
          this.showAlert = true;
        } else {
          $("#modalNaoEncontrado").modal("show");
        }
      });
  }

  removeFiltroAlerta() {
    this.loadDevices();
    this.searchModelo = "";
  }
}
