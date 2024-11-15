import api from "./api";
import Cookie, { cookieName } from "../../cookie/cookie";

const loginUser =  (username: string, password: string) => {
    return api.post("/login", {username: username, password: password});
}

const checkAuthenticationServer = () => {
    const config = {
		headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
	};
	return api.get("/Authen", config);
}

const authentication = {
    loginUser,
    checkAuthenticationServer
}

export default authentication;