import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModal } from 'src/app/interfaces/ui-config/confirmation-modal.interface';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() config!: ConfirmationModal
  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    
  }

  open() {
   
  }

  handleConfirmation() {
    this.modal.dismissAll('confirm');
  }

  closeModal() {
    this.modal.dismissAll('closed');
  }

}
