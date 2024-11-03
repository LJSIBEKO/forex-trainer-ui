import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import {ClientComponent} from "./client.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ClientRoutingModule} from "./client-routing.module";



@NgModule({
  declarations: [
    ClientComponent,
    DashboardComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ClientRoutingModule
  ]
})
export class ClientModule { }
