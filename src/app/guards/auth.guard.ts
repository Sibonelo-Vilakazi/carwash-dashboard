import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AdminUser } from '../interfaces/models/admin-user.interface';
import { UserRoles } from '../enums/UserRoles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {}
  toaserService: ToastrService = inject(ToastrService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.$currentUser.pipe(
      switchMap(user => {
        if (user) {
         
          return from(user.getIdTokenResult()).pipe(
            map(tokenResult => {
              const claims = tokenResult.claims;
              if (
                !claims ||
                (claims.role !== UserRoles.ADMIN &&
                  claims.role !== UserRoles.SUPER_ADMIN)
              ) {
                this.authService.loggingOut();
                this.toaserService.error(
                  'Access denied: You are not authorized to view this page.',
                  'Authorization Error'
                );
                return this.router.createUrlTree(['/login']);
              }
              return true;
            }),
            catchError(error => {
              console.error('Error fetching token:', error);
              this.authService.loggingOut();
              this.toaserService.error('Authentication error occurred.', 'Error');
              return of(this.router.createUrlTree(['/login']));
            })
          );
        } else {
          this.authService.loggingOut();
          this.toaserService.error('Authentication error occurred.', 'Error');
          return of(false);
        }
      })
    );
  }
  
  
}
