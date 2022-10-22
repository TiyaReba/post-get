import { Component, OnInit } from '@angular/core';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    ID:'',
    type:''

  }]
  constructor(private trainerService :TrainerService,private router:Router) { }
  deleteTrainer(trainer:any){
    var id = trainer._id;
    console.log("trainerid",id);
    this.trainerService.deleteTrainer(trainer._id)
    .subscribe((res:any)=>{
      Swal.fire(
        'Deleted!',
        'Trainer Details has been deleted.',
        'success'
      )
      this.trainers = this.trainers.filter((p: any) => p!==trainer)

    })
   
  }

allocateTrainer(trainer:any){
  localStorage.setItem("allocateTrainerId",trainer._id.toString());
  this.router.navigate(['admin'])
  console.log("currenttrainer id is",trainer._id)
  
}
  ngOnInit(): void {
  
    this.trainerService.getTrainers().subscribe((data) =>{
      this.trainers = data;
    })
  }

  Search(searchForm:NgForm){
    console.log("this.search value",this.search)
    this.trainerService.findTrainers(this.search)
      .subscribe((trainer)=>{
        this.trainers = trainer
        console.log("trainervalue is:",trainer)
      
        })
        // window.location.reload();
  }

}