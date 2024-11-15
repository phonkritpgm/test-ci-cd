import { useEffect, useState } from 'react';
import styles from './MachineInfo.module.css'
import UnitModal from './UnitModal';
import DrugInUnitModal from './DrugInUnitModal';
import PopupInfoChild from '../../components/Popups/PopupInfoChild/PopupInfoChild';
import { v4 as uuidv4 } from 'uuid';
import { PageContainer, PageFooterSpaceContainer } from '../../styled';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getMachineUnit } from '../../store/slices/machineSlice';
import { iMachineUnit } from '../../interface/machine';
// interface dataTestUnitMasterType{
//     unitID: string,
//     unitName: string,
// }

// const dataTestUnitMaster: dataTestUnitMasterType[] = [
//     {
//         unitID: "unit01",
//         unitName: "unit01"
//     },{
//         unitID: "unit02",
//         unitName: "unit02"
//     },
// ]

// interface dataTestShelfType{
//     shelfID: string,
//     unitID: string,
//     shelfName: string,
//     shelfMachineID: string,
//     shelfSafeBox: string,
//     shelfRefrigerator: string,
//     shelfStatus: string,
// }
// // @ts-ignore
// const dataTestShelf: dataTestShelfType[] = [
//     {
//         shelfID: "UID02SH15",
//         unitID: "UID02",
//         shelfName: "ชั้น 1",
//         shelfMachineID: "15",
//         shelfSafeBox: "N",
//         shelfRefrigerator: "N",
//         shelfStatus: "00",
//     },{
//         shelfID: "UID02SH16",
//         unitID: "UID02",
//         shelfName: "ชั้น 2",
//         shelfMachineID: "16",
//         shelfSafeBox: "Y",
//         shelfRefrigerator: "N",
//         shelfStatus: "00",
//     },{
//         shelfID: "UID02SH17",
//         unitID: "UID02",
//         shelfName: "ชั้น 3",
//         shelfMachineID: "17",
//         shelfSafeBox: "Y",
//         shelfRefrigerator: "N",
//         shelfStatus: "00",
//     },{
//         shelfID: "UID02SH18",
//         unitID: "UID02",
//         shelfName: "ชั้น 4",
//         shelfMachineID: "18",
//         shelfSafeBox: "N",
//         shelfRefrigerator: "N",
//         shelfStatus: "00",
//     },{
//         shelfID: "UID02SH19",
//         unitID: "UID02",
//         shelfName: "ชั้น 5",
//         shelfMachineID: "19",
//         shelfSafeBox: "N",
//         shelfRefrigerator: "N",
//         shelfStatus: "00",
//     },
// ]

const MachineInfo = () => {
    const dataMachineUnit = useSelector((state: any) => state.mac.dataMachineUnit.data);
    const [dataUnitNo,setDataUnitNo] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const [ visiblePop, setVisiblePop ] = useState<boolean>(false);

    const onClosePopup = (e: boolean) => {
        setVisiblePop(e);
    }

    const onOpenPopup = (e: any) => {
        // get data shelf
        setDataUnitNo(e.unitID)    
        // check error

        // open view
        setVisiblePop(!visiblePop);
    }

    useEffect(()=>{
        dispatch(getMachineUnit());

    },[])
    return(
        <PageContainer>
            <div className="root_title">
                <h4>ข้อูมูลครื่อง SECUILL ( Ward : ใช้งานร่วมกัน )</h4>
            </div>
            <hr />

            <div className={ styles.mc_guid }>
                <h4>ข้อมูลตู้ยา ชั้น ช่องเก็บยา</h4>
                <p>unit ตู้ยาหลัก Main control</p>
                <p>shelf ชั้นยา</p>
                <p>slot ช่องเก็บยาของตู้นานั้น ๆ</p>             
            </div>

            <div className="root_white_space"/>

            <div className={ styles.mc_container }>
                {
                    dataMachineUnit == undefined ? (
                        <div>Undefined data</div>
                    ) : dataMachineUnit.length == 0 || dataMachineUnit.length == undefined ? (
                        <div>Data notfound</div>
                    ) : (
                        dataMachineUnit.map(( dataUnit: iMachineUnit ) => (
                            <UnitModal
                                key={dataUnit.unitNo}
                                unitID={dataUnit.unitNo}
                                unitName={dataUnit.unitName}
                                onClickOpenView={onOpenPopup}
                            />
                        ))
                    )            
                }
                
            </div>
            
            <PopupInfoChild
                key={uuidv4()}
                onClose={onClosePopup}
                show={visiblePop}
                bgClose={true}
                title='ช่องยาและรายการยา'
            >
                <DrugInUnitModal key={uuidv4()} unitNo={dataUnitNo} />
            </PopupInfoChild>

            <PageFooterSpaceContainer>
                
            </PageFooterSpaceContainer>

        </PageContainer>
    )
}

export default MachineInfo;