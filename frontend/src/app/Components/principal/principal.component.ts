import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { PrincipalService } from 'src/app/Services/principal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  ejecucion :string=""
	interruptible :string=""
	ininterruptible :string=""
	zombie :string=""
	detenido :string=""
  total_procesos:string=""
  sleep:string=""
  Procesos: any
  panelOpenState = false;
  constructor(public _routre:Router,
    public route: ActivatedRoute,
    public principalService: PrincipalService) { }

  ngOnInit(): void {
    this.getProcesos()
  }

  async getProcesos(){
    let aux = await this.principalService.getDatosProcesador();
    if (aux!=null){
      let json=JSON.stringify(aux);
      let obj= JSON.parse(json);
      this.ejecucion=obj.Ejecucion
      this.interruptible=obj.Interrumpible
      this.ininterruptible=obj.Ininterrumpible
      this.zombie=obj.Zombie
      this.detenido=obj.Detenidos
      this.sleep=obj.Sleep
      this.total_procesos=obj.Total_Procesos
      this.Procesos=obj.procesos


      console.log(obj)

    }
  }


  async killProceso(PID:string){
    let aux =await this.principalService.killProceso(PID)
    window.location.reload();



  }
}
