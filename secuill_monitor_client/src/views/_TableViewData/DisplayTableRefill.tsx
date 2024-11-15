import { v4 as uuidv4 } from "uuid";
import TableDisplayHistory from "../../components/OtherComp/TableDisplayHistory/TableDisplayHistory";
import { IDataRefill } from "../../interface/dispensingView";
import { useSelector } from "react-redux";

const DisplayTableRefill = () => {
    const dataRefill: IDataRefill[] = useSelector((state: any) => state.dpw.dataRefill.data);
    const columnsName = [
        {
            Header: "วันที่เติม",
            accessor: "refill_date",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: false,
        },
        {
            Header:"รอบเติม",
            accessor:"refill_counter",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header:"รหัสยา",
            accessor:"drug_code",
            enableRowSpan: false, 
            filedDuplicate: false,
            cellCenter: false,
        },
        {
            Header: "ชื่อยา",
            accessor: "drug_name_en",
            enableRowSpan: false, 
            filedDuplicate: false,
            cellCenter: false,
        },
        {
            Header: "จำนวน",
            accessor: "refill_qty",
            enableRowSpan: false, 
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header:"Lot No.",
            accessor:"lot_no",
            enableRowSpan: true, 
            filedDuplicate: false,
            cellCenter: true,
        },
        {
            Header: "เวลาเติม",
            accessor: "refill_time",
            enableRowSpan: true, 
            filedDuplicate: true,
            cellCenter: true,
        },
        {
            Header: "เติมยาโดย",
            accessor: "userRefill",
            enableRowSpan: true, 
            filedDuplicate: false,
            cellCenter: false,
        },
    ]
    
    const mergePickName = (data: IDataRefill[]): object[] => {
        if(data.length == 0 || data.length == undefined){
            return data;
        }

        let resData: object[] = [];
        data.map(( d: IDataRefill ) => {
            // After using destructuring and rest operator
            // userPick = get object one key
            // ...rest = object all key not in userPick
            const { userRefill, ...rest } = d;
            let setUserPick: string = "";
            userRefill.map((up, index) => { index == 0 ? setUserPick += up.userPickName : setUserPick += "\r\n( " + up.userPickName + " )" })

            const newObj = Object.assign(rest, { userRefill: setUserPick });
            resData = [...resData, newObj];         
        })

        // set columns math data
        // columnsName.map(( col, i ) => {
        //     if(i > Object.keys(resData[0]).length){
        //         return
        //     }
        //     col.accessor = Object.keys(resData[0])[i];
        // })

        console.log(resData);

        return resData;
    }

    return(
        
        <TableDisplayHistory key={uuidv4()} 
            columns={[columnsName]} 
            data={[ mergePickName(dataRefill) ]} 
        />
    )
}
export default DisplayTableRefill;