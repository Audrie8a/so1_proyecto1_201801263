import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  url:string="http://localhost:8080/"
  constructor(private httpClient: HttpClient) { }

  getDatosProcesador(){
    const ruta=this.url+"procesos";
    return this.httpClient.get(ruta).toPromise();
  }
}
