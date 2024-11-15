import { useEffect, useId } from "react"
import styles from './DrugStock.module.css'
import Textbox from "../../components/ToolsComp/Textbox/Textbox"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { filterListStock, getListStock } from "../../store/slices/stockSlice"
import { IListStock } from "../../interface/stock"
import { PageContainer, PageFooterSpaceContainer } from "../../styled"
import DisplayTableDrugStock from "./DisplayTableDrugStock"

const defaultTableHeader = [
    "รหัสยา",
    "ชื่อยา",
    "คงเหลือ",
    "จำนวนสูงสุด",
    "จำนวนต่ำสุด"
]

const DrugStock = () => {
    const hintId = useId();
    const dataListStock: IListStock[] = useSelector((state: any) => state.stk.dataListStock.data);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getListStock());
    },[])
    
    return(
        <PageContainer>
            {/* Page title */}
            <div className="root_title">
                <h4>จำนวนยาคงเหลือในเครื่อง</h4>
            </div>
            <hr />

            <div className={ styles.verify_orders }>
                <Textbox
                    placeholder = "ค้นหา ชื่อยา"
                    maxLength = { 25 }
                    onChange = {(e: any) => dispatch(filterListStock({ search: e.target.value })) } //setSearch(e.target.value)}
                    >             
                </Textbox>
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
                                dataListStock == undefined ? (
                                    <tr><td colSpan={ defaultTableHeader.length } ><div>undefined</div></td></tr>                                 
                                )
                                :
                                dataListStock.length == 0 || dataListStock.length == undefined ? (
                                    <tr><td colSpan={ defaultTableHeader.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                                )
                                :
                                
                                dataListStock.map( ( data: IListStock, i: number ) => (
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    <tr key={ i }>
                                        <td>{ data.drug_code }</td>
                                        <td>{ data.drug_name }</td>
                                        <td>{ data.stock_qty }</td>
                                        <td>{ data.stock_max }</td>
                                        <td>{ data.stock_min }</td>
                                    </tr>
                                ))
                            }

                            {/* ยาทั่วไป */}
                            {/* ยาตู้เย็น */}
                            {/* ยา SafeBox */}
                        </tbody>
                    </table>       
                </div>       
            </div>

            <DisplayTableDrugStock />

            <PageFooterSpaceContainer>
                
            </PageFooterSpaceContainer>

        </PageContainer>
    )
}

export default DrugStock;