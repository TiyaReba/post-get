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

  trainers=[{
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

  constructor(public trainersObj : TrainerService, private router:Router,private http : HttpClient, public auth :AuthserviceService, ) { }

   ngOnInit(): void {


    this.alertMsg = localStorage.getItem('trainerAlertMsg');    
    setTimeout(() => {
    this.trainersObj.getTrainers()
    .subscribe((trainer)=>{
      this.trainersdata=trainer;
      console.log(trainer);
      localStorage.removeItem('trainerAlertMsg'); 
      });
       }, 50);
       console.log (`Alert msg : ${this.alertMsg}` );
    }

    

 
   
  acceptTrainer(trainer: any)
  {
    
    //this.router.navigate(['editTrainer']);
    this.trainersObj.AcceptTrainer(trainer._id)
    .subscribe((data)=>{console.log(data);
     
      });
    this.router.navigate(['trainer-profile']);
    localStorage.removeItem('trainerAlertMsg'); 
  };

  rejectTrainer(trainer: any)
  {
    this.trainersObj.RejectTrainer(trainer._id)
    .subscribe((data)=>{
      this.trainers= this.trainers.filter(b => b!== trainer);
     
      });
    window.location.reload();
    localStorage.removeItem('trainerAlertMsg'); 
  };


}
