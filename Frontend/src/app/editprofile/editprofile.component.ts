import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  constructor(private fb:FormBuilder,private trainerService :TrainerService ,private router:Router) { }
  courselist:any=['FSD','DSA','RPA']
  submit=false
  registrationForm = this.fb.group({
  trainername:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  phone:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
  address:['',Validators.required],
  qualification:['',Validators.required],
  skills:['',Validators.required],
  currentcompanyname:[''],
  currentdesignation:[''],
  courses:['',Validators.required]})
   
  get f(){
    return this.registrationForm.controls;
  };
  ngOnInit(): void {
    let UserId= localStorage.getItem("profileeditId");
    this.trainerService.loadProfile("UserId").subscribe((data)=>{
      this.registrationForm=JSON.parse(JSON.stringify(data));
    });
    
  }
  onsubmit(){

  }
}
