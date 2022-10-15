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
  adminform = {
    trainername:'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skills:'',
    currentcompanyname:'',
    currentdesignation:'',
    courses:'',
    startdate:'',
    enddate:'',
    starttime:'',
    endtime:'',
    coursesname:'',
    courseid:'',
    batchid:'',
    link:''

  }

  // get f(){
  //   return this.adminform.controls;
  // }
  details:any;
  
  ngOnInit(): void {
    this.details=localStorage.getItem('allocateTrainerId');
    this.trainerservice.trainerallotebyId(this.details).subscribe((data)=>{
      this.adminform=JSON.parse(JSON.stringify(data));
  })
  }

  onclick(){
  this.submit = true
  console.log("clicked")
  this.trainerservice.allocateTrainer((this.adminform))
   console.log(this.adminform);
    alert("Trainer allocated sucessfully")
    this.router.navigate(['/home'])
  
    
  }

}
