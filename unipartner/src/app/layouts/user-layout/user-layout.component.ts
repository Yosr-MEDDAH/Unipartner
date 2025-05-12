import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  currentLang: string = '';
  username: string = '';
  avatar: string = '';
  constructor(
    public userService: AuthService,
    private route: Router,
    private dataService: DataService,
    private zone: NgZone
    // public translate: TranslateService,
    // @Inject(DOCUMENT) private document: Document
  ) {
    if (this.userService.LoggedInUser() == true) {
      // this.username = this.userService.getUserName();
      // this.avatar = this.userService.getUserAvatar();
      console.log(this.avatar);
    }
    this.currentLang = localStorage.getItem('currentLang') || 'fr';
    // this.translate.use(this.currentLang);
  }
  ngOnInit(): void {
    this.getUserData();
  }
  email:any
  
  getUserData() {
    this.email = this.userService.getUserEmail();
    this.userService.getDataUser(this.email).subscribe({
      next: (value: any) => {
        console.log(value);
        const token = sessionStorage.getItem('token');
  
        // if (token && this.helper.isTokenExpired(token)) {
        //   sessionStorage.removeItem('token');
        //   sessionStorage.removeItem('userRole');
        // }
  
        this.zone.run(() => {
          this.username = value.name;
          this.avatar = value.photo;
          console.log(this.username);
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    this.route.navigate(['/login']);
  }
  
  changeCurrentLang(lang: string) {
    // let htmlTag = this.document.getElementsByTagName(
    //   'html'
    // )[0] as HTMLHtmlElement;
    // htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // this.translate.use(lang);
    // localStorage.setItem('currentLang', lang);
    // this.changeCssFile(lang);
  }
  changeCssFile(lang: string) {
    // let headTag = this.document.getElementsByTagName(
    //   'head'
    // )[0] as HTMLHeadElement;
    // let existingLink = this.document.getElementById(
    //   'langCss'
    // ) as HTMLLinkElement;
    // let bundleName = lang === 'ar' ? 'arabicStyle.css' : 'englishStyle.css';
    // if (existingLink) {
    //   existingLink.href = bundleName;
    // } else {
    //   let newLink = this.document.createElement('link');
    //   newLink.rel = 'stylesheet';
    //   newLink.type = 'text/css';
    //   newLink.id = 'langCss';
    //   newLink.href = bundleName;
    //   headTag.appendChild(newLink);
    // }
  }
}
