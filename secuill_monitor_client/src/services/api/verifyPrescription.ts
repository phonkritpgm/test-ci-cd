import api from "./api";
import Cookie, { cookieName } from "../../cookie/cookie";

const getPrescription = (date:string) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
        }
    }
    return api.get(`/getPrescriptionToVerify?PresDate=${date}`, config);
}

const updateStatusVerify = (RowID:string,machineNo:number) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
        }
    }
    return api.patch(`/updateStatusVerify/${RowID}`, {"f_tomachineno":machineNo}, config);
}

const updatePrescriptionInMachine = ( runningNumber: string, obj: object) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
        }
    }
    return api.patch(`/UpdateStatusPrescription?runningno=${runningNumber}`, obj, config);
}

const checkDrugToVerify = (drugcode: string) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + Cookie.getCookie(cookieName.user),
        }
    }
    return api.get(`/checkDrugToVerify/${drugcode}`, config);
}

const apiVerifyPrescription = {
    getPrescription,
    updateStatusVerify,
    updatePrescriptionInMachine,
    checkDrugToVerify,
}

export default apiVerifyPrescription;