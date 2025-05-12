import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      const loggedIn = this.authService.LoggedInUser();
      if (loggedIn) {
        const userRole = sessionStorage.getItem('userRole');

        if (userRole === 'ETUDIANT') {
          resolve(true); 
        } else {
          this.router.navigate(['/admin/login']);
          resolve(false);
        }
      } else {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        sessionStorage.removeItem('token');
        resolve(false);
      }
    });
  }
}
