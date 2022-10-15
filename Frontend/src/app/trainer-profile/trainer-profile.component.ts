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
    trainername:'',
    email:'',
    phone:'',
    address:'',
    qualification:'',
    skills:'',
    currentcompanyname:'',
    currentdesignation:'',
    courses:'',

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
      this.trainers = data;
    })
  }

  Search(searchForm:NgForm){
    let search =this.search.text
    console.log("this.search value",search)
    this.trainerService.findTrainers(this.search.text)
      .subscribe((trainer)=>{
        // this.trainervalue = JSON.parse(JSON.stringify(trainer));
        // console.log(this.trainervalue);
        this.trainervalue = trainer;
        this.trainers = trainer
        console.log("trainervalue is:",this.trainervalue)

        })
  
  }
}