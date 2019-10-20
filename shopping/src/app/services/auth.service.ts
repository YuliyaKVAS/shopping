import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FbAuthResponse, User} from "../models/user.model";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

const BASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  get token() {
    return localStorage.getItem('token')
  }

  login(user: User) {
    return this.http.post(BASE_AUTH_URL, user)
      .pipe(
        tap(this.setToken.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch(message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid Email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('No such email exists');
        break;
    }
    return throwError(error);
  }

  private setToken(response: FbAuthResponse | null) {
    if(response) {
      localStorage.setItem('token', response.idToken)
    } else {
      localStorage.clear();
    }
  }
}
