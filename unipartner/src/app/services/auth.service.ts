import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headerAll:any
  helper=new JwtHelperService()
  constructor(private http:HttpClient) { 
    let token=sessionStorage.getItem('token');
    if(token!==null){

      this.headerAll = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
  }

  register(data:User){
    return this.http.post(`${environment.urlBackend}api/auth/signup`,data);
  }
  login(data: any) {
    return this.http.post(`${environment.urlBackend}api/auth/login`, data)
      .pipe(
        tap((response: any) => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userRole');
  
          const token = response.token;
          const userRole = response.userRole;
  
          if (userRole === "ETUDIANT") {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userRole', userRole);
          }
        })
      );
  }
  
  
  getDataUser(email:any){
    return this.http.get(`${environment.urlBackend}api/users?email=${email}`,{headers:this.headerAll});
  }
  saveTokenUser(token: any, userRole: any) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    
    if (userRole === "ETUDIANT") {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userRole', userRole);
    }
  }
  
  LoggedInUser() {
    let token = sessionStorage.getItem('token');
    if (!token || this.helper.isTokenExpired(token)) {
      return false;
    }
  
    let decodedToken = this.helper.decodeToken(token);
  
    if (sessionStorage.getItem("userRole") !== "ETUDIANT") {
      return false;
    }
  
    return true;
  }
  
  getUserEmail(){
    console.log("from here")
    let x;
    let token=sessionStorage.getItem('token');
    let decodedToken;
    if(token !== null){
      decodedToken=this.helper.decodeToken(token);
     x=decodedToken.sub
     console.log(x)
    }
    return x;
  }
}
