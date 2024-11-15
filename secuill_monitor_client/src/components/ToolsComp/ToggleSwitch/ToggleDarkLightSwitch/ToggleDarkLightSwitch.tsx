import { useId } from 'react';
import styles from './ToggleDarkLightSwitch.module.css'
import light_mode from '../../../../assets/svg_icon_dark_light/light_mode_opsz40.svg'
import dark_mode from '../../../../assets/svg_icon_dark_light/dark_mode_opsz40.svg'

const ToggleDarkLightSwitch = () => {
    const id = useId();
    return(
        <div className={ styles.toggle_switch_d_l }>
            <input type="checkbox" id={id} />
            <label htmlFor={id} onClick={() => {}}>                   
                <img src={ light_mode }/>
                <img src={ dark_mode }/>
            </label>          
        </div>
    )
}

export default ToggleDarkLightSwitch;