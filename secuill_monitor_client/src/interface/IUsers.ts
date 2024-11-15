export interface IUser{
    userId: string
    userName: string
    userFullName: string
    userLocationId?: number
    userLocationCode?: string
    userLocationName?: string
    perId?: string
    perName?: string
}

export interface IPermission{
    perId: string
    perName: string
    permissionFunction: IPermissionFunc[]
}

export interface IPermissionFunc{
    perId: string
    funcCode: string
    funcName: string
}

export interface IWardMaster{
    wardCode: string
    wardName: string
}

export interface IBodyUpdateUser{
    userId: string
    userName: string    
    locationId: number  
    locationCode: string    
    locationName: string    
    perId: string   
    userAssign: string
}