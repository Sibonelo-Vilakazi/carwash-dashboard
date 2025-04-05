import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Endpoints } from '../endpoints/Endpoints';
import { GenericHttpService } from './generic-http.service';
import { CarWashBooking } from '../interfaces/models/carwash-booking.interface';
import { ProgressStats } from '../interfaces/models/progress-stats.interface';
import { AdminUser } from '../interfaces/models/admin-user.interface';
import { YearlyRevenueData } from '../interfaces/models/yearly-revenue.interface';
import { ServicePackageRevenueData } from '../interfaces/models/service-package-revenue-data.interface';
import { CreateBranch } from '../interfaces/models/create-branch.interface';
import { BusinessDto } from '../interfaces/models/Business';
import { Branch } from '../interfaces/models/Branch';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  genericService =  inject(GenericHttpService)
  constructor(private httpClient: HttpClient ) { }

  getServicePackages() {
    return this.httpClient.get<ServicePackages[]>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGES));
  }

  getServicePackagesByBusinessId (businessId: string) {
    return this.httpClient.get<ServicePackages[]>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGES_BY_BUSINESS_ID(businessId)));
  }

  getServicePackageById(service_id: string) { 
    return this.httpClient.get<ServicePackages>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGES_BY_ID(service_id))); 
  }

  getAllBookings() { 
    return this.httpClient.get<CarWashBooking[]>(this.genericService.builderUrl(Endpoints.GET_ALL_BOOKINGS)); 
  }

  getBookingByBookingId(bookingId: string) { 
    return this.httpClient.get<CarWashBooking>(this.genericService.builderUrl(Endpoints.GET_BOOKING_BY_ID(bookingId))); 
  }



  updateServicePackage ( data: ServicePackages ){
    return this.httpClient.put<ServicePackages>(this.genericService.builderUrl(Endpoints.UPDATE_SERVICE_PACKAGES), data); 
  } 

  createServicePackage (data: ServicePackages ){
    return this.httpClient.post<ServicePackages>(this.genericService.builderUrl(Endpoints.CREATE_SERVICE_PACKAGES), data); 
  } 


  deleteServicePackage (service_id: string) {
    return this.httpClient.delete<ServicePackages>(this.genericService.builderUrl(Endpoints.Deactivate_SERVICE_PACKAGES(service_id)))
  } 


  updateBookingStatus(data: {bookingId: string, status: string}) {
    return this.httpClient.put<CarWashBooking>(this.genericService.builderUrl(Endpoints.UPDATE_BOOKING_STATUS), data)
  } 

  updateBooking(data: CarWashBooking) {
    return this.httpClient.put<CarWashBooking>(this.genericService.builderUrl(Endpoints.UPDATE_BOOKING), data)
  } 

  bookCarwash(data: CarWashBooking) {
    return this.httpClient.post<CarWashBooking>(this.genericService.builderUrl(Endpoints.Booking_CAR_WASH), data)
  }

  getProgressStatsCount(){
    return this.httpClient.get<ProgressStats>(this.genericService.builderUrl(Endpoints.GET_PROGRES_STATS_Count));
  }

  getYearlyRevenue(){
    return this.httpClient.get<YearlyRevenueData>(this.genericService.builderUrl(Endpoints.GET_YEARLY_REVENUE));
  }

  getUser(userId: string) {
    return this.httpClient.get<AdminUser>(this.genericService.builderUrl(Endpoints.GET_USER_BY_ID(userId)));
  }

  getServicePackageRevenue(){
    return this.httpClient.get<ServicePackageRevenueData>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGE_REVENUE));
  }

  createBranches(data: CreateBranch){
    return this.httpClient.post(this.genericService.builderUrl(Endpoints.CREATE_BRANCH), data);
  }

  getBranches(){
    return this.httpClient.get<CreateBranch[]>(this.genericService.builderUrl(Endpoints.GET_BRANCHES));
  }

  getBranchesByBusinessId(businessId: string){
    return this.httpClient.get<CreateBranch[]>(this.genericService.builderUrl(Endpoints.GET_BRANCHES_BY_BUESINESS_ID(businessId)));
  }

  getBranchById(branchId: string){
    return this.httpClient.get<Branch[]>(this.genericService.builderUrl(Endpoints.GET_BRANCHES_BY_ID(branchId)));
  }

  createBusinessProfile (data: BusinessDto) {
    return this.httpClient.post(this.genericService.builderUrl(Endpoints.CREATE_BUSINESS_INFORMATION), data);
  }

  getBusinessById(businessId: string) {
    return this.httpClient.get<BusinessDto>(this.genericService.builderUrl(Endpoints.GET_BUSINESS_INFORMATION(businessId)));
  }
  
  
}
