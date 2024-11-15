import React, { useEffect, useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BtnClr } from '../../components/ToolsComp/button/Button/Button';
import { cFormatDate } from '../../helper/convertDateForm';
import Dialog, { buttonType, messageType } from '../../components/Popups/Dialog/Dialog';
import { FilterSelectorContainer, PageContainer, PageFooterSpaceContainer, SelectOptionType, SelectOptionValues } from '../../styled';

// table data and dispatch to slice
import DisplayTableDispensing from '../_TableViewData/DisplayTableDispensing';
import DisplayTableFreeDispensing from '../_TableViewData/DisplayTableFreeDispensing';
import DisplayTableRefill from '../_TableViewData/DisplayTableRefill';
import DisplayAmountDrugRefill from '../_TableViewData/DisplayAmountDrugRefill';
import DisplayTableDrugUsage from '../_TableViewData/DisplayTableDrugUsage';
import DisplayTableLotExp from '../_TableViewData/DisplayTableLotExp';

// dispatch data api from slice store
import { getDispensingPrescription, getFreeDispensing, getRefill } from "../../store/slices/dispensingViewSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import DatetimePicker from '../../components/ToolsComp/input/DatetimePicker/DatetimePicker';

// component scop to print from react-to-print
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { ComponentToPrint } from './ClassComponentToPrint';

// popup display drug to print sticker
import PopupInfoChild from '../../components/Popups/PopupInfoChild/PopupInfoChild';
import DrugToPrintSticker from './StickerDrugToPrint';

// report header design
import { FunctionalReportHeader } from './ReportHeader';
import { filterReportDrugExp, filterReportDrugRefill, getReportDrugExp, getReportDrugRefill, getReportSummaryPick } from '../../store/slices/reportSlice';
import RadioButtonGroup from '../../components/ToolsComp/radioButton/ReadioButtonGroup';


const TabMenuView = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 5px;
`;

const TableContainer = styled.div`
    position: relative;
    // margin: 10px;
`;

const DateBetweenContainer = styled.div`
    position: relative;
    width: 100%;
    padding: 10px 0;
`;

const DateBetweenContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    padding: 0 10px;
`;

const PText = styled.p`
    font-size: var(--font-size-sm);
`;

const RadioButtonContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    padding: 0 10px;
`;

// https://codesandbox.io/p/sandbox/react-table-rowspan-oq32go?file=%2Fsrc%2FApp.tsx%3A2%2C51
const Reports = () => {

    const [ startDate, setStartDate ] =  useState<string>(cFormatDate(new Date()));
    const [ endDate, setEndDate ] =  useState<string>(cFormatDate(new Date()));
    const [ visibleDialog1, setVisibleDialog1 ] = useState(false);

    enum checkedDrugToRefill {SHOW_ALL = "SHOW_ALL", SHOW_TO_REFILL = "SHOW_TO_REFILL"}
    const [ optionCheckedDrugToRefill, setOptionCheckedDrugToRefill ] = useState<checkedDrugToRefill>(checkedDrugToRefill.SHOW_TO_REFILL);
    enum checkedLotExp {SHOW_ALL = "SHOW_ALL", SHOW_TO_EXP = "SHOW_TO_EXP"}
    const [ optionCheckedLotExp, setOptionCheckedLotExp ] = useState<checkedLotExp>(checkedLotExp.SHOW_TO_EXP);

    interface IMenuEventType{
        txtTitle: string,
        eventName: string,
        menuName: string,
        JSXMenu: JSX.Element,
        JSXHeader: (props: any) => JSX.Element,
        headerContent: { description: string, headerTitle: string },
        funcDispatch: any,
    }
    const menuList: IMenuEventType[] = [
        {
            txtTitle: "รายงานหยิบยาตามใบสั่งยา ( Prescription )",
            eventName: "Dispensing",
            menuName: "รายงานหยิบยาตามใบสั่งยา",
            JSXMenu: <DisplayTableDispensing />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: `รายงานวันที่ ${ startDate } - ${ endDate }`, headerTitle: "รายงานหยิบยาตามใบสั่งยา" },
            funcDispatch: (s: string, e: string) => dispatch(getDispensingPrescription({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "รายงานหยิบยาไม่ระบุใบสั่งยา ( Free Dispensing )",
            eventName: "FreeDispensing",
            menuName: "รายงานหยิบยาไม่ระบุใบสั่งยา",
            JSXMenu: <DisplayTableFreeDispensing />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: `รายงานวันที่ ${ startDate } - ${ endDate }`, headerTitle: "รายงานหยิบยาไม่ระบุใบสั่งยา" },
            funcDispatch: (s: string, e: string) => dispatch(getFreeDispensing({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "ข้อมูลการเติมยา ( ReFill Drug )",
            eventName: "HistoryRefillDrug",
            menuName: "ข้อมูลการเติมยา",
            JSXMenu: <DisplayTableRefill />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: `รายงานวันที่ ${ startDate } - ${ endDate }`, headerTitle: "รายงานการเติมยา" },
            funcDispatch: (s: string, e: string) => dispatch(getRefill({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "รายงานยาที่ต้องนำไปเติม ( Refill drug to machine )",
            eventName: "ReportRefill",
            menuName: "รายงานยาที่ต้องนำไปเติม",
            JSXMenu: <DisplayAmountDrugRefill />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: "", headerTitle: "รายงานยาที่ต้องนำไปเติม" },
            funcDispatch: () => dispatch(getReportDrugRefill()),
        },
        {
            txtTitle: "รายงานการใช้ยา ( Drug usage )",
            eventName: "DrugUsage",
            menuName: "รายงานการใช้ยา",
            JSXMenu: <DisplayTableDrugUsage />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: `รายงานวันที่ ${ startDate } - ${ endDate }` , headerTitle: "รายงานการใช้ยา" },
            funcDispatch: (s: string, e: string) => dispatch(getReportSummaryPick({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "รายงานวันหมดอายุของยา ( Lot number Expire )",
            eventName: "LotNumberExp",
            menuName: "รายงานวันหมดอายุของยา",
            JSXMenu: <DisplayTableLotExp />,
            JSXHeader: (props: any) => FunctionalReportHeader({ description1: props.description1, title: props.title }),
            headerContent: { description: "", headerTitle: "รายงานวันหมดอายุของยา" },
            funcDispatch: () => dispatch(getReportDrugExp()),
        },
    ]

    const radioOptionDrugToRefill: any = {       
        ReportRefill: [
            {
                label: "ยาทั้งหมด",
                name: checkedDrugToRefill.SHOW_ALL,
                color: "var(--primary-400)",
                checked: optionCheckedDrugToRefill == checkedDrugToRefill.SHOW_ALL ? true : false,
            },
            {
                label: "ยาที่ต้องนำไปเติม",
                name: checkedDrugToRefill.SHOW_TO_REFILL,
                color: "var(--green-500)",
                checked: optionCheckedDrugToRefill == checkedDrugToRefill.SHOW_TO_REFILL ? true : false,
            },
        ],
        LotNumberExp: [
            {
                label: "Lot.ทั้งหมด",
                name: checkedLotExp.SHOW_ALL,
                color: "var(--primary-400)",
                checked: optionCheckedLotExp == checkedLotExp.SHOW_ALL ? true : false,
            },
            {
                label: "Lot.ใกล้หมดอายุ",
                name: checkedLotExp.SHOW_TO_EXP,
                color: "var(--green-500)",
                checked: optionCheckedLotExp == checkedLotExp.SHOW_TO_EXP ? true : false,
            },
        ]          
    }

    const [ myViewObj, setMyViewObj ] = useState<IMenuEventType>(menuList[0]);
    const [ reload, setReload ] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = useCallback( async (view: string) => {
        // add page name to url params
        navigate("/" + "Reports" + '/' + view)
        // change state event set element
        // set page name to set color button active
        const obj: IMenuEventType = filterMenuDisplay(view);
        
        await obj.funcDispatch(startDate, endDate );
        setMyViewObj(obj);

        // set filter drug tot refill and  lot number exp
        if(view == menuList[3].eventName){
            await dispatch(filterReportDrugRefill( { filterStatus: optionCheckedDrugToRefill } ))
        } else if(view == menuList[5].eventName){
            await dispatch(filterReportDrugExp( { filterStatus: optionCheckedLotExp } ))
        }
    }, [])
    
    function currentViewReload(loc: string){
        for (let index = 0; index < menuList.length; index++) {
            const menu: IMenuEventType = menuList[index];
                
            if (loc.includes('/' + menu.eventName)) {
              
                handleOnClick(menu.eventName);
                setReload(true);
                return;
            }
        }
        handleOnClick(menuList[0].eventName);
        // set first reload data fetch api
    }

    function filterMenuDisplay(viewKey: string): IMenuEventType {
        const menu: IMenuEventType[] = menuList.filter((menuFilter: IMenuEventType) => menuFilter.eventName === viewKey);
        return menu[0];
    }
    
    // on click view data from date picker selected
    const onClickView = async(myViewObj: IMenuEventType) =>{
        myViewObj.headerContent.description = `วันที่ ${ startDate } - ${ endDate }`
        myViewObj.funcDispatch(startDate, endDate )
    }

    // ----------------------------------- [ react-to-print ] -----------------------------------------
    // state await loading to print page
    const [ stateToPrint, setStateToPrint ] = useState<any>({ isLoading: false, text: "Print and save to pdf" });
    const componentRefContentPrint = useRef<React.ReactInstance | any | null>(null);

    //  method print
    const handleAfterPrint = () => {
        // cconsole.log("`onAfterPrint` called"); // tslint:disable-line no-console
    };

    const handleBeforePrint = () => {
        // cconsole.log("`onBeforePrint` called"); // tslint:disable-line no-console
    };

    const handleOnBeforeGetContent = () => {
        // cconsole.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
        setStateToPrint({ text: "Loading . . .", isLoading: true });

        return new Promise<any>((resolve) => {
            setTimeout(() => {
                resolve(
                    setStateToPrint({ text: "Print and save to pdf", isLoading: false },
                )
                );
            }, 2000);
        });
    };

    // const setComponentRef = (ref: any) => {
    //     componentRefContentPrint.current = ref;
    // };

    const reactToPrintContent = () => {
        return componentRefContentPrint.current;
    };
    // ----------------------------------- [ react-to-print ] -----------------------------------------

    // Option radio button handler change
    function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if(myViewObj.eventName == menuList[3].eventName){
            setOptionCheckedDrugToRefill(event.target.name == checkedDrugToRefill.SHOW_ALL ? checkedDrugToRefill.SHOW_ALL : checkedDrugToRefill.SHOW_TO_REFILL);
            dispatch(filterReportDrugRefill( { filterStatus: event.target.name } ))
        } else if(myViewObj.eventName == menuList[5].eventName){
            setOptionCheckedLotExp(event.target.name == checkedLotExp.SHOW_ALL ? checkedLotExp.SHOW_ALL : checkedLotExp.SHOW_TO_EXP);
            dispatch(filterReportDrugExp( { filterStatus: event.target.name } ))
        }
    }

    // filter report ward patient drug
    // const filterReport = (reportType: string, filter: object) => {
    //     // dispatch new data filter
    // }

    useEffect( () => {
        if(reload == false){
            currentViewReload(location.pathname);
        }
    }, [startDate,endDate])

    return(
        <PageContainer key={uuidv4()}>

            {/* Page title */}
            <div className="root_title">
                <h4>รายงาน</h4>
            </div>
            <hr />
            <TabMenuView>
                {
                    menuList.map((menu: IMenuEventType) => (
                        <Button key={ PageContainer.name + "-" + uuidv4() } type={ myViewObj.eventName == menu.eventName ? BtnClr.ADD : BtnClr.CANCEL } bg={ true } 
                            onClick={ () => handleOnClick(menu.eventName) } 
                        >
                            { menu.menuName }
                        </Button>
                    ))
                }
            </TabMenuView>
            <div className="root_title" style={{width: "100%", padding: "10px", backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
                <h5 style={{color: "green"}}>{myViewObj.txtTitle}</h5>
            </div>
            {/* selected date */}
            <DateBetweenContainer>
                <DateBetweenContent>
                    {
                        myViewObj.eventName != menuList[3].eventName && myViewObj.eventName != menuList[5].eventName && (
                            <React.Fragment>
                                <PText >ตั้งแต่</PText>             
                                <DatetimePicker date={startDate} setDate={(value) => { setStartDate(value) }} />
                                <PText>ถึง</PText>
                                <DatetimePicker  date={endDate} setDate={(value) => { setEndDate(value) }} />   
                                <Button type={ BtnClr.SEARCH } bg={ true } onClick={() => onClickView(myViewObj)} >
                                    <span>&#128269;</span> View
                                </Button>
                            </React.Fragment>
                        )
                        
                    }

                    {
                        radioOptionDrugToRefill[myViewObj.eventName] && (
                            <RadioButtonContent>
                                <RadioButtonGroup
                                    label=""
                                    options={radioOptionDrugToRefill[myViewObj.eventName]}
                                    onChange={(e) => radioGroupHandler(e)}
                                />
                            </RadioButtonContent>
                        )
                    }
                               
                    {/* button to print */}
                    <ReactToPrint
                        content={reactToPrintContent}
                        documentTitle={myViewObj.eventName + "-" + cFormatDate(new Date())}
                        onAfterPrint={handleAfterPrint}
                        onBeforeGetContent={handleOnBeforeGetContent}
                        onBeforePrint={handleBeforePrint}
                        removeAfterPrint
                        >
                        <PrintContextConsumer>
                            {({ handlePrint }) => (
                            <Button type={ BtnClr.NEXT } bg={ true } onClick={handlePrint}>
                                {
                                    stateToPrint.isLoading ? (
                                        stateToPrint.text
                                    ) : (
                                        stateToPrint.text
                                    )
                                }
                            </Button>
                            )}
                        </PrintContextConsumer>
                    </ReactToPrint>

                    <Button type={ BtnClr.SEARCH } bg={ true } onClick={() => Dialog.open(() => {}, "ยังไม่เปิดใช้งานฟังก์ชันนี้", "แจ้งเพื่อทราบ ^^", buttonType.OK, messageType.Info) } >
                        Save to XLSX
                    </Button>
                    
                    {
                        /* https://codesandbox.io/p/sandbox/printing-stickers-d8svq?file=%2Fsrc%2FApp.js%3A24%2C39 */
                        myViewObj.eventName == menuList[3].eventName && (
                            <Button type={ BtnClr.DELETE } bg={ true } onClick={() => setVisibleDialog1(!visibleDialog1)} >
                                Print Sticker ( นำไปจัดยา )
                            </Button>
                        )
                    }                

                </DateBetweenContent>
            </DateBetweenContainer>

            <FilterSelectorContainer>
                {/* select ward, patient | drug */}
                {/* combo box selected */}
                <label style={{ fontSize: "0.8em" }} htmlFor="selectWard">Ward:</label>
                <SelectOptionType id="selectWard">
                    <SelectOptionValues value="111111">111111</SelectOptionValues>
                    <SelectOptionValues value="222222">222222</SelectOptionValues>
                    <SelectOptionValues value="333333">333333</SelectOptionValues>
                    <SelectOptionValues value="444444">444444</SelectOptionValues>
                </SelectOptionType>

                <label style={{ fontSize: "0.8em" }} htmlFor="selectPatient">Patient:</label>
                <SelectOptionType id="selectPatient">
                    <SelectOptionValues value="111111">111111</SelectOptionValues>
                    <SelectOptionValues value="222222">222222</SelectOptionValues>
                    <SelectOptionValues value="333333">333333</SelectOptionValues>
                    <SelectOptionValues value="444444">444444</SelectOptionValues>
                </SelectOptionType>

                <label style={{ fontSize: "0.8em" }} htmlFor="selectDrug">Drug:</label>
                <SelectOptionType id="selectDrug">
                    <SelectOptionValues value="111111">111111</SelectOptionValues>
                    <SelectOptionValues value="222222">222222</SelectOptionValues>
                    <SelectOptionValues value="333333">333333</SelectOptionValues>
                    <SelectOptionValues value="444444">444444</SelectOptionValues>
                </SelectOptionType>
            </FilterSelectorContainer>

            {/* {changeStateView()}      */}
            <ComponentToPrint 
                ref={componentRefContentPrint} 
                text={stateToPrint.text} 
                header={ myViewObj.JSXHeader({ description1: myViewObj.headerContent.description, title: myViewObj.headerContent.headerTitle }) }
            >
                <TableContainer>
                    { myViewObj.JSXMenu } 
                </TableContainer>         
            </ComponentToPrint>
            
            {/* add footer */}
            <PageFooterSpaceContainer/>

            <PopupInfoChild
                onClose={(e) => {setVisibleDialog1(e)}}
                show={visibleDialog1}
                bgClose={false}
                title={"Print sticker ( Barcode & จำนวนยาที่ต้องนำไปจัด )"}
            >
                <DrugToPrintSticker />
            </PopupInfoChild>

        </PageContainer>
    )
}

export default Reports;