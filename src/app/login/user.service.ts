import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authenticationStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  getAuthenticationStatus() {
    return this.authenticationStatus.asObservable();
  }

  signupUser(userName: string, password: string) {
    const userData = {
      userName: userName,
      password: password
    }

    this.http.post('http://localhost:3000/api/user/signup', userData)
      .subscribe((res) => {
        console.log(res)
        if(res['message'] === 'This email is already used!') {
          let snackBarRef = this.snackBar.open(res['message'], "Please sign up again", {
            duration: 5000,
          });
        } else {

          let snackBarRef = this.snackBar.open(res['message'], "Please log in", {
            duration: 5000,
          });
        }
        
      })
  }

  loginUser(userName: string, password: string) {
    const userData = {
      userName: userName,
      password: password
    }

    this.http.post('http://localhost:3000/api/user/login', userData)
      .subscribe((res) => {
        let snackBarRef = this.snackBar.open(res['message'], "", {
          duration: 5000,
        });
        if(res['message'] === "You are logged in") {
          this.router.navigate(['/']);
          this.authenticationStatus.next(true);
        }
      })
  }
}
