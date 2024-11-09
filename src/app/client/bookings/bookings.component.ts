import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../service/booking.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit
{

  booking:any[]=[]
  user:any;

   constructor(private bookingsService:BookingService) {
   }

  ngOnInit(): void {
    const userData = localStorage.getItem('client_information');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.getBookings();
  }

  getBookings(){
    this.bookingsService.getBookings(this.user.id).subscribe(value => {
      this.booking = value;
      console.log(value)
    })
  }

}
