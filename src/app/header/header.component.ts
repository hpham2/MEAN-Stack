import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/login/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.userService.getAuthenticationStatus().subscribe(status => this.isAuthenticated = status);
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/']);
    console.log(this.isAuthenticated)
    this.snackBar.open("You are logged out!", "", {
      duration: 5000,
    });
  }
}
