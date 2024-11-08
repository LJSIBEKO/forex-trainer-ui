import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {BookingService} from "../../service/booking.service";
import {PaymentService} from "../../service/payment.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit{

  courses:any[] = [];
  selectedCourse: any;
  startDate: Date = new Date();
  endDate: Date = new Date(this.startDate.getTime() + 30 * 24 * 60 * 60 * 1000);  // 30 days from today
  price: number = 0;
  modalVisible: boolean = false;

  user:any;

  constructor(private courseService:AdminService ,
              private bookingService: BookingService,
              private paymentService:PaymentService){
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('client_information');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    this.courseService.getCourses().subscribe((response) =>{
      this.courses = response;
      }

    )
  }

  buyCourse(course: any): void {
    this.selectedCourse = course;
    this.startDate = new Date();
    this.endDate = new Date(this.startDate.getTime() + 30 * 24 * 60 * 60 * 1000);  // 30 days from today
    this.price = course.amount;
    this.modalVisible = true;  // Show the modal
  }

  // Function to update the end date when start date is moved
  updateEndDate(): void {
    this.endDate = new Date(this.startDate.getTime() + 30 * 24 * 60 * 60 * 1000);  // 30 days from start date
    this.calculatePrice();
  }

  // Function to calculate the price when the start date changes
  calculatePrice(): void {
    const timeDiff = Math.abs(this.startDate.getTime() - new Date().getTime());
    const daysMoved = Math.floor(timeDiff / (1000 * 3600 * 24));  // Calculate the number of days moved
    this.price = this.selectedCourse.amount + (daysMoved * 5);  // Add R5 per day moved
  }

  closeModal(): void {
    this.modalVisible = false;  // Hide the modal
  }

  checkout(): void {

    const  object = {
      courseId:this.selectedCourse.id,
      startDate:this.startDate+'T00:00:01',
      endDate:this.endDate.toISOString(),
      userId:this.user.id
    }

    this.bookingService.createBooking(object).subscribe((value) => {
      if(value&&value.error){
        console.log('response {}',value)
      }else{
        console.log(value);
        this.paymentService.payment(value.id).subscribe((response) => {
          console.log(response)
          const payfastUrl = this.buildPayFastUrl(response);
          // Redirect the user to the PayFast URL
          window.location.href = payfastUrl;

        })
      }
    })
    this.closeModal();  // Close modal after checkout
  }

  private buildPayFastUrl(params: { [key: string]: string }): string {
    const baseUrl = 'https://sandbox.payfast.co.za/eng/process';
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${queryString}`;
  }

}
