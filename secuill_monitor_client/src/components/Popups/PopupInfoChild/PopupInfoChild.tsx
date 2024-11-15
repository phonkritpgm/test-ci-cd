import React, { useEffect, useState } from 'react'
import styles from './PopupInfoChild.module.css'
import { v4 as uuidv4 } from 'uuid'

interface propTypes{
    title: string
    show: boolean
    bgClose: boolean
    onClose: (e: boolean) => void
    children: React.ReactNode
}

// https://dev.to/g10dra/create-custom-popup-component-in-react-1o18
const PopupInfoChild: React.FC<propTypes> = (props: propTypes) => {
    const [show, setShow] = useState(false);
  
    const closeHandler = (e: any) => {
      if(props.bgClose == true && (e.target.className != styles.overlay && e.target.className != styles.close)) return;
      setShow(false);
      props.onClose(false);
    };
  
    useEffect(() => {
      setShow(props.show);
    }, [props.show]);
  
    return (
      <div key={ uuidv4() }
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }}
        className={styles.overlay}
        onClick={props.bgClose ? closeHandler : () => {}}
      >
        <div className={styles.popup}>
          <h2>{props.title}</h2>
          <span className={styles.close} onClick={closeHandler}>
            &times;
          </span>
          <hr></hr>
          <div className={styles.content}>
            {show ? props.children : <div>Show dialog visible false</div>}
        </div>
        </div>
      </div>
    );
  };
  
export default PopupInfoChild;
