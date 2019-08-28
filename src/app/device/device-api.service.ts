import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Device } from './shared/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  private baseURL = environment.baseURL + '/devices';

  constructor(private http: HttpClient) { }

  getAllDevices() {
    return this.http.get(this.baseURL);
  }

  createNewDevice(device: Device) {    
      return this.http.post<Device>(this.baseURL, device);
  }

  deleteDevice(device: Device) {
     return this.http.delete<Device>(this.baseURL+`/${device.device_id}`);
  }
}
