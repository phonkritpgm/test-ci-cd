import { useEffect, useState } from 'react'
import styles from './MachineInfo.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { getMachineShelf, getMachineSlot } from '../../store/slices/machineSlice'
import { iMachineShelf, iMachineSlot } from '../../interface/machine'

const headerShelf = [
    "ชื่อชั้น",
    "สถานะ",
]

// const dataTestShelf = [
//     {
//         shelfid: "01",
//         shelfName: "Shelf01",
//         shelfStatus: "1",
//     },
//     {
//         shelfId: "02",
//         shelfName: "Shelf02",
//         shelfStatus: "0",
//     }
// ]

const headerSlot = [
    "สถานะ",
    "ชื่อยา",
    "จำนวน",
    "MAX",
]

// const dataTestSlot = [
//     {
//         slotId: "01",
//         slotName: "Slot01",
//         drugCode: "1",
//         drugName: "Paracetamal 10 mg",
//         qty: "1",
//         maxQty: "10",
//         slotStatus: 1,
//     },
//     {
//         sloId: "01",
//         slotName: "Slot01",
//         drugCode: "1",
//         drugName: "Paracetamal 10 mg",
//         qty: "1",
//         maxQty: "10",
//         slotStatus: 1,
//     },{
//         slotId: "01",
//         slotName: "Slot01",
//         drugCode: "1",
//         drugName: "Paracetamal 10 mg",
//         qty: "1",
//         maxQty: "10",
//         slotStatus: 1,
//     },
// ]

const DrugInUnitModal = (props: any) => {
    const [ selectRowIndex, setSelectRowIndex ] = useState<string>("");
    const dataMachineShelf = useSelector((state: any) => state.mac.dataMachineShelf.data);
    const dataMachineSlot = useSelector((state:any) => state.mac.dataMachineSlot.data);
    const dispatch = useDispatch<AppDispatch>();
    const handleShowSlot = async(e: any) => {
        e.preventDefault();
        dispatch(getMachineSlot(e.target.parentNode.id));
        setSelectRowIndex(e.target.parentNode.id);
    }

    useEffect(() => {
        dispatch(getMachineShelf(props.unitNo));
        dispatch(getMachineSlot("-"));
    }, [])

    return(
        <div key={ uuidv4() } className={ styles.drug_unit_modal }>
            <div className={ styles.drug_unit_title }>
                <h5>Unit01</h5>
            </div>
            <div className={ styles.drug_unit_table }>
                <div className={ styles.drug_unit_desc }>
                
                    <table id={"table-shelf"} >
                        <thead>
                            <tr>
                                {
                                    headerShelf.map( ( head ) => (
                                        <th> { head } </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {   dataMachineShelf == undefined ? (
                                    <tr><td colSpan={ headerShelf.length } ><div>undefined</div></td></tr>                        
                                ) : dataMachineShelf.length == 0 || dataMachineShelf.length == undefined ? (
                                    <tr><td colSpan={ headerShelf.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                                ) : (
                                    dataMachineShelf.map( ( data: iMachineShelf ) => (
                                        <tr id={ data.shelfNo} className={ styles.cursor_hand } onClick={(e: any) => { handleShowSlot(e) }}>
                                            <td className={ selectRowIndex == (data.shelfNo) ? styles.row_active : "" }>{ data.shelfName }</td>
                                            <td className={`${styles.col_center} ${selectRowIndex == ( data.shelfNo) ? styles.row_active : ""} ${data.shelfStatus === "02" ? styles.font_color_open : styles.font_color_close }`}>
                                                { data.shelfStatus === "02" ? "พร้อมใช้งาน" : "ปิดการใช้งาน"}
                                            </td>
                                        </tr>
                                    ))
                                )                             
                            }
                        </tbody>
                    </table>
                </div>
                            
                <div className={ styles.drug_unit_desc }>
                    <table id={"table-slot"} key={ uuidv4() }>
                        <thead>
                            <tr>
                                { 
                                    headerSlot.map( ( head ) => (
                                        <th > { head } </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {   dataMachineSlot == undefined ? (
                                    <tr><td colSpan={ headerSlot.length } ><div>undefined</div></td></tr>
                                ) : dataMachineSlot.length == 0 || dataMachineSlot.length == undefined ? (
                                    <tr><td colSpan={ headerSlot.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                                ) : (
                                    dataMachineSlot.map( ( data: iMachineSlot ) => (
                                        // eslint-disable-next-line react-hooks/rules-of-hooks
                                        <tr onClick={() => {}}>
                                            <td className={`${styles.col_center} ${data.slotStatus == "00" ? styles.font_color_open : styles.font_color_close} `}>{ data.slotStatus == "00" ? "พร้อมใช้งาน" : "ปิดการใช้งาน"}</td>
                                            <td>{ data.drugName }</td>
                                            <td className={ styles.col_center }>{ data.qty }</td>
                                            <td className={ styles.col_center }>{ data.maxQty }</td>
                                        </tr>
                                    ))
                                    
                                )                             
                            }
                        </tbody>

                    </table>

                </div>
                
            </div>
             
        </div>
    )
}

export default DrugInUnitModal;