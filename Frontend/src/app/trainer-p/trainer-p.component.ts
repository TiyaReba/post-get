import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';
@Component({
  selector: 'app-trainer-p',
  templateUrl: './trainer-p.component.html',
  styleUrls: ['./trainer-p.component.css']
})
export class TrainerPComponent implements OnInit {
  trainer={
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
    employment:''
  }
  constructor(private router:Router ,private trainerService:TrainerService) { }

  ngOnInit(): void {
    let trainerEmail=localStorage.getItem('loggedUser');
    this.trainerService.loadProfile(trainerEmail)
        .subscribe((trainerProfile)=>{
          this.trainer=JSON.parse(JSON.stringify(trainerProfile));
        })
  }
  editTrainer(trainer:any){
     
      // localStorage.setItem("edittrainer", trainer._id.toString());
      this.router.navigate(['editprofile']);
  
    
  }
}
