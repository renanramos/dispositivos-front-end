import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../shared/device';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices: Device[] = [];

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.loadDevices();
  }


  loadDevices() {
    this.deviceService.getAllDevices();
  }

  

}
