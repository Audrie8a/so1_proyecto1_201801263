import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataSectionRoutingModule } from './data-section-routing.module';
import { CircleGraphComponent } from './pages/circle-graph/circle-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TopComponent } from './pages/top/top.component';
import { DataComponent } from './pages/data/data.component';
import { CircleGraph2Component } from './pages/circle-graph2/circle-graph2.component';
import { RedisComponent } from './pages/redis/redis.component';
import { RedisBarrasComponent } from './pages/redis-barras/redis-barras.component';

@NgModule({
  declarations: [
    CircleGraphComponent,
    TopComponent,
    DataComponent,
    CircleGraph2Component,
    RedisComponent,
    RedisBarrasComponent
  ],
  imports: [
    CommonModule,
    DataSectionRoutingModule,
    NgxChartsModule
  ]
})
export class DataSectionModule { }
