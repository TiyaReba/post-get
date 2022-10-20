import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) { }
  signup(sdata:any){
    console.log("service in signup auth service")
    return this.http.post<any>('http://localhost:3000/signup',sdata)
    
   
  }

  loginUser(logindata:any){
  
    console.log("service in logincomponent.ts")
    return this.http.post<any>('http://localhost:3000/login',logindata)
  }
  loggedIn(){
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
   }
   getCurrentUser()
   {
     return localStorage.getItem('currentUser')
   }
   getTrainerId()
   {
    return localStorage.getItem('editTrainerId')
   }
 
}
