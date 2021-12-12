import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {formatDate } from '@angular/common';
import { MonitorRamService } from 'src/app/Services/monitor-ram.service';

@Component({
  selector: 'app-poligono',
  templateUrl: './poligono.component.html',
  styleUrls: ['./poligono.component.css']
})
export class PoligonoComponent implements OnInit{

  private intervalUpdate: any = null;
  listaGrafica: any;
  view: [number,number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Total_Ram';
  timeline: boolean = true;

  socket= new WebSocket("ws://localhost:8080/ws")
  totalRam:string="";
  totalLibreRam:string="";
  totalConsumRam: string="";

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(public _routre:Router,
    public route: ActivatedRoute,
    public monitorRamService: MonitorRamService) {


  }

  ngOnInit(): void {
    this.getDatosRam()//this.socketFunc();

		this.intervalUpdate = setInterval(() =>{
			this.getDatosRam()//this.socketFunc();
		},5000);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }


  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  async getDatosRam(){
    let aux = await this.monitorRamService.getDatosRam();
    if (aux!=null){
      let json =JSON.stringify(aux)
      let obj=JSON.parse(json)

      let today= new Date();
      let jstoday = formatDate(today, 'hh:mm:ss a', 'en-US', '+0502');
      let listaGrafica=[
        {
          "name": "Total_Ram",
          "series":[
            {
              "name": jstoday,
              "value": obj.Memoria_Consumida
            }

          ]
        }
      ]
      Object.assign(this, { listaGrafica });
      this.totalRam=obj.Memoria_Total;
      this.totalLibreRam=obj.Memoria_Libre;
      this.totalConsumRam=obj.Memoria_Consumida;
      console.log(obj);
    }else{
      alert("No se obtuvo Respuesta!");
    }

  }


}





/*

private socketFunc():void{

    console.log("Conectado Angular");

    this.socket.onopen=()=>{
      console.log("Conexión Exitosa Angular!")
      this.socket.send("Hi from Angular!")
    }

    this.socket.onclose=(event)=>{
      console.log("Conexión Socket Angular Cerrada: ",event)
    }

    this.socket.onerror=(error)=>{
      console.log("Ocurrio un Error, Socket Angular: ",error)

    }

    this.socket.onmessage = (msg)=>{
      let obj=JSON.parse(msg.data)
      let today= new Date();
      let jstoday = formatDate(today, 'hh:mm:ss a', 'en-US', '+0530');
      let listaGrafica=[
        {
          "name": "Total_Ram",
          "series":[
            {
              "name": jstoday,
              "value": obj.Memoria_Consumida
            }

          ]
        }
      ]

      Object.assign(this, { listaGrafica });
      this.totalRam=obj.Memoria_Total;
      this.totalLibreRam=obj.Memoria_Libre;
      this.totalConsumRam=obj.Memoria_Consumida;
      console.log(msg)
    }




  }


 */
