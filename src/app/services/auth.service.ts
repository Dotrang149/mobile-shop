import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

export interface ForgotPassword {
  username: string;
  email: string;
}

export interface ResetPassword {
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
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

  resetPassword(data: ResetPassword): Observable<ResetPassword> {
    return this.http.put<any>(`${this.baseUrl}update-password`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  verifyUser(data: ForgotPassword): Observable<ForgotPassword> {
    let params = new HttpParams().set('username',data.username).set('email', data.email);
    return this.http.get<any>(`${this.baseUrl}verify-user`, {params});
  }



}
