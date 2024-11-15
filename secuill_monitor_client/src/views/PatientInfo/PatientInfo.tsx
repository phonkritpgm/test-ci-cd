import styled from "styled-components";
import { PageContainer, PageFooterSpaceContainer } from "../../styled"
import PopupInfoChild from "../../components/Popups/PopupInfoChild/PopupInfoChild";
import PatientDrugUsage from "./PatientDrugUsage";
import { useEffect, useState } from "react";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { IPatientInfo } from "../../interface/iPatient";
import { AppDispatch } from "../../store/store";
import {  getPatient , filterPatient, getPatientUsage } from "../../store/slices/patientSlice";

const TopControlContainer = styled.div`
    width: 100%;
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: ;nowrap;
    gap: 10px;
`;

const PatientContainer = styled.div`
    padding: 10px 20px;
`;

const TablePatientLists = styled.table`
    position: relative;
    // width: 100%;
    display: table;
    border: none;
    border-collapse: separate;
    border-spacing: 0px 3px;
`;

const TableTHeader = styled.thead`

    & tr{
        & th{
            font-size: var(--font-size-sm);
            text-align: left;
        }
    }

    th{
        padding: 0 1em;
    }

`;

const TableTBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;

    & tr{
        & td{
            font-size: var(--font-size-sm);
            background-color: rgba(100,100,100,0.1);
            border-bottom: solid 1px rgba(100,100,100,0.3);
            padding: 0.5em 0.5em;
        }
        & td:last-child{
            padding-right: 10px;
        } 
    }

    td:first-child{
        border-radius: 20px 0 0 20px;
    }

    td:last-child {
        border-radius: 0 20px 20px 0;
    }

    .text_center{
        display: flex;
        justify-content: center;
        align-items: center;
    }

`;

const TagText = styled.div<any>`
    font-size: ${ props => ( props.fontSize ? props.fontSize : "var(--font-size-xsm)" ) } ;
    font-weight: 500;
    background-color: ${ props => ( props.color ) } ;
    border-radius: 10px;
    color: #fff ;
    text-align: center;
    width: fit-content;
    padding: 2px 10px;
    cursor: pointer;

    &:hover{
        filter: brightness(90%);
    }
`;

const SpanType = styled.span<any>`
    width: 1.5em;
    height: 1.5em;
    font-weight: 600;
    border-radius: 50%;
    background-color: ${ props => ( props.color ) } ;
    color: #fff;
    padding: 2px;
    font-size: .8em;
    text-align: center;
`;

const PatientInfo = () => {

    const [ visiblePopup, setVisiblePopup ] = useState(false)
    const [selectData,setSelectData] = useState<IPatientInfo>({pat_hn:"",pat_an:"",pat_name:"",pat_wardcode:"",ward_name:"",pat_dischargeddate:undefined, countVer:0,countFree:0});
    const dataPatientInfo : IPatientInfo[] = useSelector((state: any) => state.pat.dataPatientInfo.data);
    const dispatch = useDispatch<AppDispatch>();
 

    const handleSearchPatient = (target: HTMLElement) => {      
        const parentNode: HTMLElement | null = target.parentElement;
        const input: NodeListOf<Element> | any = parentNode?.querySelectorAll("input[id=search]");
        // get value input in parent node : get from input id#
        //if( input[0].value == "" ) return;
        dispatch(filterPatient({search:input[0].value}));
        // call api get data patient from search
        // ... code.
    }
    
    const handleClickViewPatient = (data: IPatientInfo) => {
        // open popup display patient usage drug info
        setVisiblePopup(!visiblePopup);
        //  set data
        setSelectData(data);
        dispatch(getPatientUsage(data.pat_hn));
    }

    useEffect(()=>{
        dispatch(getPatient());  
    },[])
    return(
        <PageContainer>

            <div className="root_title">
                <h4>ข้อมูลผู้ป่วย</h4>
            </div>
            <hr />
         
            <TopControlContainer>
                <Textbox key={ "textbox-search" } type="text" name="search" id="search" placeholder="HN | AN" />
                <Button key={ "commit-search" } bg={true} type={BtnClr.SEARCH} onClick={(e) => handleSearchPatient(e.target)}>ค้นหา</Button>
            </TopControlContainer>
        
            <PatientContainer>
                <TablePatientLists>
                    <TableTHeader>
                        <tr>
                            <th>HN</th>
                            <th>AN</th>
                            <th>ชื่อ ผป.</th>
                            <th>สถานะ</th>
                            <th>วอร์ด</th>
                            <th>ข้อมูล</th>
                            <th></th>
                        </tr>
                    </TableTHeader>
                    <TableTBody >
                        {
                            dataPatientInfo == undefined ? (
                                <div>Data undefined!</div>
                            ) : dataPatientInfo.length == 0 || dataPatientInfo.length == undefined ? (
                                <div>Data notfound!</div>
                            ) : (
                                dataPatientInfo.map((data: IPatientInfo) => (
                                    <tr key={data.pat_hn}>
                                        <td>
                                            {data.pat_hn}
                                        </td>
                                        <td>
                                            {data.pat_an}
                                        </td>
                                        <td>
                                            {data.pat_name} 
                                        </td>
                                        <td>
                                            <TagText 
                                                color={ data.pat_dischargeddate == null  ? "var(--st-success)" : "var(--st-error)" }
                                                fontSize={"0.8em"}
                                            >
                                                {data.pat_dischargeddate == null  ? "admit" : "discharged"}
                                            </TagText>
                                            
                                        </td>
                                        <td>
                                            {data.ward_name}
                                        </td>
                                        <td className={ "text_center" }>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px",
                                            }}>
                                                <TagText color={ "var(--st-info)" } onClick={() => { handleClickViewPatient(data) }} >
                                                    view
                                                </TagText>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{
                                                    width: "auto",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                }}>
                                                {
                                                    data.countVer > 0 && (
                                                        <SpanType
                                                            color={"var(--st-success)"}
                                                        >
                                                            v
                                                        </SpanType>
                                                    )
                                                }
                                                {
                                                    data.countFree > 0 && (
                                                        <SpanType
                                                            color={"var(--st-warning)"}
                                                        >
                                                            f
                                                        </SpanType>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </TableTBody>
                </TablePatientLists>
            </PatientContainer>

            <PopupInfoChild 
                // key={PatientInfo.name}
                onClose={(e) => setVisiblePopup(e)}
                show={visiblePopup}
                bgClose={true}
                title="ข้อมูลจ่ายยาของผู้ป่วย"
            >
                <PatientDrugUsage data={selectData}  />
            </PopupInfoChild>

            <PageFooterSpaceContainer>

            </PageFooterSpaceContainer>
        </PageContainer>
    )
}

export default PatientInfo;