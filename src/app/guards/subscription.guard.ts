import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionStatusResponse } from '../interfaces/models/subscription-status-response.interface';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionGuard implements CanActivate {
  constructor(private authService: AuthService, private subscriptionService :SubscriptionService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    const businessId = this.authService.getUserFromLocalStorage().data.businessId;

    this.subscriptionService.checkSubscriptionStatus(businessId).subscribe({
      next: (res: SubscriptionStatusResponse) =>{
        
        if(!res.data.isActive) {
          // redirect to make payment page
          console.log()
          this.router.navigateByUrl('purchase-subscription');
        }

      
      },
      error: (err) => {
        console.log(' data: ', err.error);
        this.router.navigateByUrl('purchase-subscription');
      } 
    });

    return true;
  }
  
}
