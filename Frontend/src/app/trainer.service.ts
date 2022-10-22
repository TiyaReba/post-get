import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  url: string = "api";

  constructor(public http : HttpClient) { }

  getTrainers(){
    return this.http.get(this.url + '/trainerlist');
  }

  addForms(item:any){
    console.log("inside trainers")
    console.log(item);
    return this.http.post(this.url + '/form',item)
    .subscribe(data =>{console.log(data)})
    
  }

  deleteTrainer(id:any)
  {
    return this.http.delete(this.url + "/trainerprofiles/delete/"+id)
  }

 
  findTrainers(find:any){
    console.log("inside search service file",find)
    return this.http.put<any>(this.url + "/find",{"find":find});
    
  }

  allocateTrainer(body:any){
  console.log("inside allocate service file id",body._id)
  return this.http.put<any>(this.url + "/allocate",body)
  
}

trainerallotebyId(id:any){
  console.log('trainerallote id in servicen file',id)
  return this.http.get(this.url + "/trainer/"+id);
 
}
  loadProfile(email:any){
    console.log("inside service file of loadprofile",email);
    return this.http.get(this.url + "/trainerProfile/"+email);
  }
  getTrainerE(email:any){
    console.log("inside getTrainerE service file",email)
    return this.http.get(this.url + "/trainerProfile/"+email)
  };
  editProfile(body:any){
      console.log("inside service of edit profile",body.email)
     return this.http.put(this.url + "/trainerProfile/edit/",body)
    
    }
  AcceptTrainer(body:any){
    console.log("inside accept service file")
    return this.http.put(this.url + "/requests/accept/",body)
  }
  RejectTrainer(id:any){
    console.log("inside allocate service file")
    return this.http.delete(this.url + "/requests/delete/"+id)
  }
  getTrainerss(){
    return this.http.get(this.url + '/requests')
  };
}
