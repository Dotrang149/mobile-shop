import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterUser {
  userName: string;
  email: string;
  password: string;
  confirmPassword : string;
  phoneNumber?: string;
}

export interface LoginUser {
  userName: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7189/api/User/"
  constructor(private http : HttpClient) { }

  signUp(userObj:RegisterUser) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  login(loginObj:LoginUser) {
    return this.http.post<any>(`${this.baseUrl}login`, loginObj)
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, { email });
  }

}
