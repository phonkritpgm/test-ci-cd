import styled from "styled-components";
import arrow_up from './arrow_up.svg'
import arrow_down from './arrow_down.svg'
import { useState } from "react";
import styles from './menu.module.css'

const MenuToggleContainer = styled.div`
    position: absolute;
    width: 2.2em;
    height: 2.2em;
    top: 35px;
    left: 50%;
    translate: transformX(-50%);
    background-color: #fff;
    border-radius: 50%;
    z-index: 888;
    align-items: center;
    text-align: center;
    border: none;

    opacity: 0;
    visibility: hidden;
    transition: 1s all ease-in-out;

    @media only screen and (max-width: 600px) {
        display: flex;
        opacity: 1;
        visibility: visible;
        transition: 1s all ease-in-out;
        border: solid 1px rgba(0,0,0,0.1)
    }
`;

const MenuToggleImg = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

// https://codepen.io/matthewmain/pen/NWKoPXJ
const MenuToggle = () => {
    const [ openClose, setOpenCLose ] = useState<{status: boolean, img: string}>({ status: false, img: arrow_down });

    const handleChangeOpenClose = (val: boolean) => {
        const nav = document.getElementsByTagName('nav')
        if(val){
            nav[0].classList.remove(styles.disable_menu);
            nav[0].classList.add(styles.enable_menu);
        } else{
            nav[0].classList.remove(styles.enable_menu);
            nav[0].classList.add(styles.disable_menu);
        }
        setOpenCLose({ status: val, img: val ? arrow_up : arrow_down })
    }

    return(
        <MenuToggleContainer>
            <MenuToggleImg 
                onClick={ () => { handleChangeOpenClose(!openClose.status) } }
                src={ openClose.img }
                alt="icon svg down up menu toggle" 
            />
        </MenuToggleContainer>
    )
}

export default MenuToggle;