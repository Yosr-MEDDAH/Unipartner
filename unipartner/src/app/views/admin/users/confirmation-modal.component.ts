import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Confirmation</h5>
      <button type="button" class="close" (click)="activeModal.dismiss('cancel')" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('cancel')">No</button>
      <button type="button" class="btn btn-danger" (click)="activeModal.close('confirm')">Yes</button>
    </div>
  `,
})
export class ConfirmationModalComponent {
  @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) { }
}
