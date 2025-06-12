import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPackCardComponent } from './subscription-pack-card/subscription-pack-card.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SubscriptionPackCardComponent,
    ConfirmationModalComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SubscriptionPackCardComponent
  ]
})
export class ComponentsModule { }
