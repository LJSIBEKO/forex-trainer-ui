import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {AccountConfirmationComponent} from "./account-confirmation/account-confirmation.component";
import {PaymentCancelComponent} from "./payment-cancel/payment-cancel.component";
import {PaymentSuccessComponent} from "./payment-success/payment-success.component";

const routes: Routes = [
  { path:'' , component:WelcomePageComponent},
  { path:'login', component:LoginComponent},
  { path:'registration' , component:RegistrationComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'account/confirmation/:uuid' , component: AccountConfirmationComponent},
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: 'client' , loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) },
  { path: 'admin' , loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
