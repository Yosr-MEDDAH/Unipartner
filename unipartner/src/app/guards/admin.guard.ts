import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(
    private authService: AdminService,
    private router: Router,
    private toast : NgToastService
    ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      console.log("hello from guard ======================");
      const loggedIn = this.authService.loggedIn();
      console.log(loggedIn)
      if (loggedIn) {
        const isAdmin = sessionStorage.getItem('userRole');
        console.log(isAdmin)
        if (isAdmin === 'ADMIN') {
          resolve(true);
        } else {
          this.toast.error({
            detail:'Oops..!',
            summary:"You are not an admin!",
            duration:7000
          })          
          this.router.navigate(['/login']);
          resolve(false);
        }
      } else {
        this.router.navigate(['/admin/login'], {
          queryParams: { returnUrl: state.url },
        });
        sessionStorage.removeItem('token');
        resolve(false);
      }
    });
  }
}
