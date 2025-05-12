import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  headerAll:any
  helper = new JwtHelperService();
  constructor(private http: HttpClient) { 
    let token=sessionStorage.getItem('token');
    if(token!==null){

      this.headerAll = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
  }
  login(data: any) {
    return this.http.post(`${environment.urlBackend}api/auth/login`, data);
  }
  loggedIn(): boolean {
    let token: any = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    let decodedToken = this.helper.decodeToken(token)

    return true;
  }
  saveTokenUser(token:any, userRole:any){
    if(userRole === "ADMIN"){
      sessionStorage.setItem('token',token);
      sessionStorage.setItem('userRole', userRole);
    }
  }
  getAdminData(email:any){
    return this.http.get(`${environment.urlBackend}api/admin/user?email=${email}`,{headers:this.headerAll});
  }
  getAdminEmail(){
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
