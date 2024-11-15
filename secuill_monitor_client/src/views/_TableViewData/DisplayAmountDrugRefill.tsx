import { v4 as uuidv4 } from "uuid";
import TableDisplayHistory from "../../components/OtherComp/TableDisplayHistory/TableDisplayHistory";
import { iReportDrugRefill } from "../../interface/iReport";
import { useSelector } from "react-redux";


const DisplayAmountDrugRefill = () => {
    const dataDrugRefill: iReportDrugRefill[] = useSelector((state: any) => state.report.dataReportRefill.data);
    const columnsName = [
        {
            Header: "No",
            accessor: "no",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "รหัสยา",
            accessor: "drugcode",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "ชื่อยา",
            accessor: "drugname",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "Min",
            accessor: "min",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "Max",
            accessor: "max",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: true, 
        },
        {
            Header: "จำนวน",
            accessor: "qty",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header:"diff",
            accessor:"diff",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header:"LotExp.",
            accessor:"lotexp",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "หมายเหตุ",
            accessor: "note",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: false,
        },
    ]

    // const dataTest = [
    //     {
    //         no: 1,
    //         drugName: "ONDANSETRON  8 MG/4 ML INJ (Onsia)",
    //         min: 4,
    //         max: 8,
    //         qty: 5,
    //         diff: 3,
    //         lofExp: "",
    //         note: "",
    //     },
    //     {
    //         no: 2,
    //         drugName: "FUROSEMIDE  20 MG/2 ML  INJECTION",
    //         min: 4,
    //         max: 17,
    //         qty: 15,
    //         diff: 2,
    //         lofExp: "",
    //         note: "",
    //     },
    //     {
    //         no: 3,
    //         drugName: "DEXAMETHASONE  INJ  4 MG/ML; 1 ML",
    //         min: 4,
    //         max: 10,
    //         qty: 7,
    //         diff: 3,
    //         lofExp: "1234",
    //         note: "",
    //     },
    //     {
    //         no: 3,
    //         drugName: "DEXAMETHASONE  INJ  4 MG/ML; 1 ML",
    //         min: 4,
    //         max: 10,
    //         qty: 7,
    //         diff: 3,
    //         lofExp: "5678",
    //         note: "",
    //     },
    //     {
    //         no: 4,
    //         drugName: "hydroCORTISONE  INJ  100 MG",
    //         min: 4,
    //         max: 10,
    //         qty: 7,
    //         diff: 3,
    //         lofExp: "1234",
    //         note: "",
    //     },
    //     {
    //         no: 5,
    //         drugName: "ONDANSETRON INJ 8 MG (2 MG/ML; 4 ML) ",
    //         min: 4,
    //         max: 10,
    //         qty: 7,
    //         diff: 3,
    //         lofExp: "",
    //         note: "",
    //     },
    //     {
    //         no: 6,
    //         drugName: "PIPERACILLIN 4 GM + TAZOBACTAM 500 MG  INJ",
    //         min: 4,
    //         max: 10,
    //         qty: 7,
    //         diff: 3,
    //         lofExp: "",
    //         note: "",
    //     }
    // ]
    

    const mergePickName = (data: any[]): object[] => {
        if(data.length == 0 || data.length == undefined){
            return [];
        }

        // set columns math data
        columnsName.map(( col, i ) => {
            if(i > Object.keys(data[0]).length){
                return
            }
            col.accessor = Object.keys(data[0])[i];
        })
        return data;
    }

    return(
        
        <TableDisplayHistory key={uuidv4()}
            columns={[columnsName]} 
            data={[mergePickName(dataDrugRefill)]} 
        />
    )
}
export default DisplayAmountDrugRefill;
