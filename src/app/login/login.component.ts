import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      userName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl(null, {
        validators: [Validators.required]
      }),
    });

    this.loginForm = new FormGroup({
      userName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    })
  }

  onSignupUser() {
    if(this.signupForm.invalid) {
      return;
    }

    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.signupForm.controls.confirmPassword.setErrors({'incorrect': true});
      return
    }

    this.userService.signupUser(this.signupForm.value.userName, this.signupForm.value.password)
  }

  onLoginUser() {
    if(this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.userService.loginUser(this.loginForm.value.userName, this.loginForm.value.password)
  }
}
