import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { convertTimestampTodate, stripTime } from 'src/app/helpers/helpers';
import { InitializeSubscriptionData } from 'src/app/interfaces/models/initialize-subscription-data.interface';
import { SubscriptionData } from 'src/app/interfaces/models/subscription-data.interface';
import { SubscriptionStatusResponseData } from 'src/app/interfaces/models/subscription-status-response.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscription-pack-card',
  templateUrl: './subscription-pack-card.component.html',
  styleUrls: ['./subscription-pack-card.component.scss']
})
export class SubscriptionPackCardComponent implements OnInit {

  @Input() data!: SubscriptionData;
  businessId: string = '';
  @Output() selectSub: EventEmitter<InitializeSubscriptionData> = new EventEmitter(); 
  currentSubscription!: SubscriptionStatusResponseData;
  constructor(private authService: AuthService, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.businessId = this.authService.getUserFromLocalStorage().data.businessId;
    this.currentSubscription = this.subscriptionService.getSubscriptionSession() ?? null;
    console.log(this.currentSubscription)

  }

  handleMakePurchase(){
    const subData: InitializeSubscriptionData = {
      businessId: this.businessId,
      subscriptionId: this.data.id,
      isUpgrade: false
    }

    if(this.currentSubscription &&this.currentSubscription.subscriptionId !== this.data.id &&
      this.currentSubscription.totalPrice < this.data.price){
      subData.isUpgrade = true;
    }

    this.selectSub.emit(subData);
  }

  isPaymentValid (){
    return stripTime(convertTimestampTodate(this.currentSubscription.endDate)) <= stripTime(new Date());
  }

}
