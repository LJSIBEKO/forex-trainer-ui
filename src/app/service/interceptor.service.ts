import { Injectable } from '@angular/core';
import {LoaderService} from "./loader.service";
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {TokenService} from "./token.service";
import {finalize, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private loaderService: LoaderService, private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    
  
    const token = this.tokenService.getToken();

    console.log('adding token '+ token)
    if (token && !this.tokenService.isTokenExpired()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('request '+JSON.stringify(request))
    } else {
      console.warn('Token has expired or does not exist. Please log in again.');
      this.tokenService.clearToken();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.hide();
      }),
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            // Handle successful response if needed
          }
        },
        error: (error) => {
          console.error('Error during request:', error);
          // Handle error if needed (e.g., redirect to login if unauthorized)
        }
      })
    );
  }
}
