import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styles: [`
  table {
    color: white;
  }
  h1 {
    color: white;
    text-align:center;
  }
  `
  ]
})
export class RedisComponent implements OnInit {

  data: any[] = [];

  constructor( private socket: SocketService ) { }

  ngOnInit(): void {
    this.socket.redis1()
    .subscribe(arreglo => {
      this.data = arreglo;
    });
  }

}
