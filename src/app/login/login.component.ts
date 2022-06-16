import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // Angular's service
import { User } from '../dataclasses';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = ''; // empty string until error added if user gives wrong login details

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  // sending login form to authService
  // authService returns observable that is either true or false
  onSubmit(formdata: any) {
    this.authService
      .login(formdata.username, formdata.password)
      .subscribe((result) => {
        if (result === true) {
          this.router.navigate(['/mainSupermarket']);
        } else {
          this.error = 'Incorrect username or password';
        }
      });
  }

  ngOnInit(): void {}
}
