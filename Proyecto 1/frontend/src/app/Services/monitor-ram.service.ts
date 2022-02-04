import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorRamService {
  url:string="http://localhost:8080/"
  constructor(private httpClient: HttpClient) { }

  getDatosRam(){
    const ruta=this.url+"ram";
    return this.httpClient.get(ruta).toPromise();
  }

}
