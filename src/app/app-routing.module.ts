import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  { path:'' , component:WelcomePageComponent},
  { path:'login', component:LoginComponent},
  { path:'registration' , component:RegistrationComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'client' , loadChildren: () => import('./client/client.module').then((m) => m.ClientModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
