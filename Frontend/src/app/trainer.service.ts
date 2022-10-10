import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';


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
    console.log("inside search service file")
    return this.http.put<any>("http://localhost:3000/trainerprofiles/find",find);
  }

  loadProfile(id:any){
    return this.http.get<any>("http://localhost:3000/trainerlist/"+id)
  }
  
}
