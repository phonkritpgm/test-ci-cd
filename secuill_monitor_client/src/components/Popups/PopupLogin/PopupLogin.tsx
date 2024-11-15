import React, { useEffect } from 'react'
import popupStyles from './PopupLogin.module.css'
import { v4 as uuidv4 } from 'uuid'

interface propTypes{
    title: string
    show: boolean
    onClose: (e: boolean) => void
    children: React.ReactNode
}

// https://dev.to/g10dra/create-custom-popup-component-in-react-1o18
const PopupLogin: React.FC<propTypes> = (props: propTypes) => {
    useEffect(() => {

    }, [props.show]);
  
    return (
      <div key={ uuidv4() }
        style={{
          visibility: props.show ? "visible" : "hidden",
          opacity: props.show ? "1" : "0"
        }}
        className={popupStyles.overlay}
      >
        <div className={popupStyles.popup}>
          <h2>{props.title}</h2>
          <hr/>
          <div className={popupStyles.content}>{props.children}</div>
        </div>
      </div>
    );
  };
  
export default PopupLogin;