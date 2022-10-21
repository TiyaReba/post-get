import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TrainerService } from '../trainer.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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
    image:'',
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
    employment:'', ID:'',
    link:''
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
      let trainerEmail= localStorage.getItem('currentUser');
       this.trainerService.getTrainerE(trainerEmail)
       .subscribe((trainerdata)=>{
      this.trainer =JSON.parse(JSON.stringify(trainerdata))
      console.log(this.trainer);
      console.log("trainerid in ngonit edit",trainerEmail)
    });
  }
  editProfile(formValue:NgForm){
   
        console.log("rg in onsubmit editprofile",this.trainer)
        this.trainerService.editProfile(this.trainer)
        .subscribe((data)=>{console.log(data)})
        Swal.fire(
          'UPDATED!',
          'Your profile has been deleted.',
          'success')
        this.router.navigate(['trainer-p']);
  }
}
