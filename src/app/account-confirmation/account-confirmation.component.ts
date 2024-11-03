import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../service/session.service";


@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent  implements OnInit{


  otp: string[] = ['', '', '', '', ''];
  errorMessage: string = '';
  otpResentMessage: string = '';
  uuid: string | null = '';
  user: any;
  hideOTPScreen = false;
  showModal = false;

  constructor(private route: ActivatedRoute, private sessions: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.uuid = params.get('uuid');
      this.findUserAccount();
    });
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  onInput(index: number): void {
    if (this.otp[index].length === 1) {
      this.otp[index] = this.otp[index][0];
      if (this.otpInputs && this.otpInputs.toArray()[index + 1]) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    }
  }

  findUserAccount(): void {
    this.sessions.findUserAccount(this.uuid).subscribe(
      response => {
        if (response && response.error) {
          this.hideOTPScreen = true;
        } else {
          this.user = response;
        }
      },
      error => {
        this.errorMessage = 'Unable to find user account. Please try again later.';
        this.hideOTPScreen = true;
      }
    );
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (this.otp[index] === '' && index > 0) {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      } else {
        this.otp[index] = '';
      }
    }
  }

  onConfirm(): void {
    const enteredOtp = this.otp.join('');
    if (enteredOtp.length === 5) {
      const object = {
        code: enteredOtp,
        accountId: this.user.id
      };
      this.sessions.confirmOTP(object).subscribe(response => {
        if (response && response.error) {
          this.errorMessage = response.error.message;
        } else if (response.accountStatus === 'ACTIVE') {
          this.showModal = true;
        }
      }, error => {
        this.errorMessage = 'An error occurred while confirming your account. Please try again.';
      });
    } else {
      this.errorMessage = 'Please complete the 5-digit OTP.';
    }
  }

  resendOtp(): void {
    /*this.sessions.resendOtp(this.uuid).subscribe(
      () => {
        this.otpResentMessage = 'A new OTP has been sent to your email.';
        setTimeout(() => (this.otpResentMessage = ''), 5000);
      },
      error => {
        this.otpResentMessage = 'Failed to resend OTP. Please try again later.';
      }
    );*/
  }

  redirectToLogin(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }


}
