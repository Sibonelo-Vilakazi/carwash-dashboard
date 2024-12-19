import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoints } from 'src/app/endpoints/Endpoints';
import { GenericHttpService } from 'src/app/services/generic-http.service';

@Component({
  selector: 'app-service-packages',
  templateUrl: './service-packages.component.html',
  styleUrls: ['./service-packages.component.scss']
})
export class ServicePackagesComponent implements OnInit {

  servicePackages: ServicePackages[] = [];
  constructor(private genericHttpService: GenericHttpService, private router: Router) { }

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
    console.log('service_id: ', service_id)
    this.router.navigateByUrl(`service-package/${service_id}`);
  }

  handleDelet(service_id: string) {

  }

}
