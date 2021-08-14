import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Priority } from 'src/app/models/priority';
import { Stage } from 'src/app/models/stage';
import { CreateTaskModel, Task, TaskType } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { LoadingService } from 'src/app/services/loading.service';
import { StageService } from 'src/app/services/stage.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  stages: Array<Stage> = [];
  tasks: Array<Task> = [];
  stageId: number;
  taskId: number;
  taskTypes: TaskType;
  priorites: Priority;
  users: User;
  stageID: number;
  constructor(
    private stageService: StageService,
    private taskService: TaskService,
    private loadingService: LoadingService,
    private router: Router
  ) {}
  getStages() {
    this.stageService.getStages().subscribe(
      (data) => {
        this.stages = data;
        for (let i = 0; i < this.stages.length; i++) {
          this.stages[i].tasks = [];
        }
      },
      (error) => {
        console.log(error, 'error');
      },
      () => {
        console.log(this.stages, 'stages');
        this.getTasks();
      }
    );
  }
  getTasks() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data.sort(function (a, b) {
          return a.id - b.id;
        });
        for (let i = 0; i < this.stages.length; i++) {
          for (let j = 0; j < this.tasks.length; j++) {
            if (this.stages[i]?.id == this.tasks[j]?.stageID) {
              this.stages[i].tasks.push(this.tasks[j]);
            }
          }
        }
      },
      (error) => {
        console.log(error, 'error');
      },
      () => {
        this.loadingService.changeValueOfLoading(false);
      }
    );
  }
  getTaskTypes() {
    this.taskService.getTaskTypes().subscribe(
      (data) => {
        this.taskTypes = data;
      },
      (error) => {
        console.log(error, 'error');
      },
      () => {}
    );
  }
  getPriorites() {
    this.stageService.getPriorites().subscribe(
      (data) => {
        this.priorites = data;
      },
      (error) => {
        console.log(error, 'error');
      },
      () => {}
    );
  }
  getUsers() {
    this.stageService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.log(error, 'error');
      },
      () => {}
    );
  }
  drop(event: CdkDragDrop<string[]>) {
    this.taskId = event.previousContainer.data[event.previousIndex]['id'];
    this.stageId = Number(event.container.id.slice(14)) + 1;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.changeStage();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  changeStage() {
    this.stageService.changeStage(this.taskId, this.stageId).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  displayCreatedTask(newTask: CreateTaskModel) {
    this.taskService.getTasks().subscribe((data) => {
      this.stages[newTask.stageId - 1].tasks.push(
        data.find((item) => item.name === newTask.taskName)
      );
    });
  }
  displayUpdatedTask() {
    this.getStages();
  }
  ngOnInit() {
    this.getStages();
    this.getPriorites();
    this.getUsers();
    this.getTaskTypes();
  }
}
