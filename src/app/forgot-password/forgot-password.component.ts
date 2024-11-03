import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';

  onSubmit() {
    // Handle the forgot password functionality, like sending a reset link
    console.log('Reset link sent to', this.email);
  }

}
