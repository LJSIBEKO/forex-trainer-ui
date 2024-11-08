import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomeNavBarComponent } from './welcome-nav-bar/welcome-nav-bar.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoaderComponent } from './loader/loader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptorService} from "./service/interceptor.service";
import {SessionService} from "./service/session.service";
import {AppUtilityService} from "./service/app-utility.service";
import {LoaderService} from "./service/loader.service";
import {TokenService} from "./service/token.service";
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCancelComponent } from './payment-cancel/payment-cancel.component';
import {BookingService} from "./service/booking.service";
import {PaymentService} from "./service/payment.service";



@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    WelcomeNavBarComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LoaderComponent,
    AccountConfirmationComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    SessionService,
    AppUtilityService,
    LoaderService,
    TokenService,
    FormsModule,
    BookingService,
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  exports:[
    WelcomeNavBarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
