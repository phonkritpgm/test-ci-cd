import Cookie, { cookieName } from "../../cookie/cookie";
import { IDrugInfo } from "../../interface/druginfo";
import api from "./api";

const getDrugInfo = () => {
    const config = {
        headers: {
			'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
		}
    }
    return api.get('/GetDrugAll',config);
}

const insertDrug = async(drugInfo:IDrugInfo) => {
    const config = {
        headers: {
            'Authorization': 'Bearer '+ Cookie.getCookie(cookieName.user),
        },
    }

    return await api.post('/InsertDrug',drugInfo,config)
}

const updateDrug = (drugInfo:IDrugInfo) => {
    const config = {
        headers: {
            'Authorization': 'Bearer '+ Cookie.getCookie(cookieName.user),
        },

    }
    return api.patch(`/UpdateDrugDetail/?drug_code=${drugInfo.drug_code}`,drugInfo,config);
}

const drugInfo = {
    getDrugInfo,
    insertDrug,
    updateDrug
}

export default drugInfo;