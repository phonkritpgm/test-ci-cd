import styles from './Textbox.module.css'
const Textbox = (props: any) => {
    return(
        <input key={ props }
            id={ props.id }
            type={props.type}
            className={ styles.nm_textbox }
            placeholder={ props.placeholder }
            ref={ props.ref }           
            onClick={ props.onClick }
            onChange={ props.onChange }
            maxLength={ props.maxLength } required
            spellCheck = { false }
            style={ props.style }
            disabled = { props.disabled }
            defaultValue= { props.value }
            value= { props.value === null ? "" : props.value }
        >    
        </input>
    )
}
export default Textbox;