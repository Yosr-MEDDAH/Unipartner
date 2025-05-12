import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/models/user.model';
import { JsonLoaderServiceService } from 'src/app/services/json-loader-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  redFlags!:any[];
  interests!:any[];
  skills!:any[];
  userData: User = {
    id:'',
    email: '',
    pwd: '',
    name: '',
    lastname: '',
    photo: '',
    userRole: '',
    gender:'',
    skills: [],
    interests: [],
    redFlags: [],
  };




      signupForm!: FormGroup;
      passwordVisible: boolean = false;
      confirmPasswordVisible: boolean = false;
      currentStep: number = 1;
      constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private toast: NgToastService, 
        private jsonLoaderService:JsonLoaderServiceService
      ) {}
      ngOnInit() {
        this.jsonLoaderService.loadJsonData().subscribe(
          data=>{
            console.log(data)
            this.redFlags=data.redFlags;
            this.skills=data.skills;
            this.interests=data.interests;
          }
        )
        this.createForm();
        // ===================  Related to CSS ===============================
        this.renderer.setStyle(document.body, 'justify-content', 'center');
        this.renderer.setStyle(document.body, 'align-items', 'center');
        this.renderer.setStyle(document.body, 'min-height', '100vh');
        this.renderer.setStyle(document.body, 'overflow', 'hidden');
        // ===================  Related to CSS ===============================
      }
    
      createForm() {
        this.signupForm = this.fb.group(
          {
            name: [
              '',
              [
                Validators.required,
                Validators.minLength(3), // Minimum length of 3 characters
                Validators.pattern(/^[a-zA-Z0-9_ ]*$/), // Only allow alphanumeric characters and underscore
              ],
            ],
            lastname: [
              '',
              [
                Validators.required,
                Validators.minLength(3), // Minimum length of 3 characters
                Validators.pattern(/^[a-zA-Z0-9_ ]*$/), // Only allow alphanumeric characters and underscore
              ],
            ],
            email: [
              '',
              [
                Validators.required,
                Validators.email, // Angular's built-in email validator
                Validators.pattern(
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                ), // Custom email pattern
              ],
            ],
            pwd: [
              '',
              [
                Validators.required,
                Validators.minLength(8), // Minimum length of 8 characters
                this.passwordStrengthValidator, // Custom validator for password strength
              ],
            ],
            // confirmPassword: ['', Validators.required],
            photo: ['', [Validators.required]],
            // Step 2 (example)
          gender: ['', Validators.required],
          skills: this.fb.array([]),
          interests: this.fb.array([]),
          redFlags: this.fb.array([]),
          }
          // { validators: this.passwordMatchValidator }
        );
      }
      nextStep() {
        this.currentStep++;
        this.userData.email= this.signupForm.get('email')?.value;
        this.userData.name= this.signupForm.get('name')?.value;
        this.userData.lastname= this.signupForm.get('lastname')?.value;
        this.userData.pwd= this.signupForm.get('pwd')?.value;
        this.userData.photo= this.signupForm.get('photo')?.value;
        console.log(this.userData);
      }
      prevStep() {
        this.currentStep--;
      }
      isNextStepEnabled(): boolean {
        // Check if the required fields are filled in
        const isStep1Valid = this.signupForm.get('name')?.valid &&
                             this.signupForm.get('lastname')?.valid &&
                             this.signupForm.get('email')?.valid &&
                             this.signupForm.get('pwd')?.valid &&
                             this.signupForm.get('photo')?.valid;
      return isStep1Valid!;                      
      }
      isConfirmButtonEnabled(): boolean {
        // Check if the user has selected a gender
        const isGenderSelected = this.userData.gender !== '';
      
        // Check if the user has selected at least one skill
        const isAtLeastOneSkillSelected = this.userData.skills.length > 0;
      
        // Return true if both conditions are met
        return isGenderSelected && isAtLeastOneSkillSelected;
      }
      onSubmit() {
        console.log(this.userData)
        this.authService.register(this.userData).subscribe({
          next: (data: any) => {
            this.toast.success({
              detail: 'Congratulations..!',
              summary: 'Your account created successfully',
              duration: 3000,
            });
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            let chaine: any;
            chaine = err.error;
            chaine = chaine.slice(0, 35) + '...';
            this.toast.error({
              detail: 'Try again..',
              summary: chaine,
              duration: 5000,
            });
          },
        });
      }
      // Function to add skills to the form array
      




      selectGender(gender: string) {
        this.userData.gender = gender;
      }
      toggleSkill(skill: string) {
        if (this.userData.skills.includes(skill)) {
          this.removeSkill(skill);
        } else {
          this.selectSkill(skill);
        }
      }
      private selectSkill(skill: string) {
        this.userData.skills.push(skill);
      }
    
      // Method to remove a skill
      private removeSkill(skill: string) {
        const index = this.userData.skills.indexOf(skill);
        if (index !== -1) {
          this.userData.skills.splice(index, 1);
        }
      }
// Method to toggle between adding and removing an interest based on its current state
toggleInterest(interest: string) {
  if (!this.userData.interests) {
    this.userData.interests = [];
  }

  if (this.userData.interests.includes(interest)) {
    this.removeInterest(interest);
  } else {
    this.selectInterest(interest);
  }
}

// Method to select an interest
private selectInterest(interest: string) {
  this.userData.interests!.push(interest);
}

// Method to remove an interest
private removeInterest(interest: string) {
  if (this.userData.interests) {
    const index = this.userData.interests.indexOf(interest);
    if (index !== -1) {
      this.userData.interests.splice(index, 1);
    }
  }
}

// Method to toggle between adding and removing a red flag based on its current state
toggleRedFlag(redFlag: string) {
  if (!this.userData.redFlags) {
    this.userData.redFlags = [];
  }

  if (this.userData.redFlags.includes(redFlag)) {
    this.removeRedFlag(redFlag);
  } else {
    this.selectRedFlag(redFlag);
  }
}

// Method to select a red flag
private selectRedFlag(redFlag: string) {
  this.userData.redFlags!.push(redFlag);
}

// Method to remove a red flag
private removeRedFlag(redFlag: string) {
  if (this.userData.redFlags) {
    const index = this.userData.redFlags.indexOf(redFlag);
    if (index !== -1) {
      this.userData.redFlags.splice(index, 1);
    }
  }
}










      getSkillsControls() {
        const skillsFormArray = this.signupForm.get('skills') as FormArray;
        return skillsFormArray ? skillsFormArray.controls : [];
      }
      getSkillControl(index: number) {
        const skillsFormArray = this.signupForm.get('skills') as FormArray;
        return skillsFormArray.at(index) as FormControl;
      }
      getInterestsControls() {
        const interestsFormArray = this.signupForm.get('interests') as FormArray;
        return interestsFormArray ? interestsFormArray.controls : [];
      }
      getInterestControl(index: number) {
        const interestsFormArray = this.signupForm.get('interests') as FormArray;
        return interestsFormArray.at(index) as FormControl;
      }
      
    
      // Function to toggle password visibility
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
      }
      // Function to toggle password visibility for "Confirm Password" field
      toggleConfirmPasswordVisibility() {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
      }
      passwordMatchValidator(
        control: AbstractControl
      ): { [key: string]: boolean } | null {
        const password = control.get('password')!.value;
        const confirmPassword = control.get('confirmPassword')!.value;
    
        return password === confirmPassword ? null : { passwordMismatch: true };
      }
    
      // Custom validator for password strength
      passwordStrengthValidator(
        control: AbstractControl
      ): { [key: string]: boolean } | null {
        const password: string = control.value;
        // You can add your own logic for password strength here
        const hasNumber = /[0-9]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
    
        const valid = hasNumber && hasUpper && hasLower;
    
        return valid ? null : { passwordStrength: true };
      }
      getUserNameControl() {
        return this.signupForm.get('username');
      }
    }
    