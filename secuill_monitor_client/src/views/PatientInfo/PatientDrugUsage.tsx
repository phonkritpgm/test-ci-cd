import styled from "styled-components";
import { PageContainer, PageFooterSpaceContainer } from "../../styled"
import { IPatientInfo, IPatientUsage } from "../../interface/iPatient";
import { useSelector } from "react-redux";

const PatientContainer = styled.div`
    padding: 10px 20px;
`;

const PatientHeader = styled.div`
    padding: 10px;
    position: sticky; 
    top: 0;
    background-color: rgba(255,255,255,1);
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 5px 20px;
    box-shadow: 0 6px 6px -6px #222;

    & p{
        font-size: var(--font-size-md);
        color: inherit;
    }
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
        padding: 0 0.8em;
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
            padding: 0.5em 0.8em;
        }
    }

    td:first-child{
        border-radius: 20px 0 0 20px;
    }

    td:last-child {
        border-radius: 0 20px 20px 0;
    }

`;

const ColumnCenter = styled.div`
    vertical-align: middle;
    align-items: center;
`;

const TagStatusDispensing = styled.div`
    font-size: var(--font-size-xsm);
    font-weight: 500;
    background-color: ${ props => ( props.color ) } ;
    border-radius: 10px;
    color: #fff ;
    text-align: center;
    width: fit-content;
    padding: 2px 10px;
    
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

const PatientDrugUsage = (props:{data:IPatientInfo}) => {
    const dataPatientUsage : IPatientUsage[] = useSelector((state: any) => state.pat.dataPatientUsage.data);
    return(
        <PageContainer>
            <PatientHeader>
                <p>HN: {props.data.pat_hn}</p>
                <p>Patient: {props.data.pat_name}</p>
                <p>Ward: {props.data.ward_name}</p>
            </PatientHeader>
            
            <PatientContainer>
                <TablePatientLists>
                    <TableTHeader>
                        <tr>
                            <th>สถานะจ่ายยา</th>
                            <th>วันที่</th>
                            <th>เลขที่จ่ายยา</th>
                            <th>ชื่อยา</th>                      
                            <th>จำนวน</th>
                            <th>วิธีใช้</th>
                        </tr>
                    </TableTHeader>
                    <TableTBody>
                        {
                            dataPatientUsage.length == 0
                            ?
                            <tr>
                                <td colSpan={6} style={{textAlign:"center"}}>
                                    <div>ไม่พบข้อมูล</div>
                                </td>
                            </tr>
                            :
                            dataPatientUsage.map((data:IPatientUsage) => (
                                <tr>
                                    <td>
                                        <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: "5px",
                                        }}>
                                            {
                                                data.type == "ver" && (
                                                    <SpanType
                                                        color={"var(--st-success)"}
                                                    >
                                                        v
                                                    </SpanType>
                                                )
                                            }
                                            {
                                                data.type == "free" && (
                                                    <SpanType
                                                        color={"var(--st-warning)"}
                                                    >
                                                        f
                                                    </SpanType>
                                                )
                                            }
                                            <TagStatusDispensing 
                                                color={data.pres_dispensedstatus == "C" ? "var(--st-success)" : "var(--st-warning)"}
                                            >
                                                { data.pres_dispensedstatus == "C" ? "จ่ายยา" : "รอจ่าย" }
                                            </TagStatusDispensing>

                                        </div>
                                    </td>
                                    <td>
                                        { "2024-09-10" }
                                    </td>
                                    <td>
                                        { data.pres_no } 
                                    </td>
                                    <td>
                                        { data.drug_name } 
                                    </td>
                                    <td className={ ColumnCenter }>
                                        { data.pres_orderqty }
                                    </td>
                                    <td>
                                        { data.pres_noteprocessing }
                                    </td>
                                </tr>
                            ))
                        }                      
                    </TableTBody>
                </TablePatientLists>
            </PatientContainer>      

            <PageFooterSpaceContainer>

            </PageFooterSpaceContainer>
        </PageContainer>
    )
}

export default PatientDrugUsage;