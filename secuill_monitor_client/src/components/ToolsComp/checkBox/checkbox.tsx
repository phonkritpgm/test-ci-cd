import { InputHTMLAttributes } from "react";
import styles from "./checkBox.module.css";
import { v4 as uuidv4 } from 'uuid';
interface propType 
 extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const CheckBox = ({
    label,
    id,
    checked,
    ...rest
}:propType) =>{
    return (
                <div className={styles.container} key={uuidv4()}>
                    <input type="checkbox" 
                        className={styles.input}
                        checked={checked} {...rest}/>
                    <span className={styles.label}>{label}</span>
                </div>
    )
}

export default CheckBox;