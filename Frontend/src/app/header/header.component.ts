import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser : any ='';
  constructor(public auth :AuthserviceService, private router :Router ) { }
  title:String = "Trainer Management System";
    

  ngOnInit(): void {
    this.loggedUser = this.auth.getCurrentUser();
  }
  logoutUser()
{
localStorage.removeItem('token')
localStorage.removeItem('currentUser')
localStorage.removeItem('Approvalstatus')
localStorage.removeItem('allocateTrainerId')
localStorage.removeItem('trainerAlertMsg')
localStorage.removeItem("deleteTrainerId")
localStorage.removeItem("editTrainerId")
this.router.navigate(['/'])
}
getloguser(){
  this.loggedUser = this.auth.getCurrentUser(); 
  if(this.loggedUser=="tmsictak22@gmail.com"){
    return true;}
    else{
      return false;
    }
  }
  route(){
    this.router.navigate(['trainer-p']);
  }
  isapproved(){
  let apstatus=localStorage.getItem('Approvalstatus');

    if(apstatus=='true'){
      return true;
    }
    else{
      return false
    }

  }
}
