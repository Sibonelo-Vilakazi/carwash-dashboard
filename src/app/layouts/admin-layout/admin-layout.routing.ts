import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ServicePackagesComponent } from 'src/app/pages/service-packages/service-packages.component';
import { PackageDetailComponent } from 'src/app/pages/package-detail/package-detail.component';
import { BookingsComponent } from 'src/app/pages/bookings/bookings.component';
import { BookingDetailComponent } from 'src/app/pages/booking-detail/booking-detail.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { BranchesComponent } from 'src/app/pages/branches/branches.component';
import { BranchAddDeleteComponent } from 'src/app/pages/branch-add-delete/branch-add-delete.component';
import { SubscriptionGuard } from 'src/app/guards/subscription.guard';
import { PurchaseSubscriptionComponent } from 'src/app/pages/purchase-subscription/purchase-subscription.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'service-packages',     component: ServicePackagesComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'service-package/edit/:service_id',     component: PackageDetailComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'service-package/create',     component: PackageDetailComponent,canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'bookings',     component: BookingsComponent, canActivate: [AuthGuard, SubscriptionGuard]},
    { path: 'booking/edit/:bookingId',     component: BookingDetailComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'booking/create',     component: BookingDetailComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'branch/create',     component: BranchAddDeleteComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'branch/edit/:branchId',     component: BranchAddDeleteComponent, canActivate: [AuthGuard, SubscriptionGuard] },
    { path: 'cars',     component: NavbarComponent},
    { path: 'branches', component: BranchesComponent, canActivate: [AuthGuard, SubscriptionGuard]},
    { path: 'branch/edit/:branchId', component: BranchAddDeleteComponent, canActivate: [AuthGuard, SubscriptionGuard]},
    { path: 'purchase-subscription', component: PurchaseSubscriptionComponent, canActivate: [AuthGuard, SubscriptionGuard]}
    

];
