import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { Endpoints } from 'src/app/endpoints/Endpoints';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';
import { GenericHttpService } from 'src/app/services/generic-http.service';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.scss']
})
export class ServicePackagesComponent implements OnInit {

  servicePackages: ServicePackages[] = [];
  constructor(private genericHttpService: GenericHttpService, private router: Router,
    private modalService: NgbModal, private dataAccessService: DataAccessService, 
    private toasterService: ToastrService, private authService: AuthService
  ) { }

  ngOnInit(): void {
    const businessId = this.authService.getUserFromLocalStorage().data.businessId;
    this.dataAccessService.getServicePackagesByBusinessId(businessId).subscribe({
      next: (res: ServicePackages[]) => {
        this.servicePackages = res;
        
      },
      error: (err: any) =>{
        console.error(err);
      } 
    })
  }

  handleEdit(service_id: string ){
    this.router.navigateByUrl(`service-package/edit/${service_id}`);
  }

  handleDelete(service_id: string) {
    const modalRef = this.modalService.open(DeleteModalComponent, {
      windowClass: 'delete-modal',
      size: 'lg',
      backdrop: 'static',
      backdropClass: 'delete-modal-backdrop',
      centered: true
    });
    modalRef.dismissed.subscribe((result) => {

      if(result === 'confirm') {
        this.dataAccessService.deleteServicePackage(service_id).subscribe({
          next: () => {
            this.toasterService.success('Successfully deactivated this package');
            this.ngOnInit();
          },
          error: () =>{
            this.toasterService.success('Something went wrong when trying to deactivate this package');
          }
        }) 
      }
    })
   

  }


  handleCreatePackage() {
    this.router.navigateByUrl('service-package/create');
  }

}
