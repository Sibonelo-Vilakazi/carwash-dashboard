import { Component, OnInit } from '@angular/core';
import { CarWashBooking } from 'src/app/interfaces/models/carwash-booking.interface';
import { DataAccessService } from 'src/app/services/data-access.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: CarWashBooking[] = [];
  constructor(private dataAccessService: DataAccessService) { }

  ngOnInit(): void {
    this.dataAccessService.getAllBookings().subscribe({
      next: () =>{

      },
      error: (error: any) => {
        console.error(error)
      }
    })
  }


  handleDelete(bookingId: string) {

  } 

  handleCreateBooking() {
    
  }

  handleEdit(bookingId: string) {

  }

}
