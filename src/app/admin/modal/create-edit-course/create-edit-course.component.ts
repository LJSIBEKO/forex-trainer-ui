import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-edit-course.component.html',
  styleUrls: ['./create-edit-course.component.css']
})
export class CreateEditCourseComponent {

  name:string = '';
  amount:Number = 0;
  status:string = '';
  numberOfStudentsAllowed:Number = 0;
  currentStudentRegistered:Number = 0;
  description:string = '';

  course: any;
  type: string='';


  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,private adminService: AdminService, private dialogRef: MatDialogRef<CreateEditCourseComponent>) {
    this.type = data.type;
    this.course = data.course;
    console.log(this.course);
  }


  ngOnInit(){
    if(this.type==='update'){
      this.name = this.course.name;
      this.amount = this.course.amount;
      this.status = this.course.status;
      this.numberOfStudentsAllowed = this.course.numberOfStudentsAllowed;
      this.currentStudentRegistered = this.course.currentStudentRegistered;
      this.description = this.course.description;
    }
  }


  onSubmitCreate(form: any) {
    const courseData = {
      name: form.value.name,
      amount: form.value.amount,
      status: form.value.status,
      numberOfStudentsAllowed: form.value.numberOfStudentsAllowed,
      currentStudentRegistered: form.value.currentStudentRegistered,
      description: form.value.description
    };

    console.log('Course Data:', courseData);



    this.adminService.createCourse(courseData).subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
      } else {
        this.dialogRef.close();
      }
    })
  }

  onSubmitUpdate(form: any) {
    const courseData = {
      id: this.course.id,
      name: form.value.name,
      amount: form.value.amount,
      status: form.value.status,
      numberOfStudentsAllowed: form.value.numberOfStudentsAllowed,
      currentStudentRegistered: form.value.currentStudentRegistered,
      description: form.value.description
    };

    console.log('Course Data:', courseData);

    this.adminService.createUpdate(courseData).subscribe((response) => {
      console.log(response)
      if (response && response.error) {
        console.log(response)
      } else {
        this.dialogRef.close();
      }
    })
  }
}
