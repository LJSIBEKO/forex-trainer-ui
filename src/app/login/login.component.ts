import { Component } from '@angular/core';
import {AppUtilityService} from "../service/app-utility.service";
import {SessionService} from "../service/session.service";
import {TokenService} from "../service/token.service";
;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage= ''

  constructor(private appUtil:AppUtilityService,
              private sessions:SessionService,
              private tokenService:TokenService) {
  }

  onSubmit() {
    console.log("Form Submitted:", {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    const loginObject ={
      email: this.email,
      password: this.password
    }

    this.sessions.login(loginObject).subscribe((response) => {
        if(response&&response.error){
          console.log(response)
          this.errorMessage = (response.message === '') ? 'Error occurred please try again later' : response.error.message;
        }else{
          this.tokenService.setToken(response?.token,response?.expires);
        }
    })
  }

}
