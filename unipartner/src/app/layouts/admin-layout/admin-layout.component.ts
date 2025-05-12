import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  username: string = '';
  avatar: string = '';
  constructor(private authService: AdminService, private router: Router) {
    // console.log(this.authService.loggedIn())

    // this.username = this.authService.getUserName();
    // this.avatar = this.authService.getUserAvatar();

  }

  ngOnInit(): void {
  this.getAdminData();
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/admin/login']);
  }
  getAdminData(){
    let email=this.authService.getAdminEmail();
    this.authService.getAdminData(email).subscribe(
      {
        next:(value:any)=> {
          console.log(value)
          this.username=value.name;
          this.avatar=value.photo;
          console.log(this.username)
          console.log(this.avatar)
        },error:(err)=> {
          console.log(err)
        },
      }
    )
  }

}