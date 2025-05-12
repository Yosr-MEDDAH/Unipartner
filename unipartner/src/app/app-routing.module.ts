import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { HomeModule } from './views/home/home.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NoGuardUserGuard } from './guards/no-guard-user.guard';
import { UserGuard } from './guards/user.guard';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AuthAdminLayoutComponent } from './layouts/auth-admin-layout/auth-admin-layout.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'plus',
        loadChildren: () =>
          import('./views/plus/plus.module').then((m) => m.PlusModule),
      },
      {
        path: 'matching',
        loadChildren: () =>
          import('./views/matching/matching.module').then(
            (m) => m.MatchingModule
          ),
          canActivateChild:[UserGuard]
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./views/chat/chat.module').then(
            (m) => m.ChatModule
          ),
          canActivateChild:[UserGuard]
      },
      {
        path: 'myProfile',
        loadChildren: () =>
          import('./views/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
          canActivateChild:[UserGuard]
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/login/login.module').then((m) => m.LoginModule),
          canActivateChild:[NoGuardUserGuard]
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./views/register/register.module').then(
            (m) => m.RegisterModule
          ),
          canActivateChild:[NoGuardUserGuard]
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./views/contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'team',
        loadChildren: () =>
          import('./views/team/team.module').then((m) => m.TeamModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
   canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
    ],
  },
  {
    path:'admin/login',
    component: AuthAdminLayoutComponent,
    
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
