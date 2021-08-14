import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Priority } from 'src/app/models/priority';
import { SpecificTask, Task, TaskType } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { BtnLoaderService } from 'src/app/services/btn-loader.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.scss'],
})
export class UpdateTaskModalComponent implements OnInit {
  @Input() tasks: Task;
  @Input() taskTypes: TaskType;
  @Input() users: User;
  @Input() priorites: Priority;
  @Output() updatedTask = new EventEmitter();

  updateTaskForm: FormGroup;
  specificTask: SpecificTask;
  submitted: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private taskService: TaskService,
    private btnLoader: BtnLoaderService
  ) {}
  get formControlsUpdateTask() {
    return this.updateTaskForm['controls'];
  }
  deleteModal() {
    this.modalService.dismissAll();
    this.submitted = false;
    this.updateTaskForm.reset();
  }
  getSpecificTask(id?: number, content?: any) {
    this.modalService.open(content);
    this.taskService.getSpecificTask(id).subscribe(
      (data) => {
        this.specificTask = data;
        this.updateTaskForm.patchValue({
          taskName: data.name,
          typeId: data.typeID,
          taskId: data.id,
          priorityId: data.priorityID,
          userId: data.userId,
          description: data.description,
        });
        // this.updateTaskForm.controls.taskName.setValue(this.specificTask.name);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  updateTask() {
    this.submitted = true;
    if (this.updateTaskForm.invalid) {
      return;
    } else {
      this.btnLoader.changeValueOfLoading(true);
      this.taskService.updateTask(this.updateTaskForm.value).subscribe(
        (data) => {
          console.log(data);
          this.modalService.dismissAll();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Task successfully updated',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.btnLoader.changeValueOfLoading(false);
          this.updatedTask.emit();
        }
      );
    }
  }
  ngOnInit(): void {
    this.updateTaskForm = this.fb.group({
      taskName: [null, Validators.required],
      typeId: [null, Validators.required],
      taskId: ['', Validators.required],
      priorityId: [null, Validators.required],
      userId: [null, Validators.required],
      description: [null, Validators.required],
    });
  }
}
