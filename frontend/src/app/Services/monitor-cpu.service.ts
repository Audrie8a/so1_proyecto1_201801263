import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorCpuService {
  url:string="http://localhost:8080/"
  constructor(private httpClient: HttpClient) { }

  getDatosCPU(){
    const ruta=this.url+"cpu";
    return this.httpClient.get(ruta).toPromise();
  }
}
