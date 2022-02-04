import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
  .fondo {
    background-color: #04293A;
  }
  .blanco {
    color: white;
  }
  .blanco:hover {
    background-color: #ECB365;
    color: black;
  }
  .blanco:active {
    background-color: white;
  }
  .active {
    background-color: #064663;
    border-radius: 10px;
  }
  .nav-link {
    border-radius: 10px;
  }
  img {
    cursor: pointer;
  }
  `
  ]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
