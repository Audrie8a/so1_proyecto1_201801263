import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MonitorRamService } from 'src/app/Services/monitor-ram.service';

@Component({
  selector: 'app-poligono',
  templateUrl: './poligono.component.html',
  styleUrls: ['./poligono.component.css']
})
export class PoligonoComponent {


  multi = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];
  view: [number,number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
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
    //Object.assign(this, { multi });
    this.socketFunc()

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

  socketFunc():void{

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
      console.log(msg)
    }
  }

  async getDatosRam(){
    let aux = await this.monitorRamService.getDatosRam();
    if (aux!=null){
      let json =JSON.stringify(aux)
      let obj=JSON.parse(json)
      this.totalRam=obj.Memoria_Total;
      this.totalLibreRam=obj.Memoria_Libre;
      this.totalConsumRam=obj.Memoria_Consumida;
      console.log(obj);
    }else{
      alert("No se obtuvo Respuesta!");
    }

  }

}
