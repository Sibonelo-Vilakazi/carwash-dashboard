export const generateOrderId = (locationCode = "JHB", serviceType = "WASH") =>{
    // Get current date
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD format
  
    // Generate random 4-digit number
    const random_number = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  
    // Format the order ID
    return `CW${locationCode}-${serviceType}-${today}-${random_number}`;
  }


  export const convertTimestampTodate = (dateObject: any) => {
    const seconds = dateObject._seconds;
    const nanos = dateObject._nanoseconds;
  
    const millis = (seconds * 1000) + Math.floor(nanos / 1_000_000);
    const date = new Date(millis);
    return date;
  }
  export const stripTime = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }