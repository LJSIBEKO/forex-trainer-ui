import { Component } from '@angular/core';
import {SessionService} from "../service/session.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string = '';
  email: string = '';
  mobile:string = '';
  password: string = '';
  confirmPassword: string = '';
  successRegister = false;
  errorMessage = ''

  constructor(private session:SessionService) {
  }

  onSubmit() {

    const  registerObject = {
      name: this.name,
      email: this.email,
      password: this.password,
      mobile:this.mobile
    }

    this.session.register(registerObject).subscribe((response) => {
      if(response&&response.error){
          this.errorMessage = response.error.message
      }else{
          this.successRegister = true;
      }
    });
  }

}
