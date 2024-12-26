export class Endpoints{

    static GET_SERVICE_PACKAGES = 'business/service-packages';
    static GET_SERVICE_PACKAGES_BY_ID = (service_id: string)  => `business/service-packages/${service_id}`;
    static UPDATE_SERVICE_PACKAGES   = `business/service-packages/updateServicePackage`;
    static CREATE_SERVICE_PACKAGES   = `business/service-packages/createServicePackage`;

    static Deactivate_SERVICE_PACKAGES = (service_id: string) => `business/service-packages/deactivateServicePackageById/${service_id}`;

    static GET_ALL_BOOKINGS = `bookings/getAllBookings`;
    static GET_BOOKING_BY_ID = (bookingId: string) => `bookings/getBookingById/${bookingId}`; 

    static UPDATE_BOOKING_STATUS = 'bookings/updateBookingStatus';
    static UPDATE_BOOKING = 'bookings/updateBooking';
    static Booking_CAR_WASH = `bookings/createBooking`;

    static GET_PROGRES_STATS_Count = 'dashboard/getProcessStatusCount';

    static GET_USER_BY_ID = (userId: string) => `user/getUser/${userId}`;
    
}