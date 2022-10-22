import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {
 

  constructor(public http : HttpClient) { }

  getTrainers(){
    return this.http.get('api/trainerlist');
  }

  addForms(item:any){
    console.log("inside trainers")
    console.log(item);
    return this.http.post('api/form',item)
    .subscribe(data =>{console.log(data)})
    
  }

  deleteTrainer(id:any)
  {
    return this.http.delete("api/trainerprofiles/delete/"+id)
  }

 
  findTrainers(find:any){
    console.log("inside search service file",find)
    return this.http.put<any>("api/find",{"find":find});
    
  }

  allocateTrainer(body:any){
  console.log("inside allocate service file id",body._id)
  return this.http.put<any>("api/allocate",body)
  
}

trainerallotebyId(id:any){
  console.log('trainerallote id in servicen file',id)
  return this.http.get("api/trainer/"+id);
 
}
  loadProfile(email:any){
    console.log("inside service file of loadprofile",email);
    return this.http.get("api/trainerProfile/"+email);
  }
  getTrainerE(email:any){
    console.log("inside getTrainerE service file",email)
    return this.http.get("api/trainerProfile/"+email)
  };
  editProfile(body:any){
      console.log("inside service of edit profile",body.email)
     return this.http.put("api/trainerProfile/edit/",body)
    
    }
  AcceptTrainer(body:any){
    console.log("inside accept service file")
    return this.http.put("api/requests/accept/",body)
  }
  RejectTrainer(id:any){
    console.log("inside allocate service file")
    return this.http.delete("api/requests/delete/"+id)
  }
  getTrainerss(){
    return this.http.get('api/requests')
  };
}
