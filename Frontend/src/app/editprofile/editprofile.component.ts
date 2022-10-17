import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  trainerdata:any;
  constructor(private trainerService :TrainerService ,private router:Router,private http:HttpClient) { }
  courselist:any=['FSD','DSA','RPA']
  submit=false
  trainer={
    trainername:'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skills:'',
    currentcompanyname:'',
    currentdesignation:'',
    courses:'',
    approved:'',
    employment:''
  }
  // registrationForm = this.fb.group({
  // trainername:['',Validators.required],
  // email:['',[Validators.required,Validators.email]],
  // phone:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
  // address:['',Validators.required],
  // qualification:['',Validators.required],
  // skills:['',Validators.required],
  // currentcompanyname:[''],
  // currentdesignation:[''],
  // courses:['',Validators.required]})
   
  // get f(){
  //   return this.registrationForm.controls;
  // };
  ngOnInit(): void {
    let trainerID = localStorage.getItem('edittrainer');
    this.trainerService.getTrainerE(trainerID)
    .subscribe((trainerdata)=>{
      this.trainer =JSON.parse(JSON.stringify(trainerdata))
      console.log(this.trainer);
      console.log("trainerid in ngonit edit",trainerID)
    });
  }
  editProfile(){
   
   console.log("rg in onsubmit editprofile")
        this.trainerService.editProfile(this.trainer);
        alert('Profile has been updated!');
        this.router.navigate(['trainer-p']);
  }
}
