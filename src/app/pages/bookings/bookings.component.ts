import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingStatus } from 'src/app/enums/BookingStatus.enum';
import { CarWashBooking } from 'src/app/interfaces/models/carwash-booking.interface';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: CarWashBooking[] = [];
  constructor(private dataAccessService: DataAccessService, private router: Router,
    private toastrService: ToastrService
  ) { }



  ngOnInit(): void {
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
