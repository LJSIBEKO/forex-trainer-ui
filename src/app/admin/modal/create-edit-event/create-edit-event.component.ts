import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-create-edit-event',
  templateUrl: './create-edit-event.component.html',
  styleUrls: ['./create-edit-event.component.css']
})
export class CreateEditEventComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private dialogRef: MatDialogRef<CreateEditEventComponent>) {

  }


  name: string = '';
  amount: Number = 0;
  status: string = '';
  numberOfStudentsAllowed: Number = 0;
  currentStudentRegistered: Number = 0;
  description: string = '';

  course: any;
  type: string = '';

  selectedDate: any = '';


  fromTime: any;
  toTime: any;

  fromDateTime: Date = new Date();
  toDateTime: Date = new Date();

  courseId: string = '';



  courses:any;

  ngOnInit(){
    this.getAllCourses();
  }


  private createDateTime(date: string, time: any): Date {
    console.log(date);
    const [year, month, day] = date.split('-').map(Number);
    const hour = time?.hour ?? 0; // Use optional chaining and provide a default value
    const minute = time?.minute ?? 0; // Use optional chaining and provide a default value
    const dateTime = new Date(year, month - 1, day, hour, minute);
    return dateTime;
  }

  private formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmitCreate(form: any) {
    if (this.selectedDate instanceof Date) {
      this.selectedDate = this.formatDateToString(this.selectedDate);
    }

    console.log('Selected Date:', this.selectedDate);

    console.log('Selected f time:', this.fromTime);

    console.log('Selected t time:', this.toTime);


    this.fromDateTime = this.createDateTime(this.selectedDate, this.fromTime);
    this.toDateTime = this.createDateTime(this.selectedDate, this.toTime);

    console.log('From DateTime:', this.fromDateTime);
    console.log('To DateTime:', this.toDateTime);

    const event = {
      "eventName": this.name,
      "startTime": this.fromDateTime,
      "endTime": this.toDateTime,
      "description": this.description,
      "isMandatory": false
    }


    console.log(event);
    this.adminService.createEvent(event, this.courseId).subscribe(

      (response) => {
        console.log(response)
        if (response && response.error) {
          console.log(response)
        } else {
          this.dialogRef.close();
        }
      }
    )

  }


  public getAllCourses(){
    this.adminService.getCourses().subscribe(
      (response) => {
        console.log(response)
        if (response && response.error) {
          console.log(response)
        } else {
          this.courses=response;
        }
      }
    )
    
  }


}
