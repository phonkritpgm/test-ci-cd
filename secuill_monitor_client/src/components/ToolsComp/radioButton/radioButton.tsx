
// import styled from "styled-components";
import { InputElementProps } from "./InputInterface";
import styles from './radioButton.module.css'
import { v4 as uuidv4 } from 'uuid'


const RadioButton = ({
  label,
  id,
  color,
  checked,
  ...rest
}: InputElementProps) => (
  <div className={styles.Wrapper} key={uuidv4()}>
    <input className={styles.RadioInput} id={id} type="radio" checked={checked} {...rest} />
    <label className={styles.RadioLabel} style={{color:`${color}`}} htmlFor={id} >
      {label}
    </label>
  </div>
);


export default RadioButton;