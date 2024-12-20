import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  ngOnInit(): void {
    
  }

  open() {
   
  }

  closeModal() {
    this.modal.dismissAll('closed');
  }

}
