import { Component, OnInit } from '@angular/core';
import { DeviceApiService } from '../device-api.service';

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

  

}
