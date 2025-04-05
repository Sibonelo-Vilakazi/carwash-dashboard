

export class Branch{
    name: string; 
    location: string;
    lat: string;
    long: string;
    userId: string;   
    employees: BusinessEmployees[]; 
    id?: string;
    users: string[]
    operating_hours: BusinessOperationHours;
    services: ServicePackages[];
    created_date: Date;
    status: boolean;
    businessId: string;
}


export class BusinessOperationHours{
    monday: DailyTime;
    tueday: DailyTime;
    wednesday: DailyTime;
    thursday: DailyTime;
    friday: DailyTime;
    saturday: DailyTime;
    sunday: DailyTime;
}

export class DailyTime{
    isOpen: boolean;
    openTime: string;
    closeTime: string;
}


export class BusinessEmployees {
    id: string; 
    name: string; 
    role: string;
    phone: string; 
    email: string;
}


