export class Endpoints{

    static GET_SERVICE_PACKAGES = 'business/service-packages';

    static GET_SERVICE_PACKAGES_BY_BUSINESS_ID = (businessId: string) => `business/getBusinessPackagesByBusinessId/${businessId}`;
    
    static GET_SERVICE_PACKAGES_BY_ID = (service_id: string)  => `business/service-packages/${service_id}`;
    static UPDATE_SERVICE_PACKAGES   = `business/service-packages/updateServicePackage`;
    static CREATE_SERVICE_PACKAGES   = `business/service-packages/createServicePackage`;

    static Deactivate_SERVICE_PACKAGES = (service_id: string) => `business/service-packages/deactivateServicePackageById/${service_id}`;

    static GET_ALL_BOOKINGS = `bookings/getAllBookings`;
    static GET_ALL_BOOKINGS_BUSINESS = (businessId: string) => `bookings/getAllBookingsByBusinessId/${businessId}`;
    static GET_BOOKING_BY_ID = (bookingId: string) => `bookings/getBookingById/${bookingId}`; 

    static UPDATE_BOOKING_STATUS = 'bookings/updateBookingStatus';
    static UPDATE_BOOKING = 'bookings/updateBooking';
    static Booking_CAR_WASH = `bookings/createBooking`;

    static GET_PROGRES_STATS_Count = 'dashboard/getProcessStatusCount';
    static GET_PROGRES_STATS_Count_BUSINESS = (businessId: string, year:number) => `dashboard/getProcessStatusCountByBusinessId/${businessId}?year=${year}`;
    static GET_YEARLY_REVENUE_BUSINESS = (businessId: string, year: number) => `dashboard/getYearlyRevenueByBusinessId/${businessId}?year=${year}`;
    static GET_SERVICE_PACKAGE_REVENUE_BUSINESS = (businessId: string, year: number) => `dashboard/getServicePackageRevenueByBusinessId/${businessId}?year=${year}`
    static GET_YEARLY_REVENUE = 'dashboard/getYearlyRevenue';
    static GET_SERVICE_PACKAGE_REVENUE = 'dashboard/getServicePackageRevenue'
    static GET_USER_BY_ID = (userId: string) => `user/getUser/${userId}`;
    
    static CREATE_BRANCH = 'business/createBranch';

    static CREATE_BUSINESS_INFORMATION = 'business/createBusinessProfile';
    static GET_BUSINESS_INFORMATION = (businessId: string)  => `business/getBusinessProfile/${businessId}`;
    static GET_BRANCHES_BY_BUESINESS_ID  = (businessId: string) => `business/getBranchesByBusinessId/${businessId}`;
    static GET_BRANCHES_BY_ID = (branchId: string) => `business/getBranchById/${branchId}`;
    static GET_BRANCHES = `business/getBranches`;


    static CREATE_ADMIN = 'user/createAdmin';
}