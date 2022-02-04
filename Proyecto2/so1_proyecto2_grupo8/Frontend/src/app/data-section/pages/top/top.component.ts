import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styles: [`
  .center {
    text-align:center;
  }
  .card {
    border-radius:10px;
  }
  h1 {
    color: white;
    text-align:center;
  }
  h2 {
    text-align: center;
    font-size: 400%;
  }
  `
  ]
})
export class TopComponent implements OnInit {

  top: any[] = [];

  constructor( private socket: SocketService ) { }

  ngOnInit(): void {
    this.socket.getTop()
    .subscribe(res => {
      this.top = res;
    });
  }

}
