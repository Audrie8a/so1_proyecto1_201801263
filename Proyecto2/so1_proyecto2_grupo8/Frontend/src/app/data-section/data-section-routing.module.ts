import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleGraphComponent } from './pages/circle-graph/circle-graph.component';
import { TopComponent } from './pages/top/top.component';
import { DataComponent } from './pages/data/data.component';
import { CircleGraph2Component } from './pages/circle-graph2/circle-graph2.component';
import { RedisComponent } from './pages/redis/redis.component';
import { RedisBarrasComponent } from './pages/redis-barras/redis-barras.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'top',
        component: TopComponent
      },
      {
        path: 'data',
        component: DataComponent
      },
      {
        path: 'dosis',
        component: CircleGraphComponent
      },
      {
        path: 'completo',
        component: CircleGraph2Component
      },
      {
        path: 'redis',
        component: RedisComponent
      },
      {
        path: 'redis-barras',
        component: RedisBarrasComponent
      },
      {
        path: '**',
        redirectTo: 'top'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSectionRoutingModule { }
