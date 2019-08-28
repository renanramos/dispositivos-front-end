import { Component, OnInit } from '@angular/core';
import { DeviceApiService } from '../device-api.service';
import { Device } from '../shared/device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: any[];

  constructor(private deviceService: DeviceApiService) { }

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {    
    this.deviceService.getAllDevices().subscribe((data: any) => {      
      this.devices = data;
    });
  }

  excluiDispositivo(device: Device) {
    this.deviceService.deleteDevice(device).subscribe((response: any) => {
      if (response.status === 200){
        this.loadDevices();
      }
    });
  }
  

}
