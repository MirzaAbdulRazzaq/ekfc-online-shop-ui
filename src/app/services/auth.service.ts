import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenSerrvice: TokenService) {}

  URL = 'http://localhost:8080/api/';

  isAuthenticated(): boolean {
    return this.tokenSerrvice.GetToken() ? true : false;
  }

  login(body: any): Observable<any> {
    return this.http.post(`${this.URL}users/login`, body);
  }
}
