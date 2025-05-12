import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { NgToastService } from 'ng-angular-popup';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './confirmation-modal.component'; 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  // reports = {
  //   typeSignal: '',
  //   reportedAt: '',
  //   reportedByName:''
  // };
  reports:any
  reportsLength=0;
  searchKey: any;
  public loading: boolean = false;
  public connection: boolean = false;
  users: User[] = [];
  constructor(
    private service: DataService,
    private toast: NgToastService,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    // this.renderer.setStyle(document.body, 'overflow-x', 'hidden');

    this.getAllUsers();
    // document.body.style.padding = '0';
    // document.body.style.margin = '0';
    // document.body.style.boxSizing = 'border-box';
  }
  getAllUsers() {
    this.loading = true;
    this.service.getAllUsers().subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = data;
        this.connection = true;
        setTimeout(() => {
          console.log('loading -_-');
          this.loading = false;
        }, 1000);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  UserReports(id: any) {
    this.service.getSignalsByUserId(id).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data) {
          this.reports=data
          this.reportsLength=this.reports.length;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        // Handle the error, display a message, or log it as needed
      },
    });
  }

  
  deleteReport(id: any) {
    // Set the modal content if needed
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Do you really want to delete this report ?';

    // Set up event listeners
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          // User clicked 'Yes', handle delete
          this.confirmDeleteReport(id);
        } else {
          // User clicked 'No' or closed the modal
          this.cancelDelete();
        }
      },
      (reason) => {
        // Modal dismissed
        this.cancelDelete();
      }
    );
  }
  confirmDeleteReport(id: any) {
    this.service.deleteSignal(id).subscribe({
      next:(data:any)=>{console.log(data); this.getAllUsers()},
      error:(err:HttpErrorResponse)=>{console.log(err);}
    })
  
      // Close the modal
      this.modalService.dismissAll();
    }
  deleteUser(id: any) {
    // Set the modal content if needed
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.message = 'Do you really want to delete this user?';

    // Set up event listeners
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          // User clicked 'Yes', handle delete
          this.confirmDeleteUser(id);
        } else {
          // User clicked 'No' or closed the modal
          this.cancelDelete();
        }
      },
      (reason) => {
        // Modal dismissed
        this.cancelDelete();
      }
    );
  }

  confirmDeleteUser(id: any) {
  this.service.deleteUser(id).subscribe({
    next:(data:any)=>{console.log(data); this.getAllUsers()},
    error:(err:HttpErrorResponse)=>{console.log(err);}
  })

    // Close the modal
    this.modalService.dismissAll();
  }

  cancelDelete() {
    // Handle cancel operation or just close the modal
    this.modalService.dismissAll();
  }

  search() {
    if (this.searchKey === '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter((res: { name: string }) => {
        return (
          res.name &&
          res.name
            .toLocaleLowerCase()
            .includes(this.searchKey.toLocaleLowerCase())
        );
      });
    }
  }

  key: string = '';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  hello() {
    console.log('hello');
    Swal.fire({
      title: 'Hello!',
      text: 'This is a simple SweetAlert',
      icon: 'success',
      confirmButtonText: 'Okay',
    });
  }
}
