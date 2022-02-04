import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
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
export class DataComponent implements OnInit {

  data: any[] = [];

  constructor( private socket: SocketService ) { }

  ngOnInit(): void {
    this.socket.getData()
    .subscribe(res => {
      this.data = res;
    });
  }

}
