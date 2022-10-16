import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Trainermodel } from '../trainer-profile/trainer.model'
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
  constructor(private fb:FormBuilder,private trainerService :TrainerService ,private router:Router,private http:HttpClient) { }
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
    let trainerID = localStorage.getItem('editTrainer');
    this.trainerService.getTrainerE(trainerID)
    .subscribe((trainerdata)=>{
      this.registrationForm =JSON.parse(JSON.stringify(trainerdata))
      console.log(this.registrationForm);
      console.log("trainerid in ngonit edit",trainerID)
    });
  }
  onsubmit(){
   let rg=this.registrationForm.value
   console.log("rg in onsubmit editprofile",rg)
        this.trainerService.editProfile(rg);
        alert('Profile has been updated!');
        this.router.navigate(['trainer-p']);
  }
}
