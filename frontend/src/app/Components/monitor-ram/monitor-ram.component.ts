import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MonitorRamService } from 'src/app/Services/monitor-ram.service';

@Component({
  selector: 'app-monitor-ram',
  templateUrl: './monitor-ram.component.html',
  styleUrls: ['./monitor-ram.component.css']
})
export class MonitorRamComponent implements OnInit {
  datosRam: any;
  totalRam:string="";
  totalLibreRam:string="";


  constructor(
    public _routre:Router,
    public route: ActivatedRoute,
    public monitorRamService: MonitorRamService
    ) { }

  ngOnInit(): void {
    this.getDatosRam();
  }

  async getDatosRam(){
    let aux = await this.monitorRamService.getDatosRam();
    alert(aux)
    console.log(aux);
    if (aux!=null){
      console.log(aux);
    }
  }

}
