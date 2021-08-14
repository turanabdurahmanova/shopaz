import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BtnLoaderService } from 'src/app/services/btn-loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginUser: any;
  errorMsg: string = '';
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private btnLoader: BtnLoaderService
  ) {
    this.loginForm = new FormGroup({});
  }

  get formControls() {
    return this.loginForm.controls;
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    this.submitted = true;
    this.errorMsg = '';
    if (this.loginForm.valid) {
      this.btnLoader.changeValueOfLoading(true);
      this.authenticationService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (data) => {
            localStorage.setItem('token', data.body.token);
            localStorage.setItem('expiry_time ', data?.body?.expiry_time);
            this.router.navigate(['/board']);
          },
          (error) => {
            console.log(error);
          },
          () => {
            this.btnLoader.changeValueOfLoading(false);
          }
        );
    }
  }
  ngOnInit(): void {
    this.initLoginForm();
    this.loginForm.patchValue({
      username: 'farhadich',
      password: '123',
    });
  }

}
