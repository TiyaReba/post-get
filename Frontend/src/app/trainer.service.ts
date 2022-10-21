import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {
 

  constructor(public http : HttpClient) { }

  getTrainers(){
    return this.http.get('http://localhost:3000/trainerlist');
  }

  addForms(item:any){
    console.log("inside trainers")
    console.log(item);
    return this.http.post('http://localhost:3000/form',item)
    .subscribe(data =>{console.log(data)})
    
  }

  deleteTrainer(id:any)
  {
    return this.http.delete("http://localhost:3000/trainerprofiles/delete/"+id)
  }

 
  findTrainers(find:any){
    console.log("inside search service file",find)
    return this.http.put<any>("http://localhost:3000/find",{"find":find});
    
  }

  allocateTrainer(body:any){
  console.log("inside allocate service file id",body._id)
  return this.http.put<any>("http://localhost:3000/allocate",body)
  
}

trainerallotebyId(id:any){
  console.log('trainerallote id in servicen file',id)
  return this.http.get("http://localhost:3000/trainer/"+id);
 
}
  loadProfile(email:any){
    console.log("inside service file of loadprofile",email);
    return this.http.get("http://localhost:3000/trainerProfile/"+email);
  }
  getTrainerE(email:any){
    console.log("inside getTrainerE service file",email)
    return this.http.get("http://localhost:3000/trainerProfile/"+email)
  };
  editProfile(body:any){
      console.log("inside service of edit profile",body.email)
     return this.http.put("http://localhost:3000/trainerProfile/edit/",body)
    
    }
  AcceptTrainer(body:any){
    console.log("inside accept service file")
    return this.http.put("http://localhost:3000/requests/accept/",body)
  }
  RejectTrainer(id:any){
    console.log("inside allocate service file")
    return this.http.delete("http://localhost:3000/requests/delete/"+id)
  }
  getTrainerss(){
    return this.http.get('http://localhost:3000/requests')
  };
}
