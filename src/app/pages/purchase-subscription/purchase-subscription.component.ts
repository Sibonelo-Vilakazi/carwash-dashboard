import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/components/modals/confirmation-modal/confirmation-modal.component';
import { InitializeSubscriptionData } from 'src/app/interfaces/models/initialize-subscription-data.interface';
import { SubscriptionData } from 'src/app/interfaces/models/subscription-data.interface';
import { ConfirmationModal } from 'src/app/interfaces/ui-config/confirmation-modal.interface';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-purchase-subscription',
  templateUrl: './purchase-subscription.component.html',
  styleUrls: ['./purchase-subscription.component.scss']
})
export class PurchaseSubscriptionComponent implements OnInit {
  subscriptionData: SubscriptionData[] = []; 
  isLoadingPayment: boolean = false;
  constructor(private subscriptionService: SubscriptionService, private toaster: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.subscriptionData = [];
    this.subscriptionService.getSubscriptions().subscribe({
      next: (res: SubscriptionData[]) =>{
   
        this.subscriptionData = res;
      },
      error: (err: any) => {
        console.error(err);
        this.subscriptionData = [];
      }
    })
  }

  handleSubscription($event: InitializeSubscriptionData){
    this.isLoadingPayment = true; 
    $event.isUpgrade = false;
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      windowClass: 'confirmation-modal',
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'confirmation-modal-backdrop',
      centered: true
    });
    modalRef.componentInstance.config = {
      title: 'Subscription Payment',
     bodyText: "Are you sure you want to purchase this subcription"
    } as ConfirmationModal;
    
    modalRef.dismissed.subscribe((result) => {

      if(result === 'confirm') {
        this.initilaizePayment($event);
       
      }
    })
    
  }


  initilaizePayment($event: InitializeSubscriptionData) {
    this.subscriptionService.initiateSubscription($event).subscribe({
      next: (res) => {
        window.open((res as any).completeUrl);
        this.isLoadingPayment = false
      },
      error: (error: any) => {
        this.isLoadingPayment = false;
        console.error(error.error);
        this.toaster.error(error.error);
      }
    })
  }

}
