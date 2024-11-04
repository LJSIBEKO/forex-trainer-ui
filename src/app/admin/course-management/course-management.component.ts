import { Component } from '@angular/core';
import { CreateEditCourseComponent } from '../modal/create-edit-course/create-edit-course.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { LoaderService } from 'src/app/service/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent {


  courses: any;


  constructor(private matDialog: MatDialog, private adminService: AdminService, private loader: LoaderService, private router:Router) { }

  ngOnInit() {
    this.getAllCourses();
  }
  openCreateCourseModal() {
    const dialogRef = this.matDialog.open(CreateEditCourseComponent, {
      backdropClass: 'custom-backdrop',
      data: {
        type: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCourses();
    });
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

  editCourse(course: any) {
    const dialogRef = this.matDialog.open(CreateEditCourseComponent, {
      backdropClass: 'custom-backdrop',
      data: {
        type: 'update',
        course: course
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCourses();
    });
  }

  openEvents(courseId: any) {
    this.router.navigateByUrl(`admin/events/${courseId}`);
  }

}
