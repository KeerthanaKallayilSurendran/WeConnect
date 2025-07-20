import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  serverUrl = "http://localhost:5000"

  registerUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/register`,reqBody)
  }

  loginUserApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/login`, reqBody)
  }

  forgotPasswordApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/forgot-password`,reqBody)
  }

  verifyOtpApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/verify-otp`, reqBody)
  }

  resetPasswordApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/reset-password`, reqBody)
  }

  signinGoogleApi(){
    return this.http.get(`${this.serverUrl}//auth/google`)
  }

}
