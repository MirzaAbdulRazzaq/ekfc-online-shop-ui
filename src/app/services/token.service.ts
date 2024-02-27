import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  SetToken(token: any) {
    localStorage.setItem('token', token);
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  DeleteToken() {
    localStorage.removeItem('token');
  }

  GetPayload(): any {
    const token = this.GetToken();
    let Payload;
    if (token) {
      Payload = token.split('.')[1];
      Payload = JSON.parse(window.atob(Payload));
    }
    return Payload;
  }
}
