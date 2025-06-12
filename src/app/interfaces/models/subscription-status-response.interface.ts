

export interface SubscriptionStatusResponse {
    success: boolean
    error: any
    message: string
    data: SubscriptionStatusResponseData
  }
  
  export interface SubscriptionStatusResponseData {
    businessId: string
    subscriptionId: string
    basePrice: number
    currency: string
    includedBranches: number
    extraBranches: number
    extraBranchFee: number
    totalPrice: number
    createdAt: TimestampData
    endDate: TimestampData
    isActive: boolean
    startDate: TimestampData
  }
  
  export interface TimestampData {
    _seconds: number
    _nanoseconds: number
  }
  