import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TrainerService } from '../trainer.service';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
 trainersdata:any;
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage  : boolean = true;

  alertMsg : any ='';

  trainer={
    trainername:String,
  email:String,
  phone:Number,
  address:String,
  qualification:String,
  skills:String,
  currentcompanyname:String,
  currentdesignation:String,
  courses:String,
  ID:String
    }
 
  
 
  trainers=[{
    trainername:String,
    email:String,
    phone:Number,
    address:String,
    qualification:String,
    skills:String,
    currentcompanyname:String,
    currentdesignation:String,
    courses:String,
    ID:String
  }]

  constructor(public trainerservice : TrainerService, private router:Router,private http : HttpClient, public auth :AuthserviceService, ) { }

   ngOnInit(): void {

    this.alertMsg = localStorage.getItem('trainerAlertMsg'); 
    this.trainerservice.getTrainerss()
    .subscribe((trainer)=>{
      this.trainersdata=trainer;
      console.log(trainer);
      localStorage.removeItem('trainerAlertMsg'); 
     });
     console.log (`Alert msg : ${this.alertMsg}` );
    }
    acceptTrainer(trainer: any)
  {
    
   this.trainerservice.AcceptTrainer(trainer._id)
    .subscribe((trainer)=>{
      this.trainersdata=trainer
      console.log(trainer);
      this.router.navigate(['trainer-profile']);
      localStorage.removeItem('trainerAlertMsg'); 
      });
   
  
  };

  rejectTrainer(trainer: any)
  {
    this.trainerservice.RejectTrainer(trainer._id)
    .subscribe((data)=>{
      this.trainers= this.trainers.filter(b => b!== trainer);
     
      });
    window.location.reload();
    localStorage.removeItem('trainerAlertMsg'); 
  };


}
