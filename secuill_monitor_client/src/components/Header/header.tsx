
import styles from './header.module.css'
import logo from '../../assets/svg_icon_header/conveyor_opsz40.svg'
import user_c from '../../assets/svg_icon_header/account_circle_opsz40.svg'
import img_logout from '../../assets/svg_icon_header/logout_opsz40.svg'
// import ToggleDarkLightSwitch from '../ToolsComp/ToggleSwitch/ToggleDarkLightSwitch/ToggleDarkLightSwitch'
import { useDispatch, useSelector } from 'react-redux'
import { IAuthenticationWithData } from '../../interface/authentication'
import { AppDispatch } from '../../store/store'
import { logoutUser, setOpenAndCloseLoginPage } from '../../store/slices/authSlice'

const Header = () => {
    const dataAuth: IAuthenticationWithData = useSelector((state: any) => state.auth.dataAuth);
    const dispatch = useDispatch<AppDispatch>();
    const statusLogin: boolean = useSelector((state: any) => state.auth.statusLogin);
    const handleLoginAndOut = async() => {
        if(statusLogin == true){
            // dispatch logout
            await dispatch(logoutUser());

            // dispatch close login
            await dispatch(setOpenAndCloseLoginPage({ status: true }));

            return;
        } 

        await dispatch(setOpenAndCloseLoginPage({ status: true }));

    }

    return(
        <header className={ styles.masthead_container }>
            <div className={ styles.masthead }>
                <div className={ styles.container }>
                    {/* <div className={ `${styles.start} ${styles.end}` }> */}
                    <div className={ styles.start }>
                        <div className={ styles.logo_img }>
                            <img src={ logo } alt="logo program" />
                        </div>
                        <div className={ styles.project_name }>
                            <span>SECUILL STD V1.0</span>
                        </div>               
                    </div>
                    <div className={ styles.center }>
                        <div className={ styles.center_space }>

                        </div>
                    </div>
                    <div className={ styles.end }>
                        <div className={ styles.toggle_d_l }>
                            {/* <ToggleDarkLightSwitch /> */}
                        </div>
                        <div className={ styles.user }>
                            <div className={ styles.user_img }>
                                <img src={ user_c } alt="" />
                            </div>
                            <div className={ styles.user_desc }>                     
                                {                                                                                                          
                                    statusLogin == true && dataAuth != null && !Array.isArray(dataAuth) ? (                                      
                                        <span>{ dataAuth.user.fullName } ( { dataAuth.user.department } )</span>
                                    ) : (
                                        <span>ลงชื่อเข้าใช้งาน</span>
                                    )
                                }
                               
                            </div>
                        </div>
                        <div className={ styles.logout } onClick={ () => {handleLoginAndOut()} }>
                            <img src={ img_logout } alt="logout user" />
                            <a>
                                {
                                    statusLogin == true ? ( "Logout" ) : ( "Login" )
                                }
                            </a>
                        </div>
                    </div>
                </div>
            </div>      
        </header>
    )
}

export default Header;