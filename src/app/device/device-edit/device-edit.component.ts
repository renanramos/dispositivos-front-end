import { Component, OnInit, Input } from '@angular/core';
import { Device } from '../shared/device';
import { DeviceApiService } from '../device-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {

  @Input() device: Device;

  constructor(
    private router: Router,
    private deviceService: DeviceApiService) { }

  ngOnInit() {
  }


  atualizaDevice(device: Device){
    this.deviceService.updateDevie(device).subscribe((response: any) => {      
      if (response.status === 200) {
        this.router.navigateByUrl('/');
      }
    })
  }

}
