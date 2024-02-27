import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headerConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
    };

    const token = this.tokenService.GetToken();

    Object.assign(headerConfig, {
      ...(token && { Authorization: `Bearer ${token}` }),
    });

    const _req = request.clone({ setHeaders: headerConfig });

    return next.handle(_req).pipe(
      tap({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            console.log(event.status);
          }
        },
        error: (error: any) => {
          console.error(error);
          if (error?.status === 401) {
            this.tokenService.DeleteToken();
            window.location.reload();
          }
        },
        complete: () => {
          console.log('complete flag');
        },
      })
    );
  }
}
