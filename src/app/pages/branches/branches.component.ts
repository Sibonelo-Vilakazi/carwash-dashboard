import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/components/modals/confirmation-modal/confirmation-modal.component';
import { CreateBranch } from 'src/app/interfaces/models/create-branch.interface';
import { SubscriptionStatusResponse } from 'src/app/interfaces/models/subscription-status-response.interface';
import { ConfirmationModal } from 'src/app/interfaces/ui-config/confirmation-modal.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  progressStats = true;
  branches: CreateBranch[] = [];
  businessId: string = '';

  constructor(private router: Router, private dataAccessService: DataAccessService, 
    private toastrService: ToastrService, private authService: AuthService,
    private subscriptionService: SubscriptionService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.businessId = this.authService.getUserFromLocalStorage().data.businessId;
    this.getBranches(this.businessId);
  } 

  getBranches(businessId: string) {
    this.dataAccessService.getBranchesByBusinessId(businessId).subscribe({
      next: (res: CreateBranch[]) => {
        this.branches = res;
      },
      error: (err) => {
        this.toastrService.error('Something went wrong while retreiving record');
      }
    })
  }

  checkSubscriptionStatus() {
    console.log(this.businessId)
    this.subscriptionService.checkSubscriptionStatus(this.businessId).subscribe({
      next: (res: SubscriptionStatusResponse) =>{


          if (res.data.includedBranches < (this.branches.length + 1)) {
           
            const modalRef = this.modalService.open(ConfirmationModalComponent, {
              windowClass: 'confirmation-modal',
              size: 'lg',
              backdrop: 'static',
              backdropClass: 'confirmation-modal-backdrop',
              centered: true
            });
            modalRef.componentInstance.config = {
              title: 'Add Branch Error',
            bodyText: "You need to upgrade your subscription to add another branch. Do you agree to do so?"
            } as ConfirmationModal;

            modalRef.dismissed.subscribe((result) => {
           
              if(result === 'confirm') {
                
               
              }
            })
          } else {
            this.router.navigateByUrl('branch/create');
          }
        
        
      },
      error: (err) => {
        console.log('eerr: ', err)
        // this.router.navigateByUrl('purchase-subscription');
      } 
    });
  }

  handleAddBranch() {
    // Open a modal/form to add a new branch
    this.checkSubscriptionStatus();
    
  }
  
  handleEditBranch(branchId: number) {
    // Edit logic

    this.router.navigateByUrl(`branch/edit/${branchId}`);

  }
  
  handleDeleteBranch(branchId: number) {
    // Delete logic
  }

}
