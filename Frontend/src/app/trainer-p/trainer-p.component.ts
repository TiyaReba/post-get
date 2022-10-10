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
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  editTrainer(trainer:any){
     
      // localStorage.setItem("edittrainer", trainer._id.toString());
      this.router.navigate(['editprofile']);
  
    
  }
}
