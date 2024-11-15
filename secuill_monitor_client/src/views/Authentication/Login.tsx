import React, { useEffect, useState } from "react"
import styles from './Auth.module.css'
import Textbox from "../../components/ToolsComp/Textbox/Textbox"
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button"
import Cookie, { cookieName, timeOut } from "../../cookie/cookie"

import { useDispatch, useSelector } from "react-redux"
import { loginUser, setOpenLogin, setOpenAuth, setStatusLogin } from "../../store/slices/authSlice"
import { AppDispatch } from "../../store/store"

import CheckUserAuthentication from "./CheckUserAuthentication"
import { delay } from "../../helper/Delay"

const Login = () => {
    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ messageAlert, setMessageAlert ] = useState<string>("");
    const [ messageError, setMessageError ] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();
    const loadingUser = useSelector((state: any) => state.auth.loading);
    const openLogin: boolean = useSelector((state: any) => state.auth.openLogin);

    // check login cookie
    const checkLoginData = async () => {
        if ( Cookie.getCookie(cookieName.user) != "" || Cookie.getCookie(cookieName.userInfo ) != ""){
            dispatch(setOpenAuth());
            return;
        }     
        dispatch(setOpenLogin());     
    }

    useEffect(() => {
        checkLoginData();
	}, [])

    // -----------------------------
    const handleSubmit = async(event: any) => {
        event.preventDefault();
        // validate input
        if(username == "" && password == ""){
            alert("กรุณากรอกข้อมูล username & password ของคุณ");
            return false;
        }

        const result: any = await dispatch(loginUser({username: username, password: password}));
        if(result.payload){
            if(result.payload.statusCode == 200){
                Cookie.setCookie(cookieName.user, result.payload.payload.token, {path: '/', expires: Cookie.dateAddMinute(timeOut.TCustom), maxAge: 1});
                Cookie.setCookie(cookieName.userInfo, JSON.stringify(result.payload), {path: '/', expires: Cookie.dateAddMinute(timeOut.TCustom), maxAge: 1});
                setMessageError("");
                setMessageAlert("Login Success.");

                await delay(2000);
                // dispatch login success
                await dispatch(setStatusLogin({ status: true }));

                return;
            }
            setMessageError("Status : " + result.payload.statusCode + "\r\n" + result.payload.message);      
        } else{
            setMessageError(result.payload.statusCode + "\r\n" + result.payload.message)
        }
        setMessageAlert("Login เข้าใช้งานไม่สำเร็จ !" + "\r\n" + "กรุณาลองใหม่อีกครั้ง");
    }
    
    return(
        <React.Fragment>  
            {/* get status login */}
            {/* check cookie */}
            {/* send cookie token check server authentication */}
            {/* if not temp cookie display login send username & password */}
            {/* update status login redux */}
            <div className={ styles.check_authentication }>
                {
                    openLogin == true ? (
                        // with login username & password
                        <div className={ styles.auth }>

                            <div className={ styles.auth_message }>
                            {
                                loadingUser ? (

                                    <div className={ styles.auth_message_show }>
                                        <p>Wait . .  .</p>
                                    </div>

                                ) : (

                                    messageAlert != "" ? (
                                        <React.Fragment>
                                            <div className={ `${ styles.auth_message_show } ${ styles.color_green }` }>

                                                <p className={ messageAlert.includes("Success") ? styles.message_color_green : styles.message_color_orange }>
                                                    {
                                                        messageAlert.includes("Success") 
                                                        ? 
                                                            <div>
                                                                <svg className={ `${ styles.checkmark }` } xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 52 52">
                                                                    <circle className={ `${ styles.checkmark__circle }` } cx="26" cy="26" r="25" fill="none"/>
                                                                    <path className={ `${ styles.checkmark__check }` } fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                                                </svg>
                                                                {messageAlert  }
                                                            </div>
                                                        : 
                                                            <div>
                                                                {messageAlert  }
                                                            </div>
                                                                                     
                                                    }
                                                </p>

                                            </div>
                                            <div className={ styles.auth_message_show_err }>
                                                <p className={ styles.message_color_red }>{
                                                    messageError.includes("code 401") ? ( "ไม่พบข้อมูลผู้ใช้งาน" ) : (messageError)
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

                            <form onSubmit={ handleSubmit }>
                                <div className={ styles.group_input }>
                                    <label htmlFor="">UserName</label>
                                    <Textbox
                                        className={ styles.my_input }
                                        key={"usr-1"}
                                        type={"text"}
                                        placeholder="username"
                                        maxLength={25}
                                        onChange={(e: any) => setUsername(e.target?.value)}                   
                                    >         
                                    </Textbox>
                                </div>
                                <div className={ styles.group_input }>
                                    <label htmlFor="">Password</label>
                                    <Textbox
                                        className={ styles.my_input }
                                        key={"pwd-1"}
                                        type={"password"}
                                        placeholder="*********"
                                        maxLength={25}
                                        onChange={(e: any) => setPassword(e.target?.value)}                    
                                    > 
                                    </Textbox>
                                </div>

                                <div className={ styles.btn_submit }>
                                    <Button type={ BtnClr.ADD } bg={ true } onClick={() => {}} >Login</Button>
                                </div>

                            </form>
                            
                        </div>

                    ) : (
                        // with check authentication server
                        <CheckUserAuthentication />
                    )
                }
                
            </div>
        </React.Fragment>
    )
}

export default Login;