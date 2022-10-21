import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerService } from '../trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  
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
    link:'',
    type:'',
    id:'',
    approved:''

  }
  courselist:any=['FSD','DSA','RPA']
  Courseid:any =['01_DSA', '02_FSD', '03_RPA']
  Batchid:any =[ 'DSA001', 'DSA002', 'FSD001']

  constructor(private af:FormBuilder,private trainerservice:TrainerService,private router:Router) { }
 
  details:any;
  
  ngOnInit(): void {
    this.details=localStorage.getItem('allocateTrainerId');
    this.trainerservice.trainerallotebyId(this.details).subscribe((data)=>{
      this.adminform=JSON.parse(JSON.stringify(data));
      console.log("ngonit in admin",data)
  })
  }

  onclick(formValue:NgForm){
  console.log("clicked in admim allocation submit")
  this.trainerservice.allocateTrainer((this.adminform))
  .subscribe((data) =>{
   
    console.log(data)
  
  console.log(this.adminform); 
  Swal.fire(
    'Allocated!',
    'Trainer has been allocated successfully.',
    'success'
  )
  this.router.navigate(['/trainer-profile'])
  })
  localStorage.setItem('trainerAlertMsg', `The form submitted successfully`); 
  
    
  }

}
