import {Injectable, isDevMode} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppUtilityService {

  base_url = isDevMode() ? "http://localhost:8081/" : '';


  public getBaseUrl():string{
    return this.base_url;
  }
}
