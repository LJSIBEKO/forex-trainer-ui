import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CalenderComponent} from "./calender/calender.component";
import {ChatComponent} from "./chat/chat.component";
import {MessageComponent} from "./message/message.component";


const routes: Routes = [
  { path: '' , component:DashboardComponent },
  { path:'dashboard' , component:DashboardComponent , children:[
      {path: 'message/:chatId', component:MessageComponent}
    ]},
  { path:'calender', component:CalenderComponent},
  {path:'chat',component:ChatComponent},
  /*{
    path:'message/:chatId', component:MessageComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
