import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.css']
})
export class PaymentCancelComponent {
  message: string = "Payment has been cancelled";
  subMessage: string = "Unfortunately, your payment could not be processed.";
}
