import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent {

  otp: string[] = ['', '', '', '', ''];
  errorMessage: string = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  onInput(index: number) {
    if (this.otp[index].length === 1) {
      // If the input box already has a value, keep focus there
      // Ensure the user cannot enter more than one digit per box
      this.otp[index] = this.otp[index][0];

      // Move to the next box if this is one of the first three
      if (index < 3) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    // Check if backspace is pressed
    if (event.key === 'Backspace') {
      // Clear the current box and move focus to the previous box if available
      if (this.otp[index] === '' && index > 0) {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      } else {
        this.otp[index] = ''; // Clear current box if backspace is pressed
      }
    }
  }

  onConfirm() {
    const enteredOtp = this.otp.join('');
    if (enteredOtp.length === 5) {
      // Process the OTP
      console.log('OTP:', enteredOtp);
    } else {
      this.errorMessage = 'Please complete the 5-digit OTP.';
    }
  }

  resendOtp() {
    // Handle resend OTP logic
    console.log('OTP resent');
  }

}
