export class Endpoints{

    static GET_SERVICE_PACKAGES = 'business/service-packages';
    static GET_SERVICE_PACKAGES_BY_ID = (service_id: string)  => `business/service-packages/${service_id}`;

    
}