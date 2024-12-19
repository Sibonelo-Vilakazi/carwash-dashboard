import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Endpoints } from '../endpoints/Endpoints';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  genericService =  inject(GenericHttpService)
  constructor(private httpClient: HttpClient ) { }

  getServicePackageById(service_id: string) { 
    return this.httpClient.get<ServicePackages>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGES_BY_ID(service_id))); 
  }
}
