import api from "./api";
import Cookie, { cookieName } from "../../cookie/cookie";

const getDrugRefill = () => {
    const config = {
        headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
    }
    return api.get('/GetReportDrugRefill',config);
}

const getSummaryPick = (startDate:string,endDate:string) => {
    const config = {
        headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
    }
    return api.get(`/GetReportSummaryPick?startDate=${startDate}&endDate=${endDate}`,config);
}

const getDrugExp = () =>{
    const config = {
        headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
    }
    return api.get('/GetReportDrugExp',config);
}

const apiReport = {
    getDrugRefill,
    getSummaryPick,
    getDrugExp
}

export default apiReport;