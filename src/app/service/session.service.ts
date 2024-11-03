import { Injectable } from '@angular/core';
import {AppUtilityService} from "./app-utility.service";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService {


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


  public login(login: any): Observable<any> {
    return this.http.post(this.appUtil.base_url + 'sessions/login', login, this.jsonOptions).pipe(
      catchError(this.handleError<any>('login', {error: ''}))
    );
  }
}
