import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RouterOutlet} from "@angular/router";
import {ClientComponent} from "./client.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {ClientRoutingModule} from "./client-routing.module";
import { DashboardSideNavComponent } from './dashboard-side-nav/dashboard-side-nav.component';
import { CalenderComponent } from './calender/calender.component';
import {FormsModule} from "@angular/forms";
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    ClientComponent,
    DashboardComponent,
    NavBarComponent,
    DashboardSideNavComponent,
    CalenderComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ClientRoutingModule,
    FormsModule
  ]
})
export class ClientModule { }
