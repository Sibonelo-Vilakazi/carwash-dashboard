import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';
import { Endpoints } from 'src/app/endpoints/Endpoints';
import { GenericHttpService } from 'src/app/services/generic-http.service';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.scss']
})
export class ServicePackagesComponent implements OnInit {

  servicePackages: ServicePackages[] = [];
  constructor(private genericHttpService: GenericHttpService, private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.genericHttpService.httpGet(Endpoints.GET_SERVICE_PACKAGES).subscribe({
      next: (res: ServicePackages[]) => {
        this.servicePackages = res;
        console.log(this.servicePackages); 
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
    this.modalService.open(DeleteModalComponent, {
      windowClass: 'delete-modal',
      size: 'lg',
      backdrop: 'static',
      centered: true
    });

  }


  handleCreatePackage() {
    this.router.navigateByUrl('service-package/create');
  }

}
