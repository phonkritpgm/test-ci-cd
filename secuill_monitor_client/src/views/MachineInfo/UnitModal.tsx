import Button, { BtnClr } from '../../components/ToolsComp/button/Button/Button';
import styles from './MachineInfo.module.css';
import { v4 as uuidv4 } from 'uuid'

interface unitType{
    unitID: string,
    unitName: string,
    onClickOpenView: (e: object) => void,
}

const UnitModal: React.FC<unitType> = ({ unitID, unitName, onClickOpenView }) => {
    return(
        <div key={ uuidv4() } className={ styles.unit }>
            <div className={ styles.unit_top }>
                <div className={ styles.top_led }>
                    <div className={ styles.led_blue }></div>
                </div>
                <div className={ styles.unit_name }>
                    <p>{ unitName }</p>
                </div>
            </div>
            <div className={ styles.unit_body }>
                <div className={ styles.body_content }>
                    <div className={ styles.display_drug }>

                    </div>
                </div>
            </div>
            <div className={ styles.unit_footer }>
                <Button type={ BtnClr.NEXT } bg={true} onClick={(e) => onClickOpenView(Object.assign(e, {unitID: unitID}))}>
                    ดูรายการยา
                </Button>
            </div>
        </div>
    )
}

export default UnitModal;