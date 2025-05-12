import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Signal } from 'src/app/models/signal.model';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { JsonLoaderServiceService } from 'src/app/services/json-loader-service.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { NgToastService } from 'ng-angular-popup';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css'],
})
export class MatchingComponent implements OnInit {
  @ViewChild('exampleModal4') modal: ElementRef | undefined;
  matchingForm: FormGroup;
  selectedType: string = '';
  typeSignal = [
    { name: 'Fake account', selected: false },
    { name: 'Pretending to be someone', selected: false },
    { name: 'Fake name', selected: false },
    { name: 'Harassment', selected: false },
    { name: 'Bullying', selected: false },
    { name: 'Privacy Violation', selected: false },
    { name: 'False Information', selected: false },
    { name: 'Account Compromise', selected: false },
    { name: 'Violent or Threatening Behavior', selected: false },
  ];
  reports: Signal[] = [];
  interests!: any[];
  skills!: any[];
  matches: any;
  users: User[] = [];
  startX: number = 0;
  endX: number = 0;
  currentIndex: number | null = null;
  screenWidth: number = 500; // Set your screen width
  removalThreshold: number = 0.3; // Adjust as needed, represents the percentage of screen width for removal
  removedUsers: Set<number> = new Set<number>();
  loading: boolean = false;
  constructor(
    private service: DataService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr:NgToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.matchingForm = this.fb.group({
      typeSignal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'overflow-x', 'hidden');

    this.getRecommendedUsers();
  }

  getRecommendedUsers() {
    this.loading = false;
    this.service.getRecommendedUsers().subscribe({
      next: async (data: any) => {
        this.users = await data;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.cdr.detectChanges();
      },
    });
  }

  user: any;
  getUserData(email: any) {
    this.authService.getDataUser(email).subscribe({
      next: (data: any) => {
        console.log(data);
        this.user = data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // async keepUser(id: any, email: any) {
  //   console.log(email);
  //   try {
  //     const likeUserData = await this.service.likeUser(id).toPromise();

  //     console.log(likeUserData);

  //     const userToKeep = this.users.find((user: User) => user.id === id);
  //     this.users = this.users.filter((user: User) => user.id !== id);

  //     if (userToKeep !== undefined) this.users.push(userToKeep);

  //     const matchesData = await this.service.getMatches().toPromise();
  //     this.matches = matchesData;

  //     if (this.matches.length > 0) {
  //       for (let index = 0; index < this.matches.length; index++) {
  //         const emailUser1 = this.matches[index].user1.email;
  //         const emailUser2 = this.matches[index].user2.email;

  //         if (emailUser1 === this.authService.getUserEmail()) {
  //           await this.authService.getDataUser(email).toPromise().then((data: any) => {
  //             this.user = data;
  //             if (this.user.email === emailUser2) {
  //               console.log("It's a match");
  //             }
  //           }).catch((err: any) => {
  //             console.log(err);
  //           });
  //         }
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  async keepUser(id: any, email: any) {
    console.log(email);
    try {
      const likeUserData = await this.service.likeUser(id).toPromise();

      console.log(likeUserData);

      const userToKeep = this.users.find((user: User) => user.id === id);
      this.users = this.users.filter((user: User) => user.id !== id);

      if (userToKeep !== undefined) this.users.push(userToKeep);

      const matchesData = await this.service.getMatches().toPromise();
      this.matches = matchesData;

      if (this.matches.length > 0) {
        for (let index = 0; index < this.matches.length; index++) {
          const emailUser1 = this.matches[index].user1.email;
          const emailUser2 = this.matches[index].user2.email;

          if (emailUser1 === this.authService.getUserEmail()) {
            await this.authService
              .getDataUser(email)
              .toPromise()
              .then((data: any) => {
                this.user = data;
                if (this.user.email === emailUser2) {
                  let chaine=`It's a match with ${this.user.name} ${this.user.lastname}!`;
                  Swal.fire({
                    title: chaine,
                    icon: 'success',
                  });
                }
              })
              .catch((err: any) => {
                console.log(err);
              });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  getAllMatches() {
    this.service.getMatches().subscribe({
      next: async (data: any) => {
        this.matches = await data;
        console.log(this.matches);
        console.log(this.matches[0].user1.email);
        console.log(this.matches.length);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  removeUser(id: any) {
    // Remove the user from the list
    this.users = this.users.filter((user: User) => user.id !== id);
  }
  chooseSignalType(item: any) {
    this.selectedType = item.name;
    this.matchingForm.get('typeSignal')?.setValue(this.selectedType);
    this.typeSignal.forEach((signal) => {
      signal.selected = signal.name === this.selectedType;
    });
  }
  id: any;
  reportUser(id: any) {
    this.id = id;
  }

  submitReport() {
    this.authService.getDataUser(this.authService.getUserEmail()).subscribe({
      next: (data: any) => {
        if (this.matchingForm.valid) {
          const selectedType = this.matchingForm.get('typeSignal')?.value;
          let report = {
            typeSignal: this.matchingForm.get('typeSignal')?.value,
            reportedAt: new Date(),
            reportedBy: data
          };
          console.log(this.id);
          console.log(report);
          this.service.addSignal(report, this.id).subscribe({
            next: (data: any) => {
              console.log('Report submitted successfully:', data);
              this.toastr.success({ detail:'Success..!',
              summary:'Report submitted successfully..!',
              duration:3000});
              
            },
            error: (err: HttpErrorResponse) => {
              console.log('Error submitting report:', err);
              this.toastr.error({ detail:'Error..!',
              summary:'Error submitting report..!',
              duration:3000});
              // Handle error actions here
            },
          });
        }
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });

   
  }

}
