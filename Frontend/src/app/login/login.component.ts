import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator,Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted=false
  logindata: any;
  constructor(private fb:FormBuilder,private authService:AuthserviceService,private router:Router) { }
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
  })

  ngOnInit(): void {
  }
  get AllControls(){
    return this.loginForm.controls
  }
  onSubmit(){
    this.submitted=true
    if(!this.loginForm.valid){
      alert("please fill the form")
    }
    else{
      var logindata = this.loginForm.value;
     if(logindata.email=="admin@gmail.com")
     {
      this.router.navigate(['/admin'])
     }
     else{
     
  this.authService.loginUser(logindata)
  .subscribe(data=>{
    localStorage.setItem('token', data.tok)   
    //localStorage.setItem('Approvalstatus', data.approval)         
    //localStorage.setItem('currentUser', this.logindata.email);
     if(data.error){
      alert("login failed")
     ;
      
    }
    else{
     
      this.router.navigate(['/enrollmentform'])
    }
   
  })
  }
}
    }
  



       

  

  
}