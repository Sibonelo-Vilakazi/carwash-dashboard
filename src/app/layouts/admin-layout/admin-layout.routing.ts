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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'service-packages',     component: ServicePackagesComponent, canActivate: [AuthGuard] },
    { path: 'service-package/edit/:service_id',     component: PackageDetailComponent, canActivate: [AuthGuard] },
    { path: 'service-package/create',     component: PackageDetailComponent,canActivate: [AuthGuard] },
    { path: 'bookings',     component: BookingsComponent, canActivate: [AuthGuard]},
    { path: 'booking/edit/:bookingId',     component: BookingDetailComponent, canActivate: [AuthGuard] },
    { path: 'booking/create',     component: BookingDetailComponent, canActivate: [AuthGuard] },

];
