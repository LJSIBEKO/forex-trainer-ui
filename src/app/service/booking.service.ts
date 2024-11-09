import { Injectable } from '@angular/core';
import {AppUtilityService} from "./app-utility.service";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

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

  public createBooking(bookingCreate:any){
    return this.http.post(this.appUtil.base_url + 'booking/create', bookingCreate, this.jsonOptions).pipe(
      catchError(this.handleError<any>('create', {error: ''}))
    );
  }

  public getBookings(userId:any){
    return this.http.get(this.appUtil.getBaseUrl()+'booking/'+userId,this.jsonOptions).pipe(
      catchError(this.handleError<any>('getBookings', {error: ''}))
    )
  }

  getAllBookings() {
    return this.http.get(this.appUtil.getBaseUrl()+'booking',this.jsonOptions).pipe(
      catchError(this.handleError<any>('getBookings', {error: ''}))
    )
  }
}
