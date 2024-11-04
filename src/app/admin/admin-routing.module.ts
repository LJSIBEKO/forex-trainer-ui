import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { CalendarManagementComponent } from './calendar-management/calendar-management.component';


const routes: Routes = [
  { path: '' , component:AdminMainComponent },
  { path:'admin' , component:AdminMainComponent,
    children: [
      { path: 'events/:courseId', component: CalendarManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { 




}
