import React, { useEffect, useState } from "react";
import styles from './Auth.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { checkAuthenticationServer, setDataAuthentication, setOpenLogin, setStatusLogin } from "../../store/slices/authSlice"
import Cookie, { cookieName, timeOut } from "../../cookie/cookie";
import { delay } from "../../helper/Delay";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";

const CheckUserAuthentication = () => {
    const [ message, setMessage ] = useState<string>("");
    const dataAuth = useSelector((state: any) => state.auth.dataAuth)

    const dispatch = useDispatch<AppDispatch>();

    const checkAuthentication = async() => {
        await delay(1000);

        const limitRecon: number = 5;
        for (let index = 1; index <= limitRecon; index++) {
            const result: any = await dispatch(checkAuthenticationServer());
            // set message
            // error authentication code 401 ไม่ระบุ Token 402 สิทธิ์การเข้าถึง function api
            if(result.payload.statusCode == 200){

                setMessage("Authentication Success.");
                await dispatch(setDataAuthentication({ data: JSON.parse(Cookie.getCookie(cookieName.userInfo)) }));
                Cookie.updateExpireCookie(cookieName.user, timeOut.TCustom);
                Cookie.updateExpireCookie(cookieName.userInfo, timeOut.TCustom);

                await delay(2000);
                // dispatch login success
                await dispatch(setStatusLogin({ status: true }));             

                return;

            } else if(result.payload.statusCode != 200){
                
                if(result.payload.statusCode == 401){
                    // go to login page
                    // dispatch auth slice to status login
                    setMessage("ไม่สามารถระบุตัวตนได้ Login ใหม่อีกครั้ง");
                    await delay(2000);
                    // dispatch login success
                    await dispatch(setStatusLogin({ status: false }));
                    await dispatch(setOpenLogin());

                    return;
                }

                setMessage("Authentication Fail. : " + result.payload.statusCode + " \r\n" + result.payload.message);
                await delay(3000);
                setMessage("กำลังร้องขอใหม่อีกครั้ง . . .");
                await delay(1000);
            }

            if(index >= limitRecon){
                setMessage("Limit reconnection try again. or refresh web page.");
                await delay(3000);

                return;
            }

            await delay(1000);
            
        }      
    }

    const handleClickReCheck = () => {
        checkAuthentication();
    }

    useEffect(() => {
        
        setMessage("กำลังตรวจสอบข้อมูลการเข้าใช้งาน");
        // start loading check authentication
        checkAuthentication();

    }, [])

    return(
        <React.Fragment>
            <div>
                <div className={ `${ styles.auth_message } ${ styles.flex_center }` }>
                    {
                        dataAuth == null ? (

                            <div className={ styles.auth_message_show }>
                                <p className={ message.includes("ERR") ? styles.message_color_red : styles.message_color_orange }>
                                    { message }
                                </p>
                            </div>

                        ) : (

                            message != "" ? (
                                <React.Fragment>
                                    <div className={ `${ styles.auth_message_show } ${ styles.color_green }` }>
                                        <p className={ message.includes("Success") ? styles.message_color_green : styles.message_color_orange }>{message}</p>                             
                                    </div>
                                    <div className={ styles.auth_message_show_err }>
                                        <p className={ styles.message_color_red }>{
                                            message.includes("code 401") ? ( "ไม่พบข้อมูลผู้ใช้งาน" ) : ("")
                                        }</p>
                                    </div> 
                                </React.Fragment>                                                       
                            ) : (
                                <div className={ `${ styles.auth_message_show }` }>
                                    <p className={ styles.message_color_green }>{""}</p>                             
                                </div>
                            )
                        )
                    }                 
                </div>

                <div className={ `${ styles.flex_center }` }>
                    {
                        dataAuth == null || dataAuth == undefined ? (
                            // <!--Element for custom SVG spinner-->
                            <svg id={ `${ styles.svg_spinner }` } xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 48 48">
                                <circle cx="24" cy="4" r="4" fill="#fff"/>
                                <circle cx="12.19" cy="7.86" r="3.7" fill="#AD1457"/>
                                <circle cx="5.02" cy="17.68" r="3.4" fill="#C2185B"/>
                                <circle cx="5.02" cy="30.32" r="3.1" fill="#D81B60"/>
                                <circle cx="12.19" cy="40.14" r="2.8" fill="#E91E63"/>
                                <circle cx="24" cy="44" r="2.5" fill="#EC407A"/>
                                <circle cx="35.81" cy="40.14" r="2.2" fill="#F06292"/>
                                <circle cx="42.98" cy="30.32" r="1.9" fill="#F48FB1"/>
                                <circle cx="42.98" cy="17.68" r="1.6" fill="#F8BBD0"/>
                                <circle cx="35.81" cy="7.86" r="1.3" fill="#FCE4EC"/>
                            </svg>
                        ) : (
                            <svg className={ `${ styles.checkmark }` } xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 52 52">
                                <circle className={ `${ styles.checkmark__circle }` } cx="26" cy="26" r="25" fill="none"/>
                                <path className={ `${ styles.checkmark__check }` } fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                        )
                    }
                </div>
                      
                <p className={ `${ styles.check_auth_desc } ${ styles.message_color_red } ${ styles.flex_center }` }>
                    { 
                      dataAuth == null ? "กำลังตรวจสอบ" : "ตรวจสอบข้อมูลสำเร็จ" 
                    }
                </p>
                
                <div className={ `${ styles.btn_recon_auth } ${ styles.flex_center }` }>
                    {
                        message.includes("Limit") ? <Button type={ BtnClr.ADD } bg={ true } onClick={() => handleClickReCheck() } >Try Agin</Button> : ""
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default CheckUserAuthentication;