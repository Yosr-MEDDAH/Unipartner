import { HttpErrorResponse } from '@angular/common/http';
import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  receivedUrl: any;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private toast:NgToastService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.receivedUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    console.log("===== url ==== " + this.receivedUrl)
    this.createForm();
    // ===================  Related to CSS ===============================
    this.renderer.setStyle(document.body, 'justify-content', 'center');
    this.renderer.setStyle(document.body, 'align-items', 'center');
    this.renderer.setStyle(document.body, 'min-height', '100vh');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    // ===================  Related to CSS ===============================
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
            Validators.minLength(8), // Minimum length of 8 characters
          ],
        ],
        
      },
      
    );
  }

  onSubmit() {
    // Handle form submission here
    console.log(this.signinForm.value);
    this.authService.login(this.signinForm.value).subscribe(
      {
        next:(data:any)=>{
          console.log(data)
          if(data.userRole==="ADMIN"){
            this.router.navigate(['/admin/login'])
          }else if(data.userRole==="ETUDIANT"){
            this.authService.saveTokenUser(data.jwt, data.userRole)
            this.toast.success({
              detail:'Connected..!',
              summary:'Login successfully..!',
              duration:3000
            })
            this.router.navigate(['/matching']);   
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
