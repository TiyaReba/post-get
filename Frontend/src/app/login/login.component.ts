import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator,Validators } from '@angular/forms';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { Token } from '@angular/compiler';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted=false
  logindata: any;
  hide = true;
  LoginError ={
    error : false,
    errorMsg : ''
  };
  
showErrorMessage=false;

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
     // alert("please fill the form")
      Swal.fire('Oops', 'Fill in all the details!', 'error');
    }
    else{
      var logindata = this.loginForm.value;
      this.authService.loginUser(logindata)
  .subscribe(data=>{
    if(data){
      console.log(data.token);
          if(data.token){
            localStorage.setItem('token', data.tok)   
              localStorage.setItem('currentUser',JSON.stringify(data));
              localStorage.setItem('Approvalstatus', data.approval)         
              localStorage.setItem('currentUser', data.email);
              if(data.email=="tmsictak22@gmail.com")
             {
                 this.router.navigate(['/trainer-profile'])
            } 
           else{
     
                this.router.navigate(['/enrollmentform'])
               }
            }
          else{
          console.log(data.error.message);
          }   
       }}
     , (error: any) => {
    console.log('Login Failed'); // handle login failed here. 
})

}
 
  }
 
  
}


       

  

  
