import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { BookingStatus } from 'src/app/enums/BookingStatus.enum';
import { PaymentTypes } from 'src/app/enums/payment-type.enum';
import { generateOrderId } from 'src/app/helpers/helpers';
import { CarWashBooking } from 'src/app/interfaces/models/carwash-booking.interface';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

  isEdit: boolean = false;
  carWashBooking!: CarWashBooking;
  servicePackages: ServicePackages[] = [];
  selectedPackage!: ServicePackages;
  selectPaymentType: string;
  columnNumber: number = 6;
  selectedStatus: string = ''
  bookingForm: FormGroup = this.fb.group({
    vehicle: ['', Validators.required],
    color: ['',Validators.required],
    numberPlate: ['', Validators.required]
  });
  bookingId: string;
  packageObservable: Subject<boolean> =new Subject();
  constructor(private dataAccessService: DataAccessService, private fb: FormBuilder,
    private toastrService: ToastrService, private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.packageObservable.subscribe((result) => {
      if (this.carWashBooking){
        this.selectedPackage = this.servicePackages.find((item) => item.service_id === this.carWashBooking.serviceId)
      }
    })
    this.activatedRoute.params.subscribe((param) =>{
      this.isEdit = param.bookingId !== undefined && param.bookingId;
      this.bookingId = param.bookingId;
      
      if(this.isEdit){
        this.getBooking()
        this.columnNumber = 4;
      }
    })
    this.dataAccessService.getServicePackages().subscribe({
      next: (res: ServicePackages[]) => {
        this.servicePackages = res;
        console.log(this.servicePackages);
        this.packageObservable.next(true)
      },
      error: (err: any) =>{
        console.error(err);
      } 
    })
  }

  getStatusIcon(status: string) {
    if(status === BookingStatus.IN_QUEUE){
      return 'bg-yellow'
    }  else if (status === BookingStatus.WASHING){
      return 'bg-orange'
    } else if (status === BookingStatus.FINISHING){
      return 'bg-primary'
    } else if (status === BookingStatus.READY){
      return 'bg-success'
    }  

    return 'bg-danger'

  }

  getStatus (): string[]{
    return Object.values(BookingStatus).map((status) => {
      return status
    })  
  }

  getBooking() {
    this.dataAccessService.getBookingByBookingId(this.bookingId).subscribe({
      next: (res: CarWashBooking) => {
        this.carWashBooking = res; 
        this.selectedStatus = res.status.toString();
        this.bookingForm = this.fb.group({
          vehicle: [this.carWashBooking.vehicle, Validators.required],
          color: [this.carWashBooking.color,Validators.required],
          numberPlate: [this.carWashBooking.numberPlate, Validators.required]
        });
        this.selectPaymentType = this.carWashBooking.paymentMethod.toString();
        this.packageObservable.next(true)

      },
      error: (error: any) =>{
        this.toastrService.error(error.error.mesage)
      }
    })
  }

  handleUpdate(){
    this.carWashBooking = Object.assign({
      carId: this.carWashBooking.carId,
      packageName: this.selectedPackage.name,
      packageItems: this.selectedPackage.items,
      orderId: this.carWashBooking.orderId,
      vehicle: '',
      color: '',
      status: this.selectedStatus,
      timeSlot: new Date().toTimeString(),
      price: parseInt(this.selectedPackage.price) ?? 0,
      paymentMethod: PaymentTypes[this.selectPaymentType],
      date: new Date().toDateString(),
      serviceId: this.selectedPackage.service_id,
      userId: this.carWashBooking.userId,
      numberPlate: '',
      isAdminBooking: true
    }, this.bookingForm.value);
    this.carWashBooking.bookingId = this.bookingId;
    this.dataAccessService.updateBooking(this.carWashBooking).subscribe({
      next: () => {
        this.toastrService.success("Successfully updates your booking data");
        this.ngOnInit();
      },
      error: (err: any) =>{
        this.toastrService.error("Something when wrong when trying to update")
      } 
    });
  }

  selectPaymentMethod() {
    
  }

  handleChange(index: number){
    this.selectedPackage = this.servicePackages[index];
  }
  
  handleCreate(){
    this.carWashBooking = Object.assign({
      carId: "Unknown",
      packageName: this.selectedPackage.name,
      packageItems: this.selectedPackage.items,
      orderId: generateOrderId(),
      vehicle: '',
      color: '',
      status: BookingStatus.IN_QUEUE,
      timeSlot: new Date().toTimeString(),
      price: parseInt(this.selectedPackage.price) ?? 0,
      paymentMethod: PaymentTypes[this.selectPaymentType],
      date: new Date().toDateString(),
      serviceId: this.selectedPackage.service_id,
      userId: 'Unkown',
      numberPlate: '',
      isAdminBooking: true
    }, this.bookingForm.value);


    this.dataAccessService.bookCarwash(this.carWashBooking).subscribe({
      next: () => {
        this.toastrService.success('Successfully booked a car wash');
        this.router.navigateByUrl('bookings')
      },
      error:  (err: any) =>{
        this.toastrService.error('Something went wrong when trying to book a wash')
      }
    })
  }

  getPaymentMethods() {
    return Object.values(PaymentTypes).map((item) => item).filter((payment) => payment !== PaymentTypes.CARD);
  }

}
