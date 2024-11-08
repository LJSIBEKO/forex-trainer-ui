import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppUtilityService} from "./app-utility.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

  jsonOptions = {
    headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json')
  };

  constructor(private appUtil:AppUtilityService,
              private http: HttpClient,) {

  }

  payment(id:any) {
    return this.http.get(this.appUtil.getBaseUrl()+'api/payfast/'+id,this.jsonOptions).pipe(
      catchError(this.handleError<any>('payment', {error: ''}))
    );
  }
}
