enum Gender {
	male = 'male',
	female = 'female'
}

interface IName {
	title: string
	first: string
	last: string
}

interface ILocation {
	street: IStreet
	city: string
	state: string
	country: string
	postcode: number
	coordinates: ICoordinates
	timezone: ITimezone
}

interface IStreet {
	number: number
	name: string
}
interface ICoordinates {
	latitude: string
	longitude: string
}
interface ITimezone {
	offset: string
	description: string
}

interface ILogin {
	uuid: string
	username: string
	password: string
	salt: string
	md5: string
	sha1: string
	sha256: string
}

interface IDob {
	date: Date
	age: number
}

interface IRegistered {
	date: Date
	age: number
}

interface IPersonID {
	name: string
	value: string
}

interface IPicture {
	large: string
	medium: string
	thumbnail: string
}

export interface IPerson {
	gender: Gender
	name: IName
	location: ILocation
	email: string
	login: ILogin
	dob: IDob
	registered: IRegistered
	phone: string
	cell: string
	id: IPersonID
	picture: IPicture
	nat: string
}
