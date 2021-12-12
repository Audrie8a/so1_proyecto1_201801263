import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {formatDate } from '@angular/common';
import { MonitorRamService } from 'src/app/Services/monitor-ram.service';

interface RamTotal{
  name: String;
  value: String;
}


@Component({
  selector: 'app-poligono',
  templateUrl: './poligono.component.html',
  styleUrls: ['./poligono.component.css']
})
export class PoligonoComponent implements OnInit{
  listaAuxiliar=[
    {
      "name": "Total_Ram",
      "series":[
        {
          "name": '0',
          "value": '0'
        }

      ]
    }
  ]

  listaGrafica: any;
  private intervalUpdate: any = null;


  view: [number,number] = [1000, 500];

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
  maxXAxisTickLength=true

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
      Object.assign(this,this.listaGrafica);
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
      let jstoday = formatDate(today, 'hh:mm:ss ', 'en-US', '+0502');

      let auxDato={
        name: jstoday,
        value: obj.Memoria_Consumida
      }
      //(",{ \"name\": "+String(jstoday)+",\n \"value\": "+String(obj.Memoria_Consumida)+"}]")


      this.listaAuxiliar[0].series.push(auxDato)
      this.listaGrafica=[
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
      this.listaGrafica=this.listaAuxiliar;

      console.log(this.listaGrafica)

      this.listaGrafica=[...this.listaGrafica]
      this.totalRam=obj.Memoria_Total;
      this.totalLibreRam=obj.Memoria_Libre;
      this.totalConsumRam=obj.Memoria_Consumida;

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
