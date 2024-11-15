import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from "react-router-dom";
import Button, { BtnClr } from '../../components/ToolsComp/button/Button/Button';
import DatetimePicker from '../../components/ToolsComp/input/DatetimePicker/DatetimePicker';
import { cFormatDate } from '../../helper/convertDateForm';

import DisplayTableDispensing from '../_TableViewData/DisplayTableDispensing';
import DisplayTableFreeDispensing from '../_TableViewData/DisplayTableFreeDispensing';
import DisplayTableRefill from '../_TableViewData/DisplayTableRefill';
import { getDispensingPrescription, getFreeDispensing, getRefill } from "../../store/slices/dispensingViewSlice";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { PageContainer } from '../../styled';

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
    margin: 10px;
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

const FooterSpaceContainer = styled.p`
    width: 100%;
    height: 10vh;
`;

// https://codesandbox.io/p/sandbox/react-table-rowspan-oq32go?file=%2Fsrc%2FApp.tsx%3A2%2C51
const DispenseView = () => {
    interface IMenuEventType{
        txtTitle: string,
        eventName: string,
        menuName: string,
        JSXMenu: JSX.Element,
        funcDispatch: any,
    }
    const menuList: IMenuEventType[] = [
        {
            txtTitle: "ข้อมูลใบสั่งยา ( Prescription )",
            eventName: "Dispensing",
            menuName: "หยิบยาตามใบสั่งยา",
            JSXMenu: <DisplayTableDispensing />,
            funcDispatch: (s: string, e: string) => dispatch(getDispensingPrescription({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "ข้อมูลหยิบยาไม่ระบุใบสั่งยา ( Free Dispensing )",
            eventName: "FreeDispensing",
            menuName: "หยิบยาไม่ระบุใบสั่งยา",
            JSXMenu: <DisplayTableFreeDispensing />,
            funcDispatch: (s: string, e: string) => dispatch(getFreeDispensing({ startDate: s, endDate: e })),
        },
        {
            txtTitle: "ข้อมูลเติมยา ( ReFill Drug )",
            eventName: "RefillDrug",
            menuName: "เติมยา",
            JSXMenu: <DisplayTableRefill />,
            funcDispatch: (s: string, e: string) => dispatch(getRefill({ startDate: s, endDate: e })),
        },
    ]

    const [startDate, setStartDate] =  useState<string>(cFormatDate(new Date())); // free and dispense : "2023-02-16", refill : "2022-09-08"
    const [endDate, setEndDate] =  useState<string>(cFormatDate(new Date()));

    const [ myViewObj, setMyViewObj ] = useState<IMenuEventType>(menuList[0]);
    const [ reload, setReload ] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const location = useLocation();

    const handleOnClick = useCallback((view: string) =>{
        // add page name to url params
        navigate("/" + "DispenseView" + '/' + view)
        // change state event set element
        // set page name to set color button active
        const obj: IMenuEventType = filterMenuDisplay(view);
        obj.funcDispatch(startDate,endDate)
        setMyViewObj(obj);
    }, [])
    
    function currentViewReload(loc: string){
        for (let index = 0; index < menuList.length; index++) {
            const menu: IMenuEventType = menuList[index];
            if (loc.includes('/' + menu)) {
                handleOnClick(menu.eventName);
                setReload(true);
                return;
            }
        }
        handleOnClick("Dispensing");
    }

    function filterMenuDisplay(viewKey: string): IMenuEventType {
        const menu: IMenuEventType[] = menuList.filter((menuFilter: IMenuEventType) => menuFilter.eventName === viewKey);
        return menu[0];
    }
    
    // on click view data from date picker selected
    const onClickView = async(myViewObj: IMenuEventType) =>{
        myViewObj.funcDispatch(startDate, endDate )
    }

    useEffect( () => {
        if(reload == false){
            currentViewReload(location.pathname);
        }
    }, [])

    return(
        <PageContainer>

            {/* Page title */}
            <div className="root_title">
                <h4>ข้อมูลเบิกจ่ายยา</h4>
            </div>
            <hr />
            <TabMenuView>
                {
                    menuList.map((menu: IMenuEventType, i: number) => (
                        <Button key={ "root_ovw_container" + "-" + (i + 1).toString() } type={ myViewObj.eventName == menu.eventName ? BtnClr.ADD : BtnClr.CANCEL } bg={ true } 
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
                    <PText>ตั้งแต่</PText>             
                    <DatetimePicker date={startDate} setDate={setStartDate} />
                    <PText>ถึง</PText>
                    <DatetimePicker  date={endDate} setDate={setEndDate} />   
                    <Button type={ BtnClr.SEARCH } bg={ true } onClick={() => onClickView(myViewObj)} >
                        View
                    </Button> 
                </DateBetweenContent>            
            </DateBetweenContainer>            
            {/* {changeStateView()}      */}
            <TableContainer>
                { myViewObj.JSXMenu } 
            </TableContainer>   

            {/* add footer */}
            <FooterSpaceContainer/>    
        </PageContainer>
    )
}

export default DispenseView;