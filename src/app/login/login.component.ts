import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.form = new FormGroup({
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
  }

  onSaveUser() {
    if(this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      // console.log(this.form)
      return;
    }
    console.log(this.form.value)
    this.userService.signupUser(this.form.value.userName, this.form.value.password)
  }

}
