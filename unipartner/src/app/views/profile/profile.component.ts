import { HttpErrorResponse } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: User = {
    email: '',
    name: '',
    lastname: '',
    gender: '',
    photo: '',
    skills: [],
    interests: [],
    redFlags: [],
    signals: [],
    id: '',
    pwd: '',
    userRole: '',
  };

  constructor(private service: AuthService, private dataService: DataService, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-x', 'hidden');

    this.getCurrentUser();
  }
  email: any;
  async getCurrentUser() {
    this.email = this.service.getUserEmail();
    try {
      const data: any = await this.service.getDataUser(this.email).toPromise();
      console.log(data);
      console.log(data.signals.length);

      this.user.email = data.email;
      this.user.name = data.name;
      this.user.lastname = data.lastname;
      this.user.gender = data.gender;
      this.user.photo = data.photo;
      this.user.skills = data.skills;
      this.user.interests = data.interests;
      this.user.redFlags = data.redFlags;
      this.user.signals = data.signals;
    } catch (err) {
      console.log(err);
    }
  }
}
