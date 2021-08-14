import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  CreateTaskModel,
  SpecificTask,
  Task,
  TaskType,
  UpdateTaskModel,
} from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
  getTaskTypes(): Observable<TaskType> {
    return this.http.get<TaskType>(this.baseUrl + '/types');
  }

  getSpecificTask(id: number): Observable<SpecificTask> {
    return this.http.post<SpecificTask>(this.baseUrl + '/getTask', {
      taskId: id,
    });
  }
  updateTask(data: UpdateTaskModel) {
    return this.http.put<UpdateTaskModel>(this.baseUrl + '/task', data);
  }
  createTaskSend(data) {
    return this.http.post<CreateTaskModel>(this.baseUrl + `/task`, data);
  }
}
