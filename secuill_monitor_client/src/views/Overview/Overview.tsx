import styles from './Overview.module.css'
import TableDisplayDrugTimeline from '../../components/OtherComp/TableDisplayTimeline/TableDisplayDrugTimeline';
import { useRef, useEffect, useState } from 'react';
import { cFormatDate } from '../../helper/convertDateForm';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {    
            // IInitialAllState,
            getCountDashBoard,
            getDataSummaryPickDrug,
            getDataRefillHeader,
            getDataRefillDetail,
            getDataChartLine,
        } from "../../store/slices/overviewSlice";
import {    IDataCountType, 
            IDataSummaryPick,
            IDataRefillType, 
            IDataRefillDetailType,
            IDataChartType,
        } from '../../interface/overview';

import RechartChartLine from '../../components/ToolsComp/Charts/RechartChartLine';
import { PageContainer, PageFooterSpaceContainer } from '../../styled';
import DatetimePicker from '../../components/ToolsComp/input/DatetimePicker/DatetimePicker';

import styled from 'styled-components';
import Button, { BtnClr } from '../../components/ToolsComp/button/Button/Button';
const TitleContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    padding: 20px 0;

    & h4{
        color: var(--primary-400);
    }
`;

const Overview = () => {

    const ref: any = useRef();
    const dataStateAuthen = useSelector((state: any) => state.auth);
    const dataCount: IDataCountType[] = useSelector((state: any) => state.ovw.dataCountDashBoard.data);
    const dataSummaryPick: IDataSummaryPick[] = useSelector((state: any) => state.ovw.dataSummaryPickDrug.data);
    const dataChartLine: IDataChartType[] = useSelector((state: any) => state.ovw.dataChartLine.data);
    const dataRefillHeader : IDataRefillType[] = useSelector((state: any) => state.ovw.dataRefillHeader.data);

    const [ dateCountPrescription, setDateCountPrescription ] = useState<string>(cFormatDate(new Date()));
    const [ dateCountDrugUsage, setDateCountDrugUsage ] = useState<string>(cFormatDate(new Date()));

    const statusLogin:boolean = dataStateAuthen.statusLogin;
    const dispatch = useDispatch<AppDispatch>();
 
    const handleClickOutside = ( event: any ) => {
        event.target;
        // disable class show drug refill history when click out focus condition
        if( event.target.name != ref.current?.name 
            && event.target.id != "ptime" 
            && event.target.id != "td_drug_fill_time"){
            const fillDrugElement = document.getElementsByClassName(`${ styles.fill_detail_time }`);     
            for (let index = 0; index < fillDrugElement.length; index++) {
                fillDrugElement[index].classList.replace(styles.enable_show_fill, styles.disable_show_fill);          
            }
        }
    };
    
    function loadData(){
        dispatch(getCountDashBoard({ date: cFormatDate(new Date()) }));     
        dispatch(getDataRefillHeader({ startDate: cFormatDate(new Date()) }));       
        dispatch(getDataChartLine({ date: dateCountPrescription }));
        dispatch(getDataSummaryPickDrug({ date: dateCountDrugUsage}));
    }

    const handleDatetimePrescriptionHour = (value: string) => {
        setDateCountPrescription(value);
        dispatch(getDataChartLine({ date: value }))
    }

    const handleDateDrugHour = (value: string) => {
        setDateCountDrugUsage(value);
        dispatch(getDataSummaryPickDrug({ date: value }));
    }

    // first load page 1 time
    useEffect(() => {
        
        // load all data
        if (statusLogin){
            loadData();
        }    

        // timer reload data
        const intervalId = setInterval(() => {
            if (statusLogin){
                loadData();
            }        
        }, 10000);

        // document.addEventListener("click", handleClickOutside, !isComponentVisible);
        document.addEventListener("click", handleClickOutside);

        // out page return remove event
        return () => {         
            clearInterval(intervalId);
            document.removeEventListener(
                "click",
                handleClickOutside
            );         
        };   

    }, [statusLogin, dateCountPrescription, dateCountDrugUsage])

    const handleClickFillTime = async( event: any ) => {
        const id:string = event.target.id
        const date = id.split("|")[0];
        const time = id.split("|")[1];
        const result = await dispatch(getDataRefillDetail({ date: date, time: time}));
        const data:any = result.payload;
        const myData: Array<IDataRefillDetailType>| any  = data.payload;

        const li_date = document.getElementById("li_" + date);
        const divShowDrug = li_date?.getElementsByClassName(`${ styles.fill_detail_time }`)[0];
        const getShowTime = divShowDrug?.getElementsByTagName("p")[0] as HTMLElement;

        const getTableBody = divShowDrug?.getElementsByTagName("tbody")[0] as HTMLElement;
        deleteChildBodyTable(getTableBody);

        if( divShowDrug?.classList.contains(styles.enable_show_fill) && getShowTime.innerText == time ){
            divShowDrug?.classList.replace(styles.enable_show_fill, styles.disable_show_fill);
        } else {
            divShowDrug?.classList.replace(styles.disable_show_fill, styles.enable_show_fill);
            // add table tbody
            addChildBodyTable(getTableBody, myData);
        }
        getShowTime.innerHTML = time;     
    }

    function deleteChildBodyTable(bd: HTMLElement){
        // delete child tbody
        while (bd.firstChild) {
            bd.removeChild(bd.firstChild);
        }
    }

    function addChildBodyTable(bd: HTMLElement, d: Array<IDataRefillDetailType>){
        for (let index = 0; index < d.length; index++) {
            const data: IDataRefillDetailType = d[index];
            // create tr
            const TR = document.createElement("tr");
            TR.accessKey = index.toString();

            const tdRunNumber = document.createElement("td");
            tdRunNumber.className = styles.col_center;
            tdRunNumber.id = "td_drug_fill_time";
            tdRunNumber.innerText = (index + 1).toString();

            // create td 1
            const TD1 = document.createElement("td");
            TD1.className = "";
            TD1.id = "td_drug_fill_time";
            TD1.innerText = data.drugName;
            // create td 2
            const TD2 = document.createElement("td");
            TD2.className = styles.col_center;
            TD1.id = "td_drug_fill_time";
            TD2.innerText = data.refillQty.toString();

            // add tr child > td 1, 2
            TR.appendChild(tdRunNumber);
            TR.appendChild(TD1);
            TR.appendChild(TD2);
            // append body
            bd.appendChild(TR);
        }
    }

    return(      
        <PageContainer>
            {/* Page title */}
            <div className="root_title">
                <h4>ภาพรวมข้อมูล</h4>
            </div>
            <hr />

            {/* box display count order status */}
            <section className={ styles.dispensing }>

                <div className={`${ styles.box_data } ${ styles.color_box1 } `}>
                    <div className={`${styles.box_title} ${styles.flex_center} ${ styles.box1_title_clr1 }`}>
                        <h5>ปริมานใบสั่งยา</h5>
                    </div>
                   <div className={`${styles.box_desc} ${styles.flex_center}`}>
                        <p>{ dataCount == undefined ? ( "undefined" ) : !dataCount[0] ? ( "empty" ) : dataCount[0].countPres }</p>
                   </div>
                </div>

                <div className={`${ styles.box_data } ${ styles.color_box2 } `}>
                    <div className={`${styles.box_title} ${styles.flex_center} ${ styles.box1_title_clr2 }`}>
                        <h5>หยิบยาตามใบสั่ง</h5>
                    </div> 
                    <div className={`${styles.box_desc} ${styles.flex_center}`}>
                        <p>{ dataCount == undefined ? ( "undefined" ) : !dataCount[0] ? ( "empty" ) : dataCount[0].countPickPres }</p>
                   </div>
                </div>

                <div className={`${ styles.box_data } ${ styles.color_box3 } `}>
                    <div className={`${styles.box_title} ${styles.flex_center} ${ styles.box1_title_clr3 }`}>
                        <h5>หยิบยาไม่ระบุใบสั่ง</h5>
                    </div> 
                    <div className={`${styles.box_desc} ${styles.flex_center}`}>
                        <p>{ dataCount == undefined ? ( "undefined" ) : !dataCount[0] ? ( "empty" ) : dataCount[0].countPickFree }</p>
                   </div>
                </div>

                <div className={`${ styles.box_data } ${ styles.color_box4 } `}>
                    <div className={`${styles.box_title} ${styles.flex_center} ${ styles.box1_title_clr4 }`}>
                        <h5>ยกเลิกใบสั่งยา</h5>
                    </div> 
                    <div className={`${styles.box_desc} ${styles.flex_center}`}>
                        <p>{ dataCount == undefined ? ( "undefined" ) : !dataCount[0] ? ( "empty" ) : dataCount[0].countPresCancel }</p>
                   </div>
                </div>
                
            </section>

            {/* math count prescription / hr */}
            <section className={ styles.drug_prescription }>
                <TitleContent>
                    <h4>ช่วงเวลาจำนวนใบสั่งยา : / hr</h4>
                    <DatetimePicker
                        date={ dateCountPrescription }
                        setDate={(value) => handleDatetimePrescriptionHour(value)}
                    />
                    {
                        dateCountPrescription != cFormatDate(new Date()) && 
                        <Button bg={true} type={BtnClr.NEXT} onClick={() => { setDateCountPrescription(cFormatDate(new Date())) }} >Reset</Button>
                    }
                </TitleContent>

                <div className={ styles.drug_prescription_chart }>
                    {/* <ScaleBreaksChart /> */}
                    {/* <LineChart options={lineChartOption(dataState.dataChartLine.data == undefined ? ( [] ) : dataState.dataChartLine.data.length == 0 ? ( [] ) : dataState.dataChartLine.data)} /> */}
                    <RechartChartLine data={dataChartLine}/>
                </div>
            </section>

            {/* math chat dispensing */}
            <section className={ styles.drug_dispensed }>
                <TitleContent>
                    <h4>ช่วงเวลาปริมานการใช้ยา : / hr</h4>
                    <DatetimePicker
                        date={cFormatDate(new Date())}
                        setDate={(value) => handleDateDrugHour(value)}
                    />
                    {
                        dateCountDrugUsage != cFormatDate(new Date()) && 
                        <Button bg={true} type={BtnClr.NEXT} onClick={() => {setDateCountDrugUsage(cFormatDate(new Date()))}} >Reset</Button>
                    }
                </TitleContent>
                
                
                <div className={ styles.display_count_prescription }>
                    <TableDisplayDrugTimeline obj={dataSummaryPick} />
                </div>
            </section>

            {/* fill drug */}
            <section className={ styles.fill_days }>
                <div className="root_title">
                    <h4>ช่วงเวลาการเติมยา ย้อนหลัง 5 วัน</h4>
                </div>
                <div className={ styles.fill_drug }>          
                    {/* show fill time */}
                    { dataRefillHeader == undefined ? (
                        <div>undefined data object .</div>
                    ) : dataRefillHeader.length == 0 ? (
                        <div>Notfound data .</div>
                    ) : (
                        
                        dataRefillHeader.length > 0 &&
                            dataRefillHeader.map((rowDate,i)=>(
                                <li key={i} id={ 'li_' + rowDate.refillDate }>
                                    <div className={ styles.fill_on_day } key={rowDate.refillDate}>
                                        <div className={ styles.fill_day }>
                                            <p>{rowDate.refillDate}</p>
                                        </div>
                                        {rowDate.refillHours.map((hour)=>(
                                            <div className={ styles.fill_time } key={hour.hour}>
                                                <button name={ "fill_time" } ref={ref} id={`${rowDate.refillDate}|${hour.hour}`} onClick={ handleClickFillTime }>{hour.hour}</button>
                                            </div>                      
                                        ))}                
                                    </div>

                                    <div className={`${ styles.fill_detail_time } ${ styles.disable_show_fill }`}>
                                        <div className={ styles.show_select_time }>
                                        <span>เวลา : </span> 
                                        <p id="ptime"></p>
                                        </div>
                                        <div className={ styles.show_fill_drug }>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>ชื่อยา</th>
                                                        <th className={ styles.col_center }>จำนวน</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* code add tr td data . . . in function */}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>                                                         
                                </li>             
                            ))
                    )                 
                    }
                </div>           
            </section>

            <PageFooterSpaceContainer>
                
            </PageFooterSpaceContainer>

        </PageContainer>
    )
}

export default Overview;