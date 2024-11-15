import React, { useEffect, useState } from 'react'
import popupStyles from './MessageBox.module.css'
import { v4 as uuidv4 } from 'uuid'

interface propTypes{
    title: string
    show: boolean
    onClose: (e: boolean) => void
    children: React.ReactNode
}

// https://dev.to/g10dra/create-custom-popup-component-in-react-1o18
const MessageBox: React.FC<propTypes> = (props: propTypes) => {
    const [show, setShow] = useState(false);
  
    const closeHandler = () => {
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
        className={popupStyles.overlay}
        onClick={closeHandler}
      >
        <div className={popupStyles.popup}>
          <h2>TEST FUNC</h2>
          <h2>{props.title}</h2>
          <span className={popupStyles.close} onClick={closeHandler}>
            &times;
          </span>
          <div className={popupStyles.content}>{props.children
            }</div>
        </div>
      </div>
    );
  };
  
export default MessageBox;

{/* <div class="message-box message-box-info">
  <i class="fa fa-info-circle fa-2x"></i>
  <span class="message-text"><strong>Info:</strong> User pending action</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-warn">
  <i class="fa fa-warning fa-2x"></i>
  <span class="message-text"><strong>Warning:</strong> User has to be admin</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-error">
  <i class="fa fa-ban fa-2x"></i>
  <span class="message-text"><strong>Error:</strong> Internal Server Error</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div>
<div class="message-box message-box-success">
  <i class="fa fa-check fa-2x"></i>
  <span class="message-text"><strong>Success:</strong> Updated member status</span>
  <i class="fa fa-times fa-2x exit-button "></i>
</div> */}

// $info: #CDE8F6;
// $info-text: #447EAF;
// $warn: #F8F4D5;
// $warn-text: #96722E;
// $error: #ECC8C5;
// $error-text: #B83C37;
// $success: #DDF3D5;
// $success-text: #597151;

// .message-box{
//   width: 440px;
//   border-radius: 6px;
//   margin: 20px auto;
//   padding: auto 0;
//   position: relative;
//   i{
//     vertical-align: middle;
//     padding: 20px;
//     &.exit-button{
//       float: right;
//       opacity: .4;
//       &:hover{
//         opacity: .8;
//       }
//     }
//   }
// }
// .message-text{
//   vertical-align: middle;
// }
// .message-box-info{
//   background-color: $info;
//   border:  darken($info, 40%) 2px solid;
//   color: $info-text;
// }
// .message-box-warn{
//   background-color: $warn;
//   border:  darken($warn, 20%) 2px solid;
//   color: $warn-text;
// }
// .message-box-error{
//   background-color: $error;
//   border:  darken($error, 20%) 2px solid;
//   color: $error-text;
// }
// .message-box-success{
//   background-color: $success;
//   border:  darken($success, 20%) 2px solid;
//   color: $success-text;
// }
