import { v4 as uuidv4 } from "uuid";
import TableDisplayHistory from "../../components/OtherComp/TableDisplayHistory/TableDisplayHistory";
import { IDispensingType } from "../../interface/dispensingView";
import {  useSelector } from "react-redux";

const DisplayTableDispensing = () => {
    const dataDispensing: IDispensingType[] = useSelector((state: any) => state.dpw.dataDispensing.data);

    const columnsName = [
        {
            Header: "วันที่",
            accessor: "0",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "วอร์ด",
            accessor: "1",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "เลขที่ใบสั่งยา",
            accessor: "2",
            enableRowSpan: true,
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header: "HN",
            accessor: "3",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: false,
        },
        {
            Header: "ชื่อผู้ป่วย",
            accessor: "4",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: false,
        },
      
        {
            Header: "ชื่อยา",
            accessor: "5",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: false,
        },
        {
            Header: "จำนวน",
            accessor: "6",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "เวลาเบิก",
            accessor: "7",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header:"จำนวนหยิบ",
            accessor:"8",
            enableRowSpan: false,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header:"เวลาที่หยิบ",
            accessor:"9",   
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "หยิบยาโดย",
            accessor: "10",
            enableRowSpan: true,
            filedDuplicate: false,
            cellCenter: false,
        },
    ]
    
    const mergePickName = (data: IDispensingType[]): object[] => {
        if(data == undefined) return []; 
        if(data.length == 0 || data.length == undefined){
            return [];
        }

        let resData: object[] = [];
        data.map(( d: IDispensingType ) => {
            // After using destructuring and rest operator
            // userPick = get object one key
            // ...rest = object all key not in userPick
            const { userPick, ...rest } = d;
            let setUserPick: string = "";
            userPick.map((up: any, index: number) => { index == 0 ? setUserPick += up.userPickName : setUserPick += "\r\n( " + up.userPickName + " )" })

            const newObj = Object.assign(rest, { UserDispense: setUserPick });
            resData = [...resData, newObj];
            
        })

        // set columns math data
        columnsName.map(( col, i ) => {
            if(i > Object.keys(resData[0]).length){
                return
            }
            col.accessor = Object.keys(resData[0])[i];
        })

        return resData;
    }

    return(
        <TableDisplayHistory key={uuidv4()}
            columns={[columnsName]} 
            data={[ mergePickName(dataDispensing) ]} 
        />
    )
}
export default DisplayTableDispensing;