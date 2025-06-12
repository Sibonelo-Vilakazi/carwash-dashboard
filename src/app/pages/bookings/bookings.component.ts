import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/components/modals/confirmation-modal/confirmation-modal.component';
import { BookingStatus } from 'src/app/enums/BookingStatus.enum';
import { convertTimestampTodate, stripTime } from 'src/app/helpers/helpers';
import { CarWashBooking } from 'src/app/interfaces/models/carwash-booking.interface';
import { ProgressStats } from 'src/app/interfaces/models/progress-stats.interface';
import { SubscriptionStatusResponse } from 'src/app/interfaces/models/subscription-status-response.interface';
import { ConfirmationModal } from 'src/app/interfaces/ui-config/confirmation-modal.interface';
import { ProgressStatsCardConfig } from 'src/app/interfaces/ui-config/progress-stats-card-config.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataAccessService } from 'src/app/services/data-access.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: CarWashBooking[] = [];
  businessId: string = '';
  progressStats!: ProgressStats;
  progressStatusCardConfig: ProgressStatsCardConfig[] = [];
  constructor(private dataAccessService: DataAccessService, private router: Router,
    private toastrService: ToastrService, private authService: AuthService, private subscriptionService: SubscriptionService,
    private modalService: NgbModal
  ) { }



  ngOnInit(): void {
    this.businessId = this.authService.getUserFromLocalStorage().data.businessId;
    const year = new Date().getFullYear();
    this.dataAccessService.getProgressStatsCountBusinessId(this.businessId, year).subscribe({
      next: (res: ProgressStats) =>{
        this.progressStats = res;
        this.progressStatusCardConfig = []
        Object.keys(this.progressStats).map((item) => {
          let icon = "";
          switch (item ) {
            case BookingStatus.IN_QUEUE:
              icon = 'fas fa-hourglass-half';
              break;
            case BookingStatus.WASHING:
              icon = 'fas fa-solid fa-water';
              break;
            case BookingStatus.FINISHING:
              icon = 'fas fa-flag-checkered';
              break;
            default:
              icon = 'fas fa-thumbs-up';
              break;
          }
          this.progressStatusCardConfig.push({
            name: item,
            stats: this.progressStats[item],
            icon: icon,
            color: this.getStatusIcon(item)
          })
        });

        
      },
      error: (error: any) => {
        console.error(error);
      }
    })
    this.dataAccessService.getAllBookingsByBusinessId(this.businessId).subscribe({
      next: (res: CarWashBooking[]) =>{
        this.bookings = res;
      },
      error: (error: any) => {
        console.error(error)
      }
    })
  }


  handleDelete(bookingId: string) {

  } 

  handleCreateBooking() {
    
    this.router.navigateByUrl('booking/create');
  }

  handleEdit(bookingId: string) {
    this.router.navigateByUrl(`booking/edit/${bookingId}`)
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

  

  handleChangeStatus(bookingId: string, status: string, index: number){
    const data = { bookingId, status};

    this.dataAccessService.updateBookingStatus(data).subscribe({
      next: (res: CarWashBooking) => {
          this.bookings[index] = res; 
          this.toastrService.success('Successfully updated the booking status')
      },
      error: (error: any) =>{
        this.toastrService.error('Something went wrong when trying to update the booking status');
      }
    })
  }

}
