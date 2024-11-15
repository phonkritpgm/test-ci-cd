import { useEffect, useId } from 'react';
import styles from './TableDisplayDrugTimeline.module.css'
import { IDataSummaryPick } from '../../../interface/overview';

const defaultTableHeader = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
]

const TableDisplayDrugTimeline = (props:{obj: IDataSummaryPick[]}) => {
    const hintId = useId();
    useEffect(() => {
        
    }, [ props.obj ])
    return(
        <div key={hintId} className={ styles.tb_timeline_number }>
            <table key={hintId}>
                <thead>
                    <tr key={"rowHead"}>
                        <th key="filedHead"> { "ชื่อยา" } </th>
                        { 
                            defaultTableHeader.map( ( head, i ) => (
                                <th key={ i }> { head } </th>
                            ))
                        }
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        props.obj != undefined && props.obj.length != 0 && props.obj.length != undefined ? (
                            props.obj.map( ( data: IDataSummaryPick, i: number ) => (
                                <tr key={ i }>
                                    <td>{ data.drug_name }</td>
                                    { data.qtyPerHour.map( ( n, o ) => (
                                        <td key={o} id={ n.hour }>
                                            { 
                                                n.qty != 0 ? <button>{ n.qty }</button> : "."
                                            }                       
                                        </td>
                                    ))} 
                                </tr>
                            ))
                        ) : (
                            <div>Notfound data.</div>
                        )                       
                    }
                </tbody>
            </table>       
        </div>       
    )
}

export default TableDisplayDrugTimeline;