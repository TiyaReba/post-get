import { Component, OnInit } from '@angular/core';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})


export class TrainerProfileComponent implements OnInit {
  search={
    text:''
  }
  trainervalue:any;

  trainers: Trainermodel[] | any;
  trainer=[{
    name:'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skillset:'',
    company:'',
    designation:'',
    ictakcourses:'',
    photo:'',
    ID:''
  }]
  constructor(private trainerService :TrainerService,private router:Router) { }
  deleteTrainer(trainer:any){
    var id = trainer._id;
    console.log("trainerid",id);
    this.trainerService.deleteTrainer(trainer._id)
    .subscribe((res:any)=>{
      this.trainers = this.trainers.filter((p: any) => p!==trainer)
    })

  }

allocateTrainer(trainer:any){
  localStorage.setItem("allocateTrainerId",trainer._id.toString());
  this.router.navigate(['admin'])
  
}
  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe((data) =>{
      this.trainers = JSON.parse(JSON.stringify(data));

    })
  }

  Search(formValue:NgForm){
    this.trainerService.findTrainers(this.search)
      .subscribe((trainers)=>{
        this.trainervalue = trainers;
        console.log(this.trainervalue);
   })
  }


}
