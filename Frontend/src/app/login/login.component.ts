import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validator,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted=false
  constructor(private fb:FormBuilder) { }
  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
  })
  ngOnInit(): void {
  }
  get AllControls(){
    return this.loginForm.controls
  }
  onSubmit( values:any){
    this.submitted=true
    console.log(values);

  }
}
