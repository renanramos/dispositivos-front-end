import { Component, OnInit } from '@angular/core';
import { Device } from '../shared/device';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceApiService } from '../device-api.service';
import { Router } from '@angular/router';
import { BsModalRef } from "ngx-bootstrap/modal";
import { tap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: "app-device-form",
  templateUrl: "./device-form.component.html",
  styleUrls: ["./device-form.component.css"],
})
export class DeviceFormComponent implements OnInit {
  deviceForm: FormGroup;
  device: Device;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceApiService,
    private route: Router,
    private deviceFormModalRef: BsModalRef<DeviceFormComponent>
  ) {}

  ngOnInit() {
    this.setDeviceValueToForm();
    this.deviceFormInit();
  }

  setDeviceValueToForm() {
    this.device = this.device ? this.device : new Device();
  }

  /**
   * Inicializa as propriedades do formulário
   */
  deviceFormInit() {
    this.deviceForm = this.formBuilder.group({
      id: [this.device.device_id],
      modelo: [
        this.device.device_modelo,
        Validators.required,
      ],
      fabricante: [
        this.device.device_fabricante,
        Validators.required,
      ],
      capacidadeArmazenamento: [
        this.device.device_capacidade_armazenamento,
        Validators.required,
      ],
      tamanhoTela: [
        this.device.device_tamanho_tela,
        Validators.required,
      ],
      versaoSO: [
        this.device.device_versao_so,
        Validators.required,
      ],
    });
  }

  get d() {
    return this.deviceForm.controls;
  }

  onSubmit() {
    if (this.validaForm()) {
      // $("#modalFormInvalido").modal("show");
      return;
    } else {

      this.saveDevice();

      
    }
  }

  saveDevice() {
    const device: Device = this.getDeviceValuesFromForm();
    device['device_id'] ?
      this.updateDevice(device) :
      this.createDevice(device);
  }

  createDevice(device: Device) {

    const createdDevice = {
      next: (response) => {
        if (response) {
          this.deviceFormModalRef.hide();
        }
      },
      error: (response) => {
        console.log(response);
      }
    }

    this.deviceService.createNewDevice(device)
      .pipe(tap(createdDevice))
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }
  
  updateDevice(device: Device) {

    const updatedDevice = {
      next: (response) => {
        if (response.status === 200) {
          this.deviceFormModalRef.hide();
        }
      },
      error: (response) => {
        console.log(response);
      }
    }

    this.deviceService.updateDevice(device)
      .pipe(tap(updatedDevice))
      .toPromise()
      .then(() => true)
      .catch(() => false);
  }

  getDeviceValuesFromForm(): Device {
      return {
        device_id: this.d.id.value,
        device_modelo: this.d.modelo.value,
        device_fabricante: this.d.fabricante.value,
        device_capacidade_armazenamento: this.d.capacidadeArmazenamento.value,
        device_tamanho_tela: this.d.tamanhoTela.value,
        device_versao_so: this.d.versaoSO.value,
      };
  }

  /**
   * Verifica se há algum campo inválido
   */
  validaForm() {
    return this.deviceForm.invalid;
  }

  closeDialog() {
    this.deviceFormModalRef.hide();
  }
}
