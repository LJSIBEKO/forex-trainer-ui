import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AppUtilityService } from './app-utility.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

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

  public createCourse(course:any){
    return this.http.post(this.appUtil.base_url + 'course/create', course, this.jsonOptions).pipe(
      catchError(this.handleError<any>('create', {error: ''}))
    );
  }

  public createUpdate(course:any){
    return this.http.put(this.appUtil.base_url + 'course/update', course, this.jsonOptions).pipe(
      catchError(this.handleError<any>('update', {error: ''}))
    );
  }

  public getCourses(){
    return this.http.get(this.appUtil.base_url + 'course/view',this.jsonOptions).pipe(
      catchError(this.handleError<any>('view', {error: ''}))
    );
  }

  public getUsers(){
    return this.http.get(this.appUtil.base_url + 'sessions/view',this.jsonOptions).pipe(
      catchError(this.handleError<any>('view', {error: ''}))
    );
  }


  public createEvent(event:any, courseId:string){
    return this.http.post(this.appUtil.base_url + 'event/create/'+courseId,event,this.jsonOptions).pipe(
      catchError(this.handleError<any>('create', {error: ''}))
    );
  }

  public getAllEventsForCourse(courseId:string){
    return this.http.get(this.appUtil.base_url + 'event/'+courseId,this.jsonOptions).pipe(
      catchError(this.handleError<any>('get', {error: ''}))
    );
  }


  public cancelEvent(eventId:string){
    return this.http.put(this.appUtil.base_url + 'event/cancel/'+eventId,this.jsonOptions).pipe(
      catchError(this.handleError<any>('put', {error: ''}))
    );
  }
}
