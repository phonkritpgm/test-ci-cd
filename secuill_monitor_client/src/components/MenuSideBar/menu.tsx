import { useCallback, useEffect } from 'react';
import styles from './menu.module.css'
import { links } from './menu_path_data' 
import { useNavigate } from 'react-router-dom';
import Cookie, { cookieName, timeOut } from '../../cookie/cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { logoutUser, setOpenAndCloseLoginPage } from '../../store/slices/authSlice';


const Menu = () => {
    const openAndCloseLoginPage: boolean = useSelector((state: any) => state.auth.openAndCloseLoginPage);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleClick = useCallback(
        (url: string) => () => {       
            navigate(url);
            btnActive(url);
            updateExpCookie();
        }, [navigate],
    )
    
    const updateExpCookie = () => {
        if( (  Cookie.getCookie(cookieName.user).trim().replace("=", "") == ""
            || Cookie.getCookie(cookieName.userInfo).trim().replace("=", "") == "" 
            )
            && openAndCloseLoginPage == false)
        {
            dispatch(logoutUser());
            dispatch(setOpenAndCloseLoginPage({ status: true }));
            return;
        }

        Cookie.updateExpireCookie(cookieName.user, timeOut.TCustom);
        Cookie.updateExpireCookie(cookieName.userInfo, timeOut.TCustom);
    }

    useEffect(() => {
        btnActive(window.location.pathname);
    }, [navigate])

    function btnActive(curUrl:string) {     
        const splitUrl: string = "/" + curUrl.split("/")[1];

        const elm = document.getElementsByClassName(styles.item_list);
        if(splitUrl == "/"){
            const btn = elm[0].getElementsByTagName("button");
            btn[0].classList.add( styles.menu_active );
            return
        }
        
        for (let i = 0; i < elm.length; i++) {
            const btn = elm[i].getElementsByTagName("button");
            if(btn[0].id == splitUrl || btn[0].id.toLowerCase() == splitUrl.toLowerCase()){
                btn[0].classList.add( styles.menu_active );
            } else {
                btn[0].classList.remove( styles.menu_active );
            }
        }
 
    }
    
    return(
        <nav className={ `${ styles.menu_container }` }>
            <div className={ styles.menu_title }>
                <p>Machine: SECUILL 01</p>
                <p>Ward: ( ใช้งานร่วมกัน )</p>
                <p>Status: Online</p>
            </div>
            <div className={ styles.menu_con }>
                
                <ul className={ styles.menu_list }>
                    { links.map( ( d, i ) => (
                        d.enable && (
                                <li key={ d.id } className={ styles.item_list }>
                                    <button id={ d.url } className={ styles.item_link } onClick={ handleClick(d.url) }>
                                        <img src={ d.ico } alt={ d.alt } />
                                        <span key={ i }>{ d.text['TH'] }</span>
                                    </button>
                                </li>
                            )
                    )) }
                </ul>
            </div>        
        </nav>
    )
}

export default Menu;