import Cookie, { cookieName } from "../../cookie/cookie";
import api from "./api";

const getMacUnit = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetMachineUnit",config);
	
	
}

const getMacShelf = (unitNo:string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetMachineShelfByUnit?UnitNo="+ unitNo ,config);
}

const getMacSlot = (shelfNo:string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetDrugInSlotByShelf?ShelfNo="+ shelfNo ,config);
}


const apiMachineInfo = {
    getMacUnit,
	getMacShelf,
	getMacSlot
}

export default apiMachineInfo;