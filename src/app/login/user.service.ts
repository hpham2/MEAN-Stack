import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  signupUser(userName: string, password: string) {
    const userData = {
      userName: userName,
      password: password
    }
    console.log(userName)
    this.http.post('http://localhost:3000/api/user/signup', userData)
      .subscribe((res) => {
        let snackBarRef = this.snackBar.open("Your account is created", "Please log in");
      })
  }

  loginUser(userName: string, password: string) {
    const userData = {
      userName: userName,
      password: password
    }
    console.log(userName)
    this.http.post('http://localhost:3000/api/user/login', userData)
      .subscribe((res) => {
        let snackBarRef = this.snackBar.open("Your account is created", "Please log in");
      })
  }
}
