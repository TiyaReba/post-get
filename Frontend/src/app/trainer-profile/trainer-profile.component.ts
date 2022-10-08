import { Component, OnInit } from '@angular/core';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})


export class TrainerProfileComponent implements OnInit {
  search={
    text:''
  }

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
  constructor(private trainerService :TrainerService) { }
  deleteTrainer(data:any){

  }
  editTrainer(trainer:any){

  }
allocateTrainer(trainer:any){
  
}
  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe((data) =>{
      this.trainers = JSON.parse(JSON.stringify(data));

    })
  }

  Search(formValue:NgForm){
    this.trainerService.getTrainers()
      .subscribe((trainer)=>{
        this.trainers = trainer;
        // console.log(this.trainers);
   })
  }


}
