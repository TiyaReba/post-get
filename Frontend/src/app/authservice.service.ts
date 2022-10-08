import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }
  signup(User:any){
    return this.http.post<any>('http://localhost:3000/signup',User)
    .subscribe((data)=>{
      console.log(data);
    });
  }
  // login(User:any){
  //   return this.http.get<any>('http://localhost:3000/signup');
  // }
  // find the user is logged in same as signin user
  loginUser(logindata:any){
    return this.http.post<any>('http://localhost:3000/login',logindata)
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
   }
}
