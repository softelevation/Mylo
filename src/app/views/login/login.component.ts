import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {};
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(){
      // console.log(this.username.value);
      // console.log(this.password.value);
      this.submitted = true;
      this.authService.login(this.username.value, this.password.value).subscribe((data) => {
          if (this.authService.isLoggedIn && data) {
            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/#/dashboard';
            window.location.assign(redirect)
          } else {
            this.loginError = 'Invalid Username or password.';
          }
        },
        error => this.error = error
      );
  }

 }
