export interface IAuthentication{
    status: string
    data: {
        username: string
        token: string
        exp: Date | null
        user: IUser
    }
}

export interface IAuthenticationWithData{
        username: string
        token: string
        exp: Date | null
        user: IUser
}

export interface IAuthenticationCheckLogin{
    status: string
    username: string
}

export interface IUser{
    uid: string
    userName: string
    fullName: string
    department: string
    locationId: number | null
    locationCode: string | null
    locationName: string
    status: number
    permissionID: string
    permissionName: string
}