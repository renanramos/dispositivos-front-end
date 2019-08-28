import { Component, OnInit } from '@angular/core';
import { Device } from '../shared/device';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceApiService } from '../device-api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css']
})
export class DeviceFormComponent implements OnInit {

  deviceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceApiService,
    private route: Router
  ) { }

  ngOnInit() {
    this.deviceFormInit();
  }

  /**
   * Inicializa as propriedades do formulário
   */
  deviceFormInit() {
    this.deviceForm = this.formBuilder.group({
      id: [''],
      modelo: ['', Validators.required],
      fabricante: ['', Validators.required],
      capacidadeArmazenamento: ['', Validators.required],
      tamanhoTela: ['', Validators.required],
      versaoSO: ['', Validators.required],
    })
  }

  get d() {
    return this.deviceForm.controls;
  }

  onSubmit() {

    if (this.validaForm()){
      return; 
    } else {
      let device: Device = {
        device_id: this.d.id.value,
        device_modelo: this.d.modelo.value,
        device_fabricante: this.d.fabricante.value,
        device_capacidade_armazenamento: this.d.capacidadeArmazenamento.value,
        device_tamanho_tela: this.d.tamanhoTela.value,
        device_versao_so: this.d.versaoSO.value
      }    
      
      this.deviceService.createNewDevice(device).subscribe((response: any) => {
        if ( response.status === 201){
          this.route.navigateByUrl('/');
        }
      })
    }
  }

  /**
   * Verifica se há algum campo inválido
   */
  validaForm() {
    return this.deviceForm.invalid;
  }

}
