import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingStatus } from 'src/app/enums/BookingStatus.enum';
import { CarWashBooking } from 'src/app/interfaces/models/carwash-booking.interface';
import { ProgressStats } from 'src/app/interfaces/models/progress-stats.interface';
import { ProgressStatsCardConfig } from 'src/app/interfaces/ui-config/progress-stats-card-config.interface';
import { DataAccessService } from 'src/app/services/data-access.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: CarWashBooking[] = [];
  progressStats!: ProgressStats;
  progressStatusCardConfig: ProgressStatsCardConfig[] = [];
  constructor(private dataAccessService: DataAccessService, private router: Router,
    private toastrService: ToastrService
  ) { }



  ngOnInit(): void {
    console.log('Environments: ', environment)
    this.dataAccessService.getProgressStatsCount().subscribe({
      next: (res: ProgressStats) =>{
        this.progressStats = res;
        this.progressStatusCardConfig = []
        Object.keys(this.progressStats).map((item) => {
          let icon = "";
          switch (item ) {
            case 'IN_QUEUE':
              icon = 'fas fa-hourglass-half';
              break;
            case "WASHING":
              icon = 'fas fa-solid fa-water';
              break;
            case "FINISHING":
              icon = 'fas fa-flag-checkered';
              break;
            default:
              icon = 'fas fa-thumbs-up';
              break;
          }
          this.progressStatusCardConfig.push({
            name: BookingStatus[item],
            stats: this.progressStats[item],
            icon: icon,
            color: this.getStatusIcon(BookingStatus[item])
          })
        })
      },
      error: (error: any) => {
        console.error(error);
      }
    })
    this.dataAccessService.getAllBookings().subscribe({
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
