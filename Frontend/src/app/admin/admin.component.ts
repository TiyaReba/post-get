import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerService } from '../trainer.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private af:FormBuilder,private trainerservice:TrainerService,private router:Router) { }
  courselist:any=['FSD','DSA','RPA']
  Courseid:any =['01_DSA', '02_FSD', '03_RPA']
  Batchid:any =[ 'DSA001', 'DSA002', 'FSD001']
  submit=false
  adminform = this.af.group({
    startdate:['',Validators.required],
    enddate:['',Validators.required],
    starttime:['',Validators.required],
    endtime:['',Validators.required],
    courses:['',Validators.required],
    courseid:['',Validators.required],
    batchid:['',Validators.required],
    link:['',Validators.required]

  })

  get f(){
    return this.adminform.controls;
  }

  ngOnInit(): void {
  }

  onclick(){
    this.submit = true
  console.log("clicked")

  console.log('f', this.f)
  this.trainerservice.allocateTrainer((this.adminform.value))
  if(!this.adminform.valid){
    alert("Please fill all required fields...")
  }

  else{
   console.log(this.adminform.value);
    alert("Trainer allocated sucessfully")
    this.router.navigate(['home'])
  }
    
  }

}
