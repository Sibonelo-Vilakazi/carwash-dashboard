import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { GenericHttpService } from './generic-http.service';
import { Endpoints } from '../endpoints/Endpoints';
import { InitializeSubscriptionData } from '../interfaces/models/initialize-subscription-data.interface';
import { SubscriptionStatusResponse, SubscriptionStatusResponseData } from '../interfaces/models/subscription-status-response.interface';
import { SubscriptionData } from '../interfaces/models/subscription-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  isActiveCache: boolean = false;
  SUBSCRIBPTION = 'subscription';

  constructor(private generic: GenericHttpService) { }

  checkSubscriptionStatus(businessId: string): Observable<SubscriptionStatusResponse> {
    return this.generic.httpGet(Endpoints.SUBSCRIPTION_STATUS(businessId))
      .pipe(
        map(response => {
          //this.isActiveCache = response.isActive;
          return response;
        })
      );
  }


  initiateSubscription (data: InitializeSubscriptionData) { 
    return this.generic.httpPost(Endpoints.SUBSCRIPTION_INITIALIZATION, data);
  }

  getSubscriptions (): Observable<SubscriptionData[]> { 
    return this.generic.httpGet(Endpoints.GET_SUBSCRIPTIONS);
  }

  setSubscriptionSession(data: SubscriptionStatusResponseData) {
    sessionStorage.setItem(this.SUBSCRIBPTION, JSON.stringify(data));
  }

  getSubscriptionSession(): SubscriptionStatusResponseData {
    return JSON.parse(sessionStorage.getItem(this.SUBSCRIBPTION)) as SubscriptionStatusResponseData
  }
}
