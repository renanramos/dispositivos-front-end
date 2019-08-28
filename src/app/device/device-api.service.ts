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

  updateDevie(device: Device) {
    return this.http.put<Device>(this.baseURL, device);
  }

  deleteDevice(device: Device) {
     return this.http.delete<Device>(this.baseURL+`/${device.device_id}`);
  }

  getByModelo(modelo: string){
    return this.http.get<any>(this.baseURL+`/search?modelo=${modelo}`);
  }
}
