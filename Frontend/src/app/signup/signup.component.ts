import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  Signupsubmitted=false
  hide: boolean = true;
  constructor(private fb:FormBuilder,private authService:AuthserviceService,private router:Router) { }
  signupForm=this.fb.group({
    Username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    })
    
SignUpError ={
  error : false,
  errorMsg : ''
};

User={
  username:'',
  email:'',
  password:''
}
  ngOnInit(): void {
  }
  get AllControlsForSignUp(){
    return this.signupForm.controls
  }
  onSubmitSignup(){
    this.Signupsubmitted=true
    if(!this.signupForm.valid){
      //alert("please fill the form")
      Swal.fire('Oops', 'Fill in all the details!', 'error');
    }
    else{
    var sdata=this.signupForm.value
    console.log(this.signupForm.value)
    this.authService.signup(sdata)
 .subscribe (data=>{
       if(data.message="success"){
        Swal.fire('Thank you...', 'You registered succesfully!', 'success')
      
        this.router.navigate(['/login'])
      
      
        }
        else 
        {  
          Swal.fire('Sorry...', 'something went wrong', 'error')
          }
        }
          
 )
    

  
  
      }}}