import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { InitializeSubscriptionData } from 'src/app/interfaces/models/initialize-subscription-data.interface';
import { SubscriptionData } from 'src/app/interfaces/models/subscription-data.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-subscription-pack-card',
  templateUrl: './subscription-pack-card.component.html',
  styleUrls: ['./subscription-pack-card.component.scss']
})
export class SubscriptionPackCardComponent implements OnInit {

  @Input() data!: SubscriptionData;
  businessId: string = '';
  @Output() selectSub: EventEmitter<InitializeSubscriptionData> = new EventEmitter(); 
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.businessId = this.authService.getUserFromLocalStorage().data.businessId;

  }

  handleMakePurchase(){
    const subData: InitializeSubscriptionData = {
      businessId: this.businessId,
      subscriptionId: this.data.id
    }

    this.selectSub.emit(subData);
  }

}
