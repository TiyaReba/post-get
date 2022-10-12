import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthserviceService } from './authservice.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthserviceService,private router:Router){}
  
  canActivate():boolean{

    if(this.authService.loggedIn()){ 
      console.log('logged in :true');
      return true;
 }
 else{
  console.log('logged in :false')
     this.router.navigate(['/login']);
     return false;
 }
  }
  }
  

