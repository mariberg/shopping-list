// authGuard confirms if user has authorization to access the guarded routes

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // Token is found from sessionStorage and the method returns true
    if (sessionStorage.getItem('accesstoken')) {
      return true;
    }

    // No token found and navigatin back to login
    this.router.navigate(['/login']);
    return false;
  }
}
