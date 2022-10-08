import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Signupsubmitted=false
  hide=true
  constructor(private fb:FormBuilder,private authService:AuthserviceService,private router:Router) { }
  signupForm=this.fb.group({
    Username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',[Validators.required],],
    })

  ngOnInit(): void {
  }
  get AllControlsForSignUp(){
    return this.signupForm.controls
  }
  onSubmitSignup(values:any){
    this.Signupsubmitted=true
    this.authService.signup(this.signupForm.value);
    console.log('called');
    alert('Congratulations, Your Account Has Been Successfully Created.');
    this.router.navigate(['/login']);
  }
  
}
