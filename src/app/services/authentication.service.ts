import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.baseUrl;

  private Header: HttpHeaders;
  constructor(private http: HttpClient) {
    this.Header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  login(username: string, password: string) {
    this.Header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(
      this.baseUrl + `/token`,
      {
        username,
        password,
      },
      { headers: this.Header, observe: 'response' }
    );
  }
}
