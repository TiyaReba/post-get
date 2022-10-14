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
  _id:String
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
    _id:String
  }]

  constructor(public trainersObj : TrainerService, private router:Router,private http : HttpClient, public auth :AuthserviceService, ) { }

   ngOnInit(): void {

    this.trainersObj.getTrainerss()
    .subscribe((trainer)=>{
      this.trainersdata=trainer;
      console.log(trainer);
     });
    
    }

    acceptTrainer(trainer: any)
  {
    
   this.trainersObj.AcceptTrainer(trainer._id)
    .subscribe((trainer)=>{
      this.trainersdata=trainer
      console.log(trainer);
      this.router.navigate(['trainer-profile']);
      });
   
  
  };

  rejectTrainer(trainer: any)
  {
    this.trainersObj.RejectTrainer(trainer._id)
    .subscribe((data)=>{
      this.trainers= this.trainers.filter(b => b!== trainer);
     
      });
    window.location.reload();
  };


}
