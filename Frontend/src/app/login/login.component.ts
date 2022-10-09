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
      console.log(JSON.stringify(this.loginForm.value));
      var logindata = this.loginForm.value;
  this.authService.loginUser(logindata)
  .subscribe({
    next: (res) =>   {console.log('sucessfully loggedin');
    localStorage.setItem('token',res.token);
   this.router.navigate(['/']);}, 
    error: (error) => {
      console.log(error);
      alert('Incorrect Email Adderess Or Password');
        
    }
  })
  }
    }
  



       

  

  
}