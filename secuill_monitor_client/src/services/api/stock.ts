
import Cookie, { cookieName } from '../../cookie/cookie';
import { IinsertLotNumber, IupdateLotNumber, IupdateStatusLotNumber } from '../../interface/stock';
import api from './api';

const getStock = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetStock",config);
	
	
}

const getDrugInfo = ()=>{
	const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetDrugLot",config);
}

const getLotNumber = (drugCode:string) =>{
	const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get(`/GetLotNumberByDrugCode?drugName=${drugCode}`,config);
}

const insertLotNumber = (objLotNumber:IinsertLotNumber)=>{
	const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.post("/InsertLotNumber",objLotNumber,config);
}

const updateLotNumber = (objLotNumber:IupdateLotNumber,drugcode:string,lot:string) => {
	const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
	return api.patch(`/UpdateLotNumber?drugCode=${drugcode}&LotNo=${lot}`,objLotNumber,config);
}

const updateStatusLotNumber = (objStatus:IupdateStatusLotNumber,drugcode:string,lot:string) => {
	const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
	return api.patch(`/UpdateStatusLotNumber?drugCode=${drugcode}&LotNo=${lot}`,objStatus,config);
}


const apiStock = {
    getStock,
	getLotNumber,
	getDrugInfo,
	insertLotNumber,
	updateLotNumber,
	updateStatusLotNumber
}

export default apiStock;