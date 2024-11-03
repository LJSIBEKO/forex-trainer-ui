import { Injectable } from '@angular/core';

interface TokenData {
  token: string;
  expires: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getTokenData(): TokenData | null {
    const tokenData = localStorage.getItem('token_info');
    return tokenData ? JSON.parse(tokenData) : null;
  }

  // Method to retrieve the token string
  getToken(): string | null {
    const tokenData = this.getTokenData();
    return tokenData ? tokenData.token : null;
  }

  // Method to retrieve the token expiration date
  getTokenExpiration(): Date | null {
    const tokenData = this.getTokenData();
    return tokenData ? new Date(tokenData.expires) : null;
  }

  // Method to check if the token is expired
  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    return expiration ? new Date() > expiration : true;
  }

  // Method to clear the token and its expiration from local storage
  clearToken() {
    localStorage.removeItem('user_info');
  }

  // Method to set the token and its expiration date
  setToken(token: string, expires: string) {
    const tokenData: TokenData = { token, expires };
    localStorage.setItem('token_info', JSON.stringify(tokenData));
  }
}
