import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-auth-admin-layout',
  templateUrl: './auth-admin-layout.component.html',
  styleUrls: ['./auth-admin-layout.component.css']
})
export class AuthAdminLayoutComponent {
  signinForm!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  receivedUrl: any;
  constructor(
    private authService: AdminService,
    private router: Router,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    if(this.authService.loggedIn()===true){
      this.router.navigate(['/admin']) // u cannot visit login page when u are logged in
    }
  }

  ngOnInit(): void {
    this.receivedUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/admin/';
    console.log(this.receivedUrl)
    this.createForm();
  }
  createForm() {
    this.signinForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email, // Angular's built-in email validator
            Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/), // Custom email pattern
          ],
        ],
        pwd: [
          '',
          [
            Validators.required,
            Validators.minLength(8), 
          ],
        ],
        
      },
      
    );
  }
  onSubmit() {
    console.log(this.signinForm.value);
    this.authService.login(this.signinForm.value).subscribe(
      {
        next:(data:any)=>{
          console.log(data)
          if(data.userRole==="ETUDIANT"){
            this.router.navigate(['/login'])
          }else if(data.userRole==="ADMIN"){
            console.log(data.jwt)
            this.authService.saveTokenUser(data.jwt, data.userRole)
            this.toast.success({
              detail:'Connected..!',
              summary:'Hello Admin..!',
              duration:3000
            })
            this.router.navigate([this.receivedUrl]);   
          }       
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          let chaine=err.error;
        chaine=chaine.slice(0,35)
        this.toast.error({
          detail:'Try again..!',
          summary:chaine,
          duration:7000
        })
        }
      }
    )
  
  }
  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
