import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-circle-graph2',
  templateUrl: './circle-graph2.component.html',
  styles: [`
  * {
    color: white;
  }
  h1 {
    color: white;
    text-align:center;
  }`
  ]
})
export class CircleGraph2Component implements OnInit {

  view: [number, number] = [window.innerWidth-600, window.innerHeight-400];
  data: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor( private socket: SocketService ) {}

  ngOnInit(): void {
    this.socket.getCircle2()
    .subscribe( res => {
      let data: any[] = [];
      res.forEach((e: any) => {
        data.push({
          "name": e._id,
          "value": e.count
        });
      });
      this.data = data;
    });
  }

}
