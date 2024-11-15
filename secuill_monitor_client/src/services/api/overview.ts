import api from "./api";
import Cookie, { cookieName } from "../../cookie/cookie";

// count data dashboard and chart line

const getCountDashBoard = (date: string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
	return api.get(`/GetCountDashBoard?PresDate=${date}`, config);
}
 
const getDataChartLine = (date: string)=>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get(`/GetValueChartLine?PresDate=${date}`, config);
}
// summary pick drug
const getDataSummaryPickDrug = (date: string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}

    return api.get(`/GetValueQtyPerHour?PresDate=${date}`, config);
}

// refill drug
const getDataRefillHeader = (startDate: string) => {
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get(`/GetHeaderRefill?startDate=${startDate}`, config);
}

const getDataRefillDetail = (date: string,time: string)=>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get(`/GetDrugRefillDetailOverview?startDate=${date}&endDate=${time}`, config);
}

const apiOverview = {
    getCountDashBoard,
    getDataChartLine,
    getDataSummaryPickDrug,
    getDataRefillHeader,
    getDataRefillDetail,
}

export default apiOverview;