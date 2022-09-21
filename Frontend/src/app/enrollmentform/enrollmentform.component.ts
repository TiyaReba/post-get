import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
@Component({
  selector: 'app-enrollmentform',
  templateUrl: './enrollmentform.component.html',
  styleUrls: ['./enrollmentform.component.css']
})
export class EnrollmentformComponent implements OnInit {

  constructor(private fb:FormBuilder,private trainerService :TrainerService) { }
  // trainers: Trainermodel[] | any;
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
  courses:['',Validators.required]
})
get f(){
  return this.registrationForm.controls;
}
onsubmit(){
  this.submit = true
  this.trainerService.addForms((this.registrationForm.value))
      // console.log(JSON.parse(JSON.stringify(res.body)))
  
  //  alert("new employee added")


  if(!this.registrationForm.valid){
    alert("Please fill all required fields...")
  }

  else{
   console.log(this.registrationForm.value);
    alert("Trainer addedd sucessfully")
  }
  console.log("clicked")
  console.log('f', this.f)
}

  ngOnInit(): void {
  }

}
