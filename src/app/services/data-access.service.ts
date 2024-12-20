import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Endpoints } from '../endpoints/Endpoints';
import { GenericHttpService } from './generic-http.service';
import { CarWashBooking } from '../interfaces/models/carwash-booking.interface';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  genericService =  inject(GenericHttpService)
  constructor(private httpClient: HttpClient ) { }

  getServicePackages() {
    return this.httpClient.get<ServicePackages[]>(this.genericService.builderUrl(Endpoints.GET_SERVICE_PACKAGES));
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
}
