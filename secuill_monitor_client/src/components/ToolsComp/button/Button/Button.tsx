import React from 'react'
import styles from './Button.module.css'
import { v4 as uuidv4 } from 'uuid'
// import vaccines_opsz40 from '../../../../assets/svg_icon_menu/add_chart_opsz40.svg'

export enum BtnClr{
    ADD = 'nm_add_color',
    EDIT = 'nm_edit_color',
    DELETE = 'nm_delete_color',
    BACK = 'nm_back_color',
    NEXT = 'nm_next_color',
    OK = 'nm_ok_color',
    RETRY = 'nm_retry_color',
    CANCEL = 'nm_cancel_color',
    SUBMIT = 'nm_submit_color',
    SEARCH = 'nm_search_color'
}

interface IButton{
    type: BtnClr
    bg: boolean
    onClick: (e: any) => void
    children: React.ReactNode
}

const addClassName = (e: BtnClr, bg: boolean): string => {
    if( e == null ) { return `${ styles.nm_btn } ${ styles.nm_default_color }` }
    return `${ styles.nm_btn } ${ bg ? styles[e] : '' }`;
}

// ``
const Button: React.FC<IButton> = ({type, bg, onClick, children}) => {
    return(
        <button key={ uuidv4() }       
            className={ addClassName(type, bg) }   
            onClick={ onClick } 
        >
            {/* <img style={{ filter: 'brightness(100)', width: "30px", height: "30px", padding: "0" }} src={vaccines_opsz40}></img> */}
            { children == null ? "Button" : children}
        </button>
    )
}

export default Button;