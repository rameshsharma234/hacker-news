import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from '../config/app-config.service';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AppConfigService,
    ApiService
  ]
})
export class CoreModule { }
