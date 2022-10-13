import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentformComponent } from './enrollmentform/enrollmentform.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerProfileComponent } from './trainer-profile/trainer-profile.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from 'src/home/home.component';
import { TrainerPComponent } from './trainer-p/trainer-p.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AuthGuard } from './auth.guard';
import { RequestComponent } from './request/request.component';


const routes: Routes = [{path:'enrollmentform',canActivate: [AuthGuard],component:EnrollmentformComponent},
                        {path:'login',component:LoginComponent},
                        {path:'signup',component:SignupComponent},
                        {path:'trainer-profile',canActivate: [AuthGuard],component:TrainerProfileComponent},
                        {path:'admin',canActivate:[AuthGuard],component:AdminComponent},
                        {path:'',component:HomeComponent},
                        {path:'trainer-p',component:TrainerPComponent},
                        {path:'editprofile',component:EditprofileComponent},{path:'request',component:RequestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
