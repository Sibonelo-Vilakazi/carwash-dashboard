import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  isSuccessfullPayment: boolean = false;
  paymentHeading: string = '';
  paymentDescription: string; 
  constructor() { }

  ngOnInit(): void {

    if(this.isSuccessfullPayment){
      this.paymentDescription = 'Thank you for your payment. We will be in contact with you shortly'
      this.paymentHeading = 'Your payment was successful'; 
    } else {
      this.paymentDescription = `It looks like something went wrong and your payment didn’t go through.
      Don’t worry — no funds were taken. Please try again or contact support for help`
      this.paymentHeading = 'Your payment was failed';
    }
  }

}
