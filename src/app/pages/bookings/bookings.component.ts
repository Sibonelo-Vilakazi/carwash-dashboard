import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private dataAccessService: DataAccessService, private router: Router) { }

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

}
