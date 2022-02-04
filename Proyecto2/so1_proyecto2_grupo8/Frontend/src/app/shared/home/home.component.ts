import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .fondo {
    background-color: #ECB365;
  }
  .carta {
    background-color: #ECB365; 
    border-radius: 10px;
  }
  `
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
