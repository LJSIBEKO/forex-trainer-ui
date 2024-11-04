import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppUtilityService} from "./app-utility.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

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

  createChat(obj:any): Observable<any> {
    return this.http.post(this.appUtil.base_url + 'chats/create', obj, this.jsonOptions).pipe(
      catchError(this.handleError<any>('createChat', { error: '' }))
    );
  }

  getChatById(chatId: string): Observable<any> {
    return this.http.get(this.appUtil.base_url + `chats/${chatId}`, this.jsonOptions).pipe(
      catchError(this.handleError<any>('getChatById', { error: '' }))
    );
  }

  // Get all chats for a specific user
  getChatsByUserId(userId: string): Observable<any> {
    return this.http.get<any[]>(this.appUtil.base_url + `chats/user/chats/${userId}`, this.jsonOptions).pipe(
      catchError(this.handleError<any>('getChatsByUserId', {}))
    );
  }

}
