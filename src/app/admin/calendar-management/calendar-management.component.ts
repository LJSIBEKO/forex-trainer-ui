import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditEventComponent } from '../modal/create-edit-event/create-edit-event.component';
import { AdminService } from 'src/app/service/admin.service';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-calendar-management',
  templateUrl: './calendar-management.component.html',
  styleUrls: ['./calendar-management.component.css']
})
export class CalendarManagementComponent {
  constructor(private matDialog: MatDialog, private adminService: AdminService, private loader: LoaderService) { }

  events: any;

  courseId: string = 'ALL';

  courses: any;


  ngOnInit() {
    this.getAllCourses();
    this.getAllEvents();
  }

  openCreateEventModal() {
    const dialogRef = this.matDialog.open(CreateEditEventComponent, {
      backdropClass: 'custom-backdrop',
      data: {
        type: 'create',
        courseId: this.courseId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEvents();
    });
  }


  cancelEvent(id: string) {
    this.loader.show();
    this.adminService.cancelEvent(id).subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
        this.loader.hide();

      } else {
        this.getAllEvents();
        this.loader.hide();

      }
    })

  }

  getAllEvents() {
    this.loader.show();
    this.adminService.getAllEventsForCourse(this.courseId).subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
        this.loader.hide();

      } else {
        this.events = response;
        this.loader.hide();

      }
    })
  }


  getAllCourses() {
    this.loader.show();
    this.adminService.getCourses().subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
        this.loader.hide();

      } else {
        this.courses = response;
        this.loader.hide();

      }
    })
  }

  courseChanged() {
    this.getAllEvents();
  }


}
