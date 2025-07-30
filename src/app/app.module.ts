import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ServicePackagesComponent } from './pages/service-packages/service-packages.component';

import { BookingsComponent } from './pages/bookings/bookings.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AppCheckModule} from '@angular/fire/app-check';
// import {} from '@angular/fire/compat/ap'

import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BranchesComponent } from './pages/branches/branches.component';
import { BranchAddDeleteComponent } from './pages/branch-add-delete/branch-add-delete.component';
import { SubscriptionService } from './services/subscription.service';
import { AuthService } from './services/auth.service';
import { PaymentStatusComponent } from './pages/payment-status/payment-status.component';
import { PaymentHistoryComponent } from './pages/payment-history/payment-history.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    
    NgbModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppCheckModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    BookingsComponent,
    PaymentStatusComponent,
    PaymentHistoryComponent,
    
  ],
  providers: [ToastrService, SubscriptionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
