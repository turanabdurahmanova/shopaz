import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserModel } from 'src/app/models/user';
import { BtnLoaderService } from 'src/app/services/btn-loader.service';
import { StageService } from 'src/app/services/stage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.scss'],
})
export class UserCreateModalComponent implements OnInit {
  submitted: boolean = false;
  createUserForm: FormGroup;
  hide: boolean = true;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private stageService: StageService,
    private btnLoader: BtnLoaderService
  ) {}
  openModal(content): void {
    this.modalService.open(content);
  }
  deleteModal() {
    this.modalService.dismissAll();
    this.submitted = false;
    this.createUserForm.reset();
  }
  get formControlsUser() {
    return this.createUserForm['controls'];
  }
  createUserSend() {
    this.submitted = true;
    if (this.createUserForm.invalid) {
      return;
    } else {
      this.btnLoader.changeValueOfLoading(true);
      this.stageService.createUserSend(this.createUserForm.value).subscribe(
        (data) => {
          this.modalService.dismissAll();
          console.log(data);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User successfully created',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.btnLoader.changeValueOfLoading(false);
          this.createUserForm.reset();
          this.submitted = false;
        }
      );
    }
  }
  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      age: ['', Validators.required],
      isAdmin: [false, Validators.required],
    });
  }
}
