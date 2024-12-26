import { UserRoles } from "src/app/enums/UserRoles.enum";

export interface AdminUser {
 
    user_id: string;
    fullName?: string;
    email: string;

    phoneNumber?: string;
    location: string;
    role: UserRoles;
    is_active: boolean;
    created_date: Date;
    updated_date: Date;
    pushToken?: string;
  }