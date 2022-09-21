import { Component, OnInit } from '@angular/core';
import { Trainermodel } from '../trainer-profile/trainer.model'
import { TrainerService } from '../trainer.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {

  trainers: Trainermodel[] | any;
  constructor(private trainerService :TrainerService) { }

  ngOnInit(): void {
    this.trainerService.getTrainers().subscribe((data) =>{
      this.trainers = JSON.parse(JSON.stringify(data));

    })
  }

}
