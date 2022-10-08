import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentformComponent } from './enrollmentform/enrollmentform.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from 'src/home/home.component';


const routes: Routes = [{path:'enrollmentform',component:EnrollmentformComponent},
                        {path:'login',component:LoginComponent},
                        {path:'signup',component:SignupComponent},
                        {path:'trainer-profile',component:TrainerProfileComponent},
                        {path:'admin',component:AdminComponent},{path:'home',component:HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
