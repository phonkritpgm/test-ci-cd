import Cookie, { cookieName } from '../../cookie/cookie';
import api from './api';

const getPatient = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/getPatient",config);
	
}

const getPatientUsage = (hn:string) =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get(`/getPatientUsage?hn=${hn}`,config);
	
}


const apiPatient = {
    getPatient,
    getPatientUsage
}

export default apiPatient;