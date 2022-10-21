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
    image:'',
    trainername:'',
    email:'',
    ID:'',
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
    let trainerEmail=localStorage.getItem('currentUser');
    console.log("traineremail in ng of trainerp",trainerEmail)
    this.trainerService.loadProfile(trainerEmail)
        .subscribe((trainerProfile)=>{
          this.trainer=JSON.parse(JSON.stringify(trainerProfile));
        })
  }
  editTrainer(trainer:any){
     
       localStorage.setItem("edittrainer", this.trainer.toString());
      this.router.navigate(['editprofile']);
      console.log("edit in trainerp localstorage",this.editTrainer)
    
  }
}
