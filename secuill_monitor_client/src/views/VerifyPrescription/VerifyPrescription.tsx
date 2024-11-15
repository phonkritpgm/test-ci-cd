import { useEffect, useId, useState } from "react"
import styles from './VerifyPrescription.module.css'
import Textbox from "../../components/ToolsComp/Textbox/Textbox"

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { IInitialAllState,
         filterPrescription,
         getPrescription,
         updatePrescriptionInMachine,
         updatePrescriptionInMachineSlice,
         updateStatusVerify,
         updateTmpDataVerifySlice,
         checkDrugToVerify,
         filterStatusPrescription,
        } from "../../store/slices/verifyPrescriptionSlice";
import { ICheckDrugVerify, IVerifyDataSecuillAPI } from "../../interface/verifyPrescription";

import Dialog, { buttonType, messageType } from "../../components/Popups/Dialog/Dialog";
import { PageContainer, PageFooterSpaceContainer } from "../../styled";
import { cFormatDate, cFormatDateTime } from "../../helper/convertDateForm";
import { IAuthenticationWithData } from "../../interface/authentication";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import { LoadingPage } from "../_LoadingPage/LoadingPage";
import styled from "styled-components";
import RadioButtonGroup from "../../components/ToolsComp/radioButton/ReadioButtonGroup";

// const BottomContainer = styled.div<any>`
//     padding-top: 20px;
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
// `; 

const RadioButtonContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    padding: 0 10px;
`;

const defaultTableHeader = [
    "ตรวจสอบ",
    "Machine",
    "ใบสั่งยา",
    "HN",
    "ชื่อ ผป.",
    "ชื่อยา",
    "จำนวน",
    "วิธีใช้",
    "เวลาเบิก"
]

const VerifyPrescription = () => {
    const hintId = useId();
    const dataState: IInitialAllState = useSelector((state: any) => state.verify);
    const dataPrescription: IVerifyDataSecuillAPI[] = dataState.dataPrescription.data;
    const loadingDataPrescription: boolean = dataState.dataPrescription.loading;
    const dataAuth: IAuthenticationWithData = useSelector((state: any) => state.auth.dataAuth);
    
    const dispatch = useDispatch<AppDispatch>();

    
    const [ optionCheck, setOptionCheck ] = useState<number>(0);
    const op: any = [
        {
            label: "ทั้งหมด",
            name: "locationOp",
            color: "var(--primary-400)",
            checked: optionCheck == 0 ? true : false,
        },
        {
            label: "ตรวจสอบแล้ว",
            name: "locationOp",
            color: "var(--primary-400)",
            checked: optionCheck == 1 ? true : false,
        },
    ]

    // Option radio button handler change
    function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {

        const tb: any = document.getElementById("input-search");
        tb.value = "";

        for (let index = 0; index < op.length; index++) {
            if(op[index].label == event.target.value){
                setOptionCheck(index);
                dispatch(filterStatusPrescription( { status: index == 0 ? "" : "31" } ));
                return;
            }        
        }
    }

    useEffect(()=>{
        dispatch(getPrescription({ date: cFormatDate(new Date())}))
    },[])
    
    const handleOnClick = async(data: IVerifyDataSecuillAPI) => {

        const resultCheckDrug: any = await dispatch(checkDrugToVerify({ drugcode : data.f_orderitemcode }));
        console.log(resultCheckDrug.payload.payload);

        const objCheckDrug: ICheckDrugVerify = resultCheckDrug.payload.payload;
        if(objCheckDrug.drugCode == null){
            // alert message
            Dialog.open(() => {},
                            "ไม่พบข้อมูลยาใน Stock machine !",
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Warning,
                        )
            return;
        }

        if( objCheckDrug.stockDrugMachine < parseInt(data.f_orderqty)){
            // alert message
            Dialog.open(() => {},
                            "จำนวนยาคงเหลือไม่พอจ่าย " + "<br/>" + objCheckDrug.drugName + "<br/>" + "<br/>ใบสั่งยา Qty ( " + data.f_orderqty + " )" + "<br/>" + "จำนวนคงเหลือ Stock ( " + objCheckDrug.stockDrugMachine + " )",
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Warning,
                        )
            return;
        }
        
        const sumQty = (objCheckDrug.stockDrugMachine ?? 0) - ((objCheckDrug.sumaryDrugInPrescription ?? 0) + parseInt(data.f_orderqty));
        console.log("sumQty: ", sumQty);
        if(sumQty < 0){
            // alert message
            let strDrugList: string = "";
            objCheckDrug.prescriptionDrugLists.map((data) => (
                strDrugList += "<br/>" + data
            ))

            Dialog.open(() => {},
                            "<span style='color: red;'>จำนวนยารอจ่ายและยาคงเหลือไม่พอจ่ายสำหรับใบยาถัดไป</span>" 
                            + "<br/> <span style='color: red;'>กรุณาตรวจสอบตามรายการด้านล่าง</span>" 
                            + "<br/> จำนวนยารวมใบสั่งยา ( " + (objCheckDrug.sumaryDrugInPrescription ?? 0) + " )"
                            + "<br/> จำนวนคงเหลือ Stock ( " + (objCheckDrug.stockDrugMachine ?? 0) + " )"
                            + "<br/> <span style='color: green;'>ใบยารอจ่าย</span>"
                            + strDrugList
                            ,
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Warning,
                        )
            return;
        }

        // confirm message box
        Dialog.open( (e) => handleConfirmDialog(Object.assign(e, {dataVer: data})),
                                        "ยืนยันอัพเดทข้อมูล Verify <br/><br/>" + data.f_prescriptionno + "<br/>" + data.f_orderitemname,
                                        "แจ้งเตือน",
                                        buttonType.YesNo, messageType.Question,
                                    )
    }

    const handleConfirmDialog = async(e: any) => {
        if(e.eventMessage == "yes"){     
            const data = e.dataVer;
            // Send verify status -> update middle table filed [ f_tomachineno = 31 ]
            const result: any = await dispatch(updateStatusVerify({ RowID: data.rowID, machineNo: parseInt(data.f_tomachineno == "0" ? "31" : "0") }));
            // error authentication code 401 ไม่ระบุ Token 402 สิทธิ์การเข้าถึง function api
            if(result.meta.requestStatus == "fulfilled"){
                if(result.payload.statusCode == 200){
                    dispatch(updateTmpDataVerifySlice({ RowID: data.rowID, machineNo: parseInt(data.f_tomachineno == "0" ? "31" : "0") }))
                    Dialog.open(() => {},
                            "อัพเดทข้อมูลสำเร็จ " + "<br/>" + result.payload.message,
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Success,
                        )
                    return;
                }
                
                Dialog.open(() => {},
                            "อัพเดทข้อมูลไม่สำเร็จ \r\n" + result.payload.statusCode + " \r\n" + result.payload.message,
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Error,
                        )
                return
            }
        }
    }

    //  machine action status and display
    const prescriptionAndDispensing = (presStatus: string, dispStatus: string) => {
        if( presStatus == "C" ) return { displayTxt: "ยกเลิก", bgColor: "var(--st-error)" }
        switch (dispStatus) {
            case "": return { displayTxt: "รอ Verify", bgColor: "rgba(201, 36, 13, 0.8)" }
            case "W": return { displayTxt: "รอจ่าย", bgColor: "rgba(246, 176, 2, 0.8)" } 
            case "C": return { displayTxt: "จ่ายแล้ว", bgColor: "var(--green-500)" } 
            case "I": return { displayTxt: "จ่ายไม่ครบ", bgColor: "var(--st-warning)" } 
            case "E": return { displayTxt: "เกินจำนวน", bgColor: "var(--st-error)" }
            case "O": return { displayTxt: "เกินจำนวน", bgColor: "var(--st-error)" } 
            default: return { displayTxt: "Unknown", bgColor: "var(--st-secondary)" }
        }
    }

    // event click

    const handleClickMachineStatus = (data: IVerifyDataSecuillAPI) => {
        // confirm message box
        const message = data.pres_status == "A" ? "ยกเลิกรายการยา" : "กู้คืนรายการยา";
        Dialog.open( (e) => handleConfirmDialogUpdatePrescriptionStatusInMachine(Object.assign(e, {data: data})),
            "ยืนยันอัพเดทข้อมูล <br/><br/>" + message   + "<br/>" + data.f_orderitemname,
            "แจ้งเตือน",
            buttonType.YesNo, messageType.Warning,
        )

    }

    const handleConfirmDialogUpdatePrescriptionStatusInMachine = async (e: any) => {
        if(e.eventMessage == "yes"){ 
            const data: IVerifyDataSecuillAPI = e.data;
            const sendUpdate = {
                pres_status: data.pres_status == "A" ? "C" : "A", 
                pres_statusdesc: ` ${ data.pres_status == "A" ? "ยกเลิกรายการยา" : "กู้คืนรายการยา" } | ${ dataAuth.user.fullName } | ${ cFormatDateTime(new Date()) }`,
            }
            const result: any = await dispatch(updatePrescriptionInMachine( { runningNumber: data.pres_runningno, obj: sendUpdate } ))
            if(result.meta.requestStatus == "fulfilled"){
                if(result.payload.statusCode == 200){
                    await dispatch(updatePrescriptionInMachineSlice( { runningNumber: data.pres_runningno, obj: sendUpdate } ))
                    Dialog.open(() => {},
                            "อัพเดทข้อมูลสำเร็จ " + "<br/>" + result.payload.message,
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Success,
                        )
                    return;
                }
                
                Dialog.open(() => {},
                            "อัพเดทข้อมูลไม่สำเร็จ \r\n" + result.payload.statusCode + " \r\n" + result.payload.message,
                            "แจ้งเตือน",
                            buttonType.OK, messageType.Error,
                        )
                return
            }
        }    
    }

    return(
        <PageContainer>
            {/* Page title */}
            <div className="root_title">
                <h4>ตรวจสอบใบสั่งยาจาก HIS</h4>
            </div>
            <hr />

            <div className={ styles.verify_orders }>

                <div 
                    style={{
                        position: "sticky",
                        top: 0,
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px",
                        backgroundColor: "#eee"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            backgroundColor: "#eee"
                        }}
                    >
                        <Textbox
                            id="input-search"
                            placeholder = "ค้นหา HN & ชื่อ ผป. & ชื่อยา"
                            maxLength = { 25 }
                            onChange = {(e: any) => { dispatch(filterPrescription({ search: e.target.value })); setOptionCheck(0); } } //setSearch(e.target.value)}
                            >             
                        </Textbox>

                        <RadioButtonContent id="locationOption">
                            <RadioButtonGroup
                                label=""
                                options={op}
                                onChange={(e) => radioGroupHandler(e)}
                            />
                        </RadioButtonContent>
                    </div>
                   
                    <Button type={ BtnClr.NEXT } bg={true} onClick={ () => { dispatch(getPrescription( { date: cFormatDate(new Date())} ))} }>
                        Refresh
                    </Button>

                </div>

                <div key={hintId} className={ styles.tb_verify }>       
                    <table key={hintId}>
                        <thead>
                            <tr key={"rowHead"}>
                                { 
                                    defaultTableHeader.map( ( head, i ) => (
                                        <th key={ i }> { head } </th>
                                    ))
                                }                         
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                loadingDataPrescription == true ? (
                                    <tr>
                                        <td colSpan={ defaultTableHeader.length } >
                                            <div>Loading data . . . !</div>
                                            <LoadingPage></LoadingPage>
                                        </td>
                                    </tr>
                                ) : dataPrescription == undefined ? (
                                    <tr><td colSpan={ defaultTableHeader.length } ><div>undefined</div></td></tr>                                 
                                ) : dataPrescription.length == 0 || dataPrescription.length == undefined ? (
                                    <tr><td colSpan={ defaultTableHeader.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                                ) : (
                                    dataPrescription.map( ( data: IVerifyDataSecuillAPI, i: number ) => (
                                        // eslint-disable-next-line react-hooks/rules-of-hooks
                                        <tr key={ i } style={{color:`${data.f_status == 2 && "Red"}`}}>
                                            <td className="">
                                                {
                                                    data.f_tomachineno == "0"
                                                    ?
                                                    <div><button className={styles.en_verify} onClick={ () => handleOnClick(data) }>{"Verify"}</button></div>
                                                    :
                                                    <div><button className={data.f_tomachineno =="2" ? styles.ds_proud : styles.ds_verify } onClick={ () => handleOnClick(data) }>{ data.f_tomachineno == "0" ? "Verify" :  data.f_tomachineno == "2" ? "PROUD" : "Secuill" }</button></div>
                                                }
                                            </td>
                                            <td>
                                                <button
                                                    style={{
                                                        fontSize: "0.9em",
                                                        width: "100%",
                                                        height: "auto",
                                                        textWrap: "nowrap",
                                                        backgroundColor: `${ prescriptionAndDispensing(data.pres_status, data.pres_dispensedstatus).bgColor }`,
                                                        color: `#fff`,
                                                    }}
                                                    onClick={ () => { data.pres_dispensedstatus == "W" && handleClickMachineStatus(data) } }
                                                >
                                                    { prescriptionAndDispensing(data.pres_status, data.pres_dispensedstatus).displayTxt }
                                                </button>
                                            </td>
                                            <td>{ data.f_prescriptionno }<p style={{fontSize:"10px"}}>{data.f_offdate != null ? "OFF " + data.f_offdate.replace("T"," ") : ""}</p></td>
                                            <td>{ data.f_hn }</td>
                                            <td>{ data.f_patientname }</td>
                                            <td>{ data.f_orderitemname }</td>
                                            <td>{ data.f_orderqty + " " + data.f_orderunitcode }</td>
                                            <td>{ data.f_frequencydesc }</td>
                                            <td>{ data.f_orderacceptdate.replace("T"," ") }</td>
                                        </tr>
                                    ))
                                )                             
                            }
                        </tbody>
                    </table>       
                </div>       
            </div>

            <PageFooterSpaceContainer>
                
            </PageFooterSpaceContainer>

        </PageContainer>
    )
}

export  default VerifyPrescription;