import {Component, OnInit} from '@angular/core';
import {BookingService} from "../../service/booking.service";

@Component({
  selector: 'app-bookimgs',
  templateUrl: './bookimgs.component.html',
  styleUrls: ['./bookimgs.component.css']
})
export class BookimgsComponent  implements OnInit{

  allBookings: any[] = [];
  totalBookings = 0;
  completedPayments = 0;
  pendingPayments = 0;
  totalRevenue = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.bookingService.getAllBookings().subscribe((bookings) => {
      this.allBookings = bookings;
      this.calculateStatistics();
    });
  }

  calculateStatistics() {
    this.totalBookings = this.allBookings.length;
    this.completedPayments = this.allBookings.filter(booking => booking.paid).length;
    this.pendingPayments = this.totalBookings - this.completedPayments;
    this.totalRevenue = this.allBookings
      .filter(booking => booking.paid)
      .reduce((sum, booking) => sum + booking.price, 0);
  }

}
