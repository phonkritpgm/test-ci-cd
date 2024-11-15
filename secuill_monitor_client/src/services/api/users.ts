
import Cookie, { cookieName } from '../../cookie/cookie';
import { IBodyUpdateUser } from '../../interface/IUsers';
import api from './api';

const getAllUsers = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetAllUsers",config);	
}

const getUserPermission = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetUserPermission",config);	
}

const getWardMaster = () =>{
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	}
    return api.get("/GetWardMaster",config);	
}

const updateMUsers = ( obj: IBodyUpdateUser) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
        }
    }
    return api.patch(`/UpdateMUsers`, obj, config);
}

const apiUsers = {
    getAllUsers,
	getUserPermission,
	getWardMaster,
	updateMUsers
}

export default apiUsers;