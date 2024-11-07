import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { CalendarManagementComponent } from './calendar-management/calendar-management.component';
import { MessagesManagementComponent } from './messages-management/messages-management.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { AdminService } from '../service/admin.service';
import { CreateEditCourseComponent } from './modal/create-edit-course/create-edit-course.component';
import { CreateEditEventComponent } from './modal/create-edit-event/create-edit-event.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';




@NgModule({
  declarations: [
    UserManagementComponent,
    CalendarManagementComponent,
    MessagesManagementComponent,
    CourseManagementComponent,
    AdminSideNavComponent,
    AdminMainComponent,
    NavBarComponent,
    CreateEditCourseComponent,
    CreateEditEventComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule { }
