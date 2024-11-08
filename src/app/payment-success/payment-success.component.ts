import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  message: string = "Thank you for your payment!";
  subMessage: string = "Your booking was successfully processed.";
}
