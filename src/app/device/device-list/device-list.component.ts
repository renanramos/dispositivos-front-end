import { Component, OnInit } from '@angular/core';
import { DeviceApiService } from '../device-api.service';
import { Device } from '../shared/device';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  searchModelo = '';
  devices: any[];
  device: Device;
  showAlert = false;

  constructor(
    private deviceService: DeviceApiService,
    private router: Router) { }

  ngOnInit() {
    this.loadDevices();    
  }

  loadDevices() {    
    this.deviceService.getAllDevices().subscribe((data: any) => {      
      this.devices = data;
    });
  }

  editarDevice(device: Device){
    this.device = device;
    $('#modalEditDevice').modal('show');
  }

  modalExcluiDispositivo(device: Device) {
    this.device = device;
    $('#excluirDevice').modal('show');    
  }

  excluirDispositivo(device: Device){
    this.deviceService.deleteDevice(device).subscribe((response: any) => {
      if (response.status === 200){
        this.loadDevices();
      }
    });
  }

  pesquisarModelo(){
    this.deviceService.getByModelo(this.searchModelo).subscribe((response: any) => {
      if (response.length > 0) {
        this.devices = response;
        this.showAlert = true;
      } else {
        $('#modalNaoEncontrado').modal('show');
      }
    })
  }
  
  removeFiltroAlerta(){
    this.loadDevices();
    this.searchModelo = '';
  }

}
