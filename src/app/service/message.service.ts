import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppUtilityService} from "./app-utility.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

  jsonOptions = {
    headers: new HttpHeaders().set('Accept', 'application/json').set('Content-Type', 'application/json')
  };

  constructor(private appUtil:AppUtilityService,private http:HttpClient) { }



  sendMessage(message: any): Observable<any> {
    return this.http.post(this.appUtil.getBaseUrl()+('messages/send'), message, this.jsonOptions)
      .pipe(catchError(this.handleError<any>('sendMessage')));
  }

  getMessagesByChatId(chatId: string): Observable<any> {
    return this.http.get(this.appUtil.getBaseUrl()+ 'messages/chat/'+chatId,this.jsonOptions).pipe(
      catchError(this.handleError<any>('getMessagesByChatId', {error: ''}))
    );
  }



  getMessageById(id: string): Observable<any> {
    return this.http.get(this.appUtil.getBaseUrl() + `messages/${id}`, this.jsonOptions)
      .pipe(catchError(this.handleError<any>('getMessageById')));
  }

  updateMessage(id: string, message: any): Observable<any> {
    return this.http.put(this.appUtil.getBaseUrl()+ (`messages/${id}`), message, this.jsonOptions)
      .pipe(catchError(this.handleError<any>('updateMessage')));
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(this.appUtil.getBaseUrl()+(`messages/${id}`), this.jsonOptions)
      .pipe(catchError(this.handleError<any>('deleteMessage')));
  }
}
