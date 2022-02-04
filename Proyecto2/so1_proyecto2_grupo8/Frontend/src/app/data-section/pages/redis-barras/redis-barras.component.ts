import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-redis-barras',
  templateUrl: './redis-barras.component.html',
  styles: [`
  .blanco {
    color: white;
  }
  h1 {
    color: white;
    text-align:center;
  }
`]
})
export class RedisBarrasComponent implements OnInit {

  niños: number = 0;
  adoles: number = 0;
  jovenes: number = 0;
  adultos: number = 0;
  vejez: number = 0;
  single: any[] = [
    {
      "name": "Niños (0-11 años)",
      "value": this.niños
    },
    {
      "name": "Adolescentes (12-18 años)",
      "value": this.adoles
    },
    {
      "name": "Jóvenes (18-26 años)",
      "value": this.jovenes
    },
    {
      "name": "Adultos (27-59 años)",
      "value": this.adultos
    },
    {
      "name": "Vejez (60+ años)",
      "value": this.vejez
    }
  ];

  view: [number, number] = [window.innerWidth-500, window.innerHeight-400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Edades';
  showYAxisLabel = true;
  yAxisLabel = 'Vacunados';

  constructor(private socket: SocketService) { }

  ngOnInit(): void {
    this.socket.redis2()
    .subscribe(data => {
      this.niños = 0;
      this.adoles = 0;
      this.jovenes = 0;
      this.adultos = 0;
      this.vejez = 0;
      data.forEach((element: any) => {
        if (element.age < 12) {
          this.niños += 1;
        }else if(element.age < 19){
          this.adoles += 1;
        }else if(element.age < 27){
          this.jovenes += 1;
        }else if(element.age < 60){
          this.adultos += 1;
        }else{
          this.vejez += 1;
        }
        let single2: any[] = [
          {
            "name": "Niños\n(0-11 años)",
            "value": this.niños
          },
          {
            "name": "Adolescentes (12-18 años)",
            "value": this.adoles
          },
          {
            "name": "Jóvenes (18-26 años)",
            "value": this.jovenes
          },
          {
            "name": "Adultos (27-59 años)",
            "value": this.adultos
          },
          {
            "name": "Vejez (60+ años)",
            "value": this.vejez
          }
        ];
        this.single = single2;
      });
    });
  }

}
