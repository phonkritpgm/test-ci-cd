import Menu from "../MenuSideBar/menu";
import styles from './body.module.css'
import MenuToggle from "../MenuSideBar/MenuToggle";

const Body = ({children}: any) => {
    return(
        <div className={ styles.body_container }>
            
            <Menu />
            
            <div className={ styles.body }>

                <MenuToggle />

                <div className={ styles.container }>
                    { children }
                </div>

            </div>
            
        </div>       
    )
}

export default Body;