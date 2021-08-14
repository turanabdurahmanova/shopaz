import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Priority } from 'src/app/models/priority';
import { Stage } from 'src/app/models/stage';
import { TaskType } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { BtnLoaderService } from 'src/app/services/btn-loader.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit {
  submitted: boolean = false;
  createTaskForm: FormGroup;
  @Input() stages: Stage;
  @Input() users: User;
  @Input() priorites: Priority;
  @Input() taskTypes: TaskType;
  @Output() createdTask = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private taskService: TaskService,
    private btnLoader: BtnLoaderService
  ) {}
  get formControlsTask() {
    return this.createTaskForm['controls'];
  }
  openModal(content): void {
    this.modalService.open(content);
  }
  deleteModal() {
    this.modalService.dismissAll();
    this.submitted = false;
    this.createTaskForm.reset();
  }
  createTaskSend() {
    this.submitted = true;
    if (this.createTaskForm.invalid) {
      return;
    } else {
      this.btnLoader.changeValueOfLoading(true);
      this.taskService.createTaskSend(this.createTaskForm.value).subscribe(
        (data) => {
          this.modalService.dismissAll();
          console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Task successfully created',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.createdTask.emit(this.createTaskForm.value);
          this.createTaskForm.reset();
          this.submitted = false;
          this.btnLoader.changeValueOfLoading(false);
        }
      );
    }
  }
  ngOnInit(): void {
    this.createTaskForm = this.fb.group({
      taskName: ['', Validators.required],
      description: ['', Validators.required],
      typeId: ['', Validators.required],
      stageId: ['', Validators.required],
      priorityId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }
}
