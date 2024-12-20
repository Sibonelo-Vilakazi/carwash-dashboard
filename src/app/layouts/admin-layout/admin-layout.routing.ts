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

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'service-packages',     component: ServicePackagesComponent },
    { path: 'service-package/edit/:service_id',     component: PackageDetailComponent },
    { path: 'service-package/create',     component: PackageDetailComponent },
    { path: 'bookings',     component: BookingsComponent },
    { path: 'booking/edit/:bookingId',     component: BookingDetailComponent },
    { path: 'booking/create',     component: BookingDetailComponent },

];
