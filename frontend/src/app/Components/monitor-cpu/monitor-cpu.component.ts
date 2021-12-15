import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MonitorCpuService } from 'src/app/Services/monitor-cpu.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-monitor-cpu',
  templateUrl: './monitor-cpu.component.html',
  styleUrls: ['./monitor-cpu.component.css']
})
export class MonitorCpuComponent implements OnInit {

  Utilizacion_CPU: string=""

  listaAuxiliar=[
    {
      "name": "%CPU",
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
  yAxisLabel: string = '%CPU (MB)';
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
    public monitorCpuService:MonitorCpuService) { }

  ngOnInit(): void {
    this.getCPU()

    this.intervalUpdate = setInterval(() =>{
			this.getCPU()//this.socketFunc();
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

  async getCPU(){
    let aux =await this.monitorCpuService.getDatosCPU();
    if (aux!= null){
      let json =JSON.stringify(aux)
      let obj=JSON.parse(json)

      let today= new Date();
      let jstoday = formatDate(today, 'hh:mm:ss ', 'en-US', '+0502');

      let auxDato={
        name: jstoday,
        value: obj.CPU
      }

      this.listaAuxiliar[0].series.push(auxDato)
      this.listaGrafica=[
        {
          "name": "%CPU",
          "series":[
            {
              "name": jstoday,
              "value": obj.CPU
            }

          ]
        }
      ]
      this.listaGrafica=this.listaAuxiliar;

      console.log(this.listaGrafica)
      this.listaGrafica=[...this.listaGrafica]

      this.Utilizacion_CPU=obj.CPU
    }else{
      alert("No se obtuvo Respuesta!");
    }

  }
}
