import { PaymentTypes } from "src/app/enums/payment-type.enum";

export interface CarWashBooking {
    bookingId?: string;
    carId: string;
    packageName: string;
    packageItems: string[];
    orderId: string;
    vehicle: string;
    color: string;
    status: string;
    timeSlot: string;
    price: number;
    paymentMethod: PaymentTypes;
    date: string;
    serviceId: string;
    userId: string;
    numberPlate: string;
    isAdminBooking?: boolean,
    payment_status?: string;
}