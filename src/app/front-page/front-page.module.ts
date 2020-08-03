import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontPageRoutingModule } from './front-page-routing.module';
import { FrontPageComponent } from './containers/front-page/front-page.component';
import { FrontPageService } from './services/front-page.service';
import { FrontPageTableComponent } from './components/front-page-table/front-page-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsChartModule } from 'highcharts-angular';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    FrontPageComponent,
    FrontPageTableComponent
    ],
  imports: [
    CommonModule,
    FrontPageRoutingModule,
    NgbModule,
    HighchartsChartModule,
    SharedModule
  ],
  providers: [
    FrontPageService
  ]
})
export class FrontPageModule { }
