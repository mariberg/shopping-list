// register and login through this service

// this service sends the information to guard whether a user is logged in or not

import { User } from './dataclasses';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// This library provides an HttpInterceptor which automatically attaches
//a JSON Web Token to HttpClient requests.
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'https://arcane-bayou-86243.herokuapp.com/users';
  private apiUrl = 'http://localhost:3000/users';
  //private listsUrl = 'https://arcane-bayou-86243.herokuapp.com/lists';
  private listsUrl = 'http://localhost:3000/lists';
  public token: string;
  private jwtHelp = new JwtHelperService(); // used to decode token
  private subject = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  const: User[] = [];

  constructor(private http: HttpClient) {
    // if token is already in sessionStorage, we will keep it, if there is no token it is an empty object
    const currentUser = JSON.parse(
      sessionStorage.getItem('accesstoken') || '{}'
    );
    this.token = currentUser && currentUser.token;
  }

  register(newUser: User): Observable<User> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<User>(url, newUser, this.httpOptions);
  }

  // creating lists for a user that has just registered
  createLists(username: string): Observable<any> {
    return this.http.post(
      this.listsUrl,
      { username: username },
      this.httpOptions
    );
  }

  /* login-method gets true from the server if a token has been created */
  login(username: string, password: string): Observable<boolean> {
    username = username.toLowerCase(); // username is changed to lowercase
    const url = `${this.apiUrl}/login`;
    return this.http
      .post(url, { username: username, password: password }, this.httpOptions)
      .pipe(
        map((res: any) => {
          console.log(res); // this kind of response is logged:
          /*
        {success: true, message:
          "Tässä on valmis Token!",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…zNzV9.x1gWEg9DtoPtEUUHlR8aDgpuzG6NBNJpa2L-MEhyraQ"}
        */

          const token = res['token']; // token from the response
          if (token) {
            this.token = token;
            /* Check whether content of payload is correct, if it is (true), user
          can continue to guarded components
          */
            try {
              // decoding token
              const payload = this.jwtHelp.decodeToken(token);
              console.log(payload);
              // is payload matching:
              if (payload.username === username) {
                // token to sessionStorage
                sessionStorage.setItem(
                  'accesstoken',
                  JSON.stringify({ username: username, token: token })
                );
                this.loginTrue(); // status in navbar changed to login:true
                console.log('login onnistui');
                return true; // saatiin token
              } else {
                console.log('login epäonnistui');
                return false; // couldn't get token
              }
            } catch (err) {
              return false;
            }
          } else {
            console.log('tokenia ei ole');
            return false;
          }
        })
      );
  }

  loginTrue(): Observable<any> {
    this.subject.next(true);
    return this.subject.asObservable();
  }

  // logout removes token from session storage
  logout(): void {
    this.token = '';
    sessionStorage.removeItem('accesstoken');
  }
}
