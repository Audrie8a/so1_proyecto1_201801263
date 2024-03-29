import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaComponent } from './Components/pagina/pagina.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { MonitorRamComponent } from './Components/monitor-ram/monitor-ram.component';
import { MonitorCpuComponent } from './Components/monitor-cpu/monitor-cpu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { PoligonoComponent } from './Components/poligono/poligono.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginaComponent,
    PrincipalComponent,
    MonitorRamComponent,
    MonitorCpuComponent,
    PoligonoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    HttpClientModule,
    NgxChartsModule,

    MatCardModule,
    FormsModule,
    MatExpansionModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
