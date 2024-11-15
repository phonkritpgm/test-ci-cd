import StickerFormat from "./StickerFormat";
import { useRef, useState } from "react";
import styled from "styled-components";
import Button, { BtnClr } from "../../../components/ToolsComp/button/Button/Button";
import { useReactToPrint } from "react-to-print";

const DrugListContainer = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
    grid-gap: 5px;
    padding: 0 1em;
`;

const TablePatientLists = styled.table`
    position: relative;
    // width: 100%;
    display: table;
    border: none;
    border-collapse: separate;
    border-spacing: 0px 5px;
    padding: .5em 2em;
    margin: 0 .2em;
    box-shadow: var(--shadowbox-1);
`;

const TableTHeader = styled.thead`
    & tr{
        & th{
            font-size: var(--font-size-xsm);
            text-align: left;
            padding: 0 15px;
        }
    }
`;

const TableTBody = styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;

    & tr{

        background-color: #fafafa;

        & td{
            font-size: var(--font-size-sm);
            padding: 2.5px 15px;
        }

        .activeRow{
            background-color: silver;
        }
    }

    & tr:nth-child(odd){ background-color: #eeeeee; }

    td:first-child{
        border-radius: 20px 0 0 20px;
    }

    td:last-child {
        border-radius: 0 20px 20px 0;
    }
    
    td:first-child, td:last-child{
        vertical-align: middle;
        text-align: center;
    }

    .text_center{
        vertical-align: middle;
        text-align: center;
    }

`;

const TopControlPrint = styled.div`
    margin: 5px;
    padding: 10px;
    position: sticky; 
    top: 0;
    background-color: rgba(255,255,255,1);
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-shadow: 0 6px 6px -6px #222;
`;

const PrintContentRef = styled.div`
    padding: 0;
    width: 90%;
    height: auto;
    position: relative;
    overflow-y: auto;

    td {
        display: flex;
        flex-direction: row;
        gap: 10px;
        
    }
  
    .page {
        page-break-after: always;
    }

    @page {
      size: portrait;
      margin-top: 0.3in;
      margin-bottom: 0.4in;
      margin-left: 0.4in;
      margin-right: 0.4in;
    }

    @media print {
        overflow-y: hidden;
        // display: flex;
        // justify-content: center;
        // align-items: center;

        thead {display: table-header-group;} 
        tfoot {display: table-footer-group;}

        td {
            display: block;
            flex-direction: column;
        }
        
        button {display: none;}    
    }
`;

// const ButtonVW  = styled.button<any>`
//     padding: 2px 5px;
//     font-size: 0.8em;
//     border-radius: 8px;
//     border: solid 1.5px ${ (props) =>  props.color == "ex" ? "#3498db" : "#cf0f0f" };
//     color: ${ (props) =>  props.color == "ex" ? "#3498db" : "#cf0f0f" };
//     cursor: pointer;
//     margin: 0 5px;
// `;

const dataTest = [
    {
        no: 1,
        drugCode: "ONDAN",
        drugName: "ONDANSETRON  8 MG/4 ML INJ (Onsia)",
        min: 4,
        max: 8,
        qty: 5,
        diff: 3,
        lofExp: "",
        note: "",
    },
    {
        no: 2,
        drugCode: "FUROS",
        drugName: "FUROSEMIDE  20 MG/2 ML  INJECTION",
        min: 4,
        max: 17,
        qty: 15,
        diff: 2,
        lofExp: "",
        note: "",
    },
    {
        no: 3,
        drugCode: "DEXAM",
        drugName: "DEXAMETHASONE  INJ  4 MG/ML; 1 ML",
        min: 4,
        max: 10,
        qty: 7,
        diff: 3,
        lofExp: "5678",
        note: "",
    },
    {
        no: 4,
        drugCode: "hydro",
        drugName: "hydroCORTISONE  INJ  100 MG",
        min: 4,
        max: 10,
        qty: 7,
        diff: 3,
        lofExp: "1234",
        note: "",
    },
    {
        no: 5,
        drugCode: "ONDAN",
        drugName: "ONDANSETRON INJ 8 MG (2 MG/ML; 4 ML) ",
        min: 4,
        max: 10,
        qty: 7,
        diff: 3,
        lofExp: "",
        note: "",
    },
    {
        no: 6,
        drugCode: "PIPER",
        drugName: "PIPERACILLIN 4 GM + TAZOBACTAM 500 MG  INJ",
        min: 4,
        max: 10,
        qty: 7,
        diff: 3,
        lofExp: "",
        note: "",
    }
]

const DrugToPrintSticker = () => {
    const [ objDrugSelected, setObjDrugSelected ] = useState<any>([]);
    const componentRef = useRef<React.ReactInstance | any | null>(null);

    const handleCheckAllCheckboxHeader = (e: boolean) => {
        const tbody = document.querySelectorAll(TableTBody); 
        const tr = tbody[0].children;

        let tempData: Array<object> =  [];
        for (let index = 0; index < tr.length; index++) {
            const element: any = tr[index].querySelectorAll("input[type='checkbox']");
            element[0].checked = e;           
            // find data from main data
            const dataNumber = tr[index].getAttribute("data-number");
            const resultData: any = dataTest.filter( (d: any) =>  d.no == dataNumber );
            
            // add handle to check object
            if(e) tempData = [...tempData, resultData[0]]
        }

        setObjDrugSelected(tempData);

    }

    const handleChangeValue = (eVal: boolean, data: any) => { 
        if(eVal){
            // add data
            setObjDrugSelected([...objDrugSelected, data ]);
            return;
        }
        //  delete object index
        const result = objDrugSelected.filter( (d: any) => d.no !== data.no )
        setObjDrugSelected(result);
        
    }

    const handlePrintServer = () => {
        setTimeout(() => {
            handlePrint();
        }, 200); 
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    // // method to jump to the desired element by using the element's id
    // const jumpToReleventDiv = (id) => {
    //     const releventDiv = document.getElementById(id);
    //     // behavior: "smooth" parameter for smooth movement
    //     releventDiv.scrollIntoView({behavior: "smooth"});
    // }

    return(
        <DrugListContainer>
            <TopControlPrint>
                <Button type={ BtnClr.DELETE } bg={ true } onClick={() => {handlePrintServer()}} >
                    Print Sticker
                </Button>
            </TopControlPrint>
            <PrintContentRef ref={componentRef}>
                <table className="page-table">
                    <thead>
                        <tr><th></th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {/* use page break */}
                                {
                                    objDrugSelected && 
                                    objDrugSelected.map( (data: any) => (
                                        <div className="page" style={{pageBreakAfter: "always"}}>
                                            <StickerFormat
                                                title="เติมยา "
                                                drugName={ data.drugName }
                                                description={ `จำนวนที่ต้องนำไปเติม : ${ data.qty }` }
                                                barcode={ data.drugCode }
                                            />
                                        </div>
                                        
                                    ))               
                                }
                            </td>
                        </tr>                         
                    </tbody>
                    <tfoot>
                        <tr><td></td></tr>
                    </tfoot>
                </table>         
            </PrintContentRef>

            <TablePatientLists>
                <TableTHeader>
                    <tr>              
                        <th>
                            <input 
                                style={{ width: '.8rem', height: '.8rem', marginTop: '0.2rem' }} 
                                type="checkbox" name="" id="" 
                                onChange={ (e) => handleCheckAllCheckboxHeader(e.currentTarget.checked) }
                            />
                        </th>
                        <th>
                            ชื่อยา
                        </th>
                        <th>
                            จำนานยา
                        </th>
                        <th>
                            
                        </th>
                    </tr>
                </TableTHeader>
                <TableTBody>
                    {
                        dataTest.map((data: any, i: number) => (
                            <tr data-number={data.no}>
                                <td>
                                    <input style={{ width: '.8rem', height: '.8rem', marginTop: '0.2rem' }} 
                                        type="checkbox" 
                                        onChange={ (e) => { handleChangeValue(e.currentTarget.checked, data) } } 
                                        name="checkbox" 
                                        id={ "checkbox-" + i.toString() } 
                                    />
                                </td>
                                <td>
                                    { data.drugName }
                                </td>   
                                <td className="text_center">
                                    { data.qty }
                                </td>
                                <td>
                                    {/* {} */}
                                    {/* <ButtonVW color={"ex"} onClick={() => { handleTriggerPrint(data, false); } }>ตัวอ่ยาง</ButtonVW>
                                    <ButtonVW onClick={() => { handleTriggerPrint(data, true); } }>พิมพ์</ButtonVW> */}
                                </td>             
                            </tr>
                        ))
                    }
                </TableTBody>
            </TablePatientLists>

        </DrugListContainer>
    )
}

export default DrugToPrintSticker;