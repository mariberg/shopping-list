import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Lists } from '../dataclasses';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  error: string = ''; // empty string until error added if user give wrong login details
  users: User[] = [];
  lists: Lists[] = [];
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  loading = false;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit(formData: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.authService
      .register({
        id: formData.id,
        username: formData.username,
        password: formData.password,
      })
      .subscribe((user) => {
        this.users.push(user);
      });
    // after registering a new user, a lists document is created for them
    this.authService.createLists(formData.username).subscribe((list) => {
      this.lists.push(list);
    });

    //TODO navigating to Login component after registration completed, this should be modified to be more user friendly
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  ngOnInit(): void {}
}
