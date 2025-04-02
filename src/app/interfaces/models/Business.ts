export class BusinessDto{
    id?: string;
    name: string;
    owner: BusinessOwner;
    logo_url: string;
    description: string
    super_admin?: string; // userId 
    admins?: string[]   // userId 
}

export class BusinessOwner{
    name: string
    email: string;
    phone: string;
}