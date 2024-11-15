

import { useEffect, useState } from 'react';
import styles from './DatetimePicker.module.css'

const typeSelection = "date";

// eslint-disable-next-line react-refresh/only-export-components
export const clickDatetime = () => {
    const dt: any = document.getElementById("date");
    dt.ontoggle;
}


type propsType = {
    date:string; 
    setDate:(startDate:string)=>void
}

const DatetimePicker = (props: propsType) => {

    const [dateValue,setDateValue] = useState<string>(props.date);
    
    const onChangeDate = (value:string) =>{
        setDateValue(value);
        props.setDate(value);
    }

    useEffect(()=>{
        setDateValue(props.date);
    },[dateValue,props.date])

    return(
        <div>
            <div className={ styles.date_time_picker }>
                { 
                    typeSelection == "date" 
                ?
                    <div>
                        <input type="date" id="date" name="date" onChange={(e)=>onChangeDate(e.target.value)} value={dateValue}></input>
                    </div>
                :
                    <div>
                        <input type="date" id="date" name="date"></input>
                        <span></span>
                        <input type="time" id="time" name="time"></input>
                    </div>
                }
            </div>
            {/* <div className="info">
                <strong>Compatibility check:</strong>
                Date "<span id="date-output"></span>",
                Time "<span id="time-output"></span>"
            </div> */}
        </div>
    )
}

export default DatetimePicker;