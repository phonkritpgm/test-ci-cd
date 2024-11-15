
// import { useLangModeStore, useLoggedInStore } from "../store";
import { useEffect } from "react";
import Header from "../components/Header/header";
import Body from "../components/Body/body";
import PopupLogin from "../components/Popups/PopupLogin/PopupLogin";
import Login from "./Authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { logoutUser, setDataAuthentication, setOpenAndCloseLoginPage, setStatusLogin } from "../store/slices/authSlice";
import Cookie, { cookieName, timeOut } from "../cookie/cookie";
import { delay } from "../helper/Delay";
// import { LoadingPage } from "./_LoadingPage/LoadingPage";

const Root = (props: {children: JSX.Element}) => {

    const openAndCloseLoginPage: boolean = useSelector((state: any) => state.auth.openAndCloseLoginPage);
    // const statusLogin: boolean = useSelector((state: any) => state.auth.statusLogin);

    const dispatch = useDispatch<AppDispatch>();

    const checkCookieToken = async() => {
        if( (  Cookie.getCookie(cookieName.user).trim().replace("=", "") == ""
            || Cookie.getCookie(cookieName.userInfo).trim().replace("=", "") == "" 
            )
            && openAndCloseLoginPage == false)
        {
            dispatch(logoutUser());
            dispatch(setOpenAndCloseLoginPage({ status: true }));
            return ;
        }

        // check user cookie
        await dispatch(setDataAuthentication({ data: JSON.parse(Cookie.getCookie(cookieName.userInfo)) }));
        await delay(100);
        Cookie.updateExpireCookie(cookieName.user, timeOut.TCustom);
        Cookie.updateExpireCookie(cookieName.userInfo, timeOut.TCustom);
        await delay(100);
        // dispatch login success
        await dispatch(setStatusLogin({ status: true }));      

        return;
    }

    useEffect(() => {

        // Check login user
        // if !login.state return to login page || dialog login alert
        // dispatch(setOpenAndCloseLoginPage({ status: true }));
        checkCookieToken();

        const userAgent: string = window.navigator.userAgent;
        const onBeforeUnload = (event: any) => {
            event.preventDefault();
        };
        console.log(userAgent);

        if (userAgent.match(/iPad/i)) {
            window.addEventListener("pagehide", onBeforeUnload);
            console.log("Device : iPad");
        } else if(userAgent.match(/iPhone/i)) {
            window.addEventListener("pagehide", onBeforeUnload);
            console.log("Device : iPhone");
        }else if(userAgent.match(/Windows/i)) {
            window.addEventListener("pagehide", onBeforeUnload);
            console.log("Device : Windows");
        } else {
            window.addEventListener("beforeunload", onBeforeUnload);
            console.log("Device : Other");
        }
        
        // timeout check cookie
        const intervalId = setInterval( async() => {
            await checkCookieToken();
        }, 10000);

        // out page return remove event
        return () => {
            clearInterval(intervalId);
        };

    }, []);

    return (
        <main>
            {/* {<LoadingPage />} */}
            <Header />
            <Body>
                <PopupLogin
                    onClose={() => {}}
                    show={( openAndCloseLoginPage == true ) ? true : false}
                    title="Authentication"
                >
                    {
                        ( openAndCloseLoginPage == true ) ? <Login/> : <div />
                    }
                    
                </PopupLogin>
                
                {
                    props.children
                }
            </Body>
        </main>
    );
};

export default Root;