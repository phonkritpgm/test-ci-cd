import api from "./api";
import Cookie, { cookieName } from "../../cookie/cookie";

// history dispensing prescription
const getDispensingPrescription = (startDate: string, endDate: string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	};
	return api.get(`/GetPickPrescription?startDate=${startDate}&endDate=${endDate}`, config);
}

// history free dispensing
const getFreeDispensing = (startDate: string, endDate: string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	};
	return api.get(`/GetPickFreeOrder?startDate=${startDate}&endDate=${endDate}`, config);
}

// history refill drug
const getRefill = (startDate: string, endDate: string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	};
	return api.get(`/GetDrugRefill?startDate=${startDate}&endDate=${endDate}`, config);
}

const apiDispensingView = {
    getDispensingPrescription,
    getFreeDispensing,
    getRefill,
}

export default apiDispensingView;