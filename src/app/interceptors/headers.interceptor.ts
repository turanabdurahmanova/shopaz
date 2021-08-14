import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  constructor() {}
  expiry_time;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.expiry_time = localStorage.getItem('expiry_time ');
    if (localStorage.getItem('token') && Date.now() < this.expiry_time) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token'),
        },
      });
    } else {
      localStorage.clear();
    }

    return next.handle(request);
  }
}
