import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Priority } from '../models/priority';
import { Stage } from '../models/stage';
import { CreateUserModel, User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class StageService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.baseUrl + '/stage');
  }
  getPriorites(): Observable<Priority> {
    return this.http.get<Priority>(this.baseUrl + '/priority');
  }
  getUsers(): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users');
  }
  createUserSend(data) {
    return this.http.post<CreateUserModel>(this.baseUrl + `/user`, data);
  }
  changeStage(taskId: number, stageId: number) {
    return this.http.put<any>(this.baseUrl + `/changeStage`, {
      taskId,
      stageId,
    });
  }
}
