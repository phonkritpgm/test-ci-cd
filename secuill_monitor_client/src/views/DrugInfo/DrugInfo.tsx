import { useEffect, useId, useState } from "react";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import styles from "./DrugInfo.module.css";
import { filterDrug,getDrugInfo } from "../../store/slices/drugInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { IDrugInfo } from "../../interface/druginfo";
import { AppDispatch } from "../../store/store";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import PopupInfoChild from "../../components/Popups/PopupInfoChild/PopupInfoChild";
import DrugManagement, { eEvent } from "./DrugManagement";
import { PageContainer, PageFooterSpaceContainer } from "../../styled";

const defaultTableHeader = [
  "รหัสยา",
  "ชื่อยา",
  "คงเหลือ",
  "หน่วย",
  "จำนวนสูงสุด",
  "จำนวนต่ำสุด",
  "Narcotic",
  "Antibiotic",
  "Highalert",
  "สถานะ",
  "Action"
]

const DrugInfo = () => {
  const hintId = useId();
  // useEffect(() => {
  //   //await dispatch(  fetchUsers() );
  // }, [dispatch]);

  // const handleGetUsers = async () => {
  //   const result = await dispatch<any>(fetchUsers());
  // };

  const dataDefault:IDrugInfo = {
    drug_code:"",
    drug_name_en:"",
    drug_name_th:"",
    drug_unit:"",
    drug_barcode:"",
    stock_min:0,
    stock_max:0,
    drug_status:"0",
    drug_narcotic:"0",
    drug_antibiotic:"0",
    drug_highalert:"0",
    stock_qty:0,
    useConverUnit:false,  
    unitqty:0,
    unitcode:"",
    convto:0,
    convtounitcode:""
  }

  // const dataState: IInitialAllState = useSelector((state:any)=>state.druginfo);
  const dataDrugInfo: IDrugInfo[] = useSelector((state:any)=>state.druginfo.dataDrugInfo.data);
  const dispatch = useDispatch<AppDispatch>();

  const [VisibleDialog1,setVisibleDialog1] = useState<boolean>(false);
  const [eventDialog,setEventDialog] = useState<eEvent>(eEvent.INSERT);
  const [dataEdit,setDataEdit] = useState<IDrugInfo>(dataDefault);

  const onClickAdd = () => {
    setEventDialog(eEvent.INSERT);
    setDataEdit(dataDefault);
    setVisibleDialog1(true);
  }

  const onClickEdit = (data:IDrugInfo) => {
    setEventDialog(eEvent.EDIT);
    setVisibleDialog1(true);
    setDataEdit(data);
  }

  useEffect(()=>{
    dispatch(getDrugInfo());
  },[VisibleDialog1])
  return (
    <PageContainer>
      
        <div className={styles.title} onClick={() => {}}>
            <h5>ข้อมูลยาในเครื่อง SECUILL 56 รายการ</h5>
        </div>

        <hr></hr>
        
        <PopupInfoChild
            onClose={(e) => {setVisibleDialog1(e)}}
            show={VisibleDialog1}
            bgClose={false}
            title={eventDialog === eEvent.INSERT ? "สร้างรายการยา" : "แก้ไขรายการยา"} >
            {VisibleDialog1 &&
            <DrugManagement Event={eventDialog} 
                            data={dataEdit}/>}
        </PopupInfoChild>

        <div className={ styles.verify_orders }>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Textbox
                placeholder = "ค้นหา ชื่อยา"
                maxLength = { 25 }
                onChange = {(e: any) => dispatch(filterDrug({ search: e.target.value })) } //setSearch(e.target.value)}
                >             
            </Textbox>        
            <Button type={BtnClr.ADD} bg={true} onClick={onClickAdd}> <span>&#10750;</span> สร้างรายการใหม่</Button>
          </div>      
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
                      dataDrugInfo == undefined 
                      ?
                        <tr><td colSpan={ defaultTableHeader.length } ><div>undefined</div></td></tr> 
                      :
                      dataDrugInfo.length == 0 || dataDrugInfo.length == undefined
                      ?
                        <tr><td colSpan={ defaultTableHeader.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                      :
                      dataDrugInfo.map((data:IDrugInfo, i : number)=>(                      
                        <tr key={i}>
                          <td>{data.drug_code}</td>
                          <td>{data.drug_name_en}</td>
                          <td>{data.stock_qty}</td>
                          <td>{data.drug_unit}</td>
                          <td>{data.stock_max}</td>
                          <td>{data.stock_min}</td>
                          <td>
                              {
                                data.drug_narcotic == "1" 
                                ? <div className={styles.isTrueTypeDrug}>ใช่</div> 
                                : <div className={styles.isFalseTypeDrug}>ไม่ใช่</div>
                              }
                            </td>
                          <td> {
                                data.drug_antibiotic == "1" 
                                ? <div className={styles.isTrueTypeDrug}>ใช่</div> 
                                : <div className={styles.isFalseTypeDrug}>ไม่ใช่</div>
                              }</td>
                          <td> {
                                data.drug_highalert == "1" 
                                ? <div className={styles.isTrueTypeDrug}>ใช่</div> 
                                : <div className={styles.isFalseTypeDrug}>ไม่ใช่</div>
                              }</td>
                          <td>
                            {
                              data.drug_status == "1" 
                              ? <div className={styles.isOpenUseDrug}>เปิด</div>
                              : <div className={styles.isCloseUseDrug}>ปิด</div> 
                            }
                          </td>
                          <td> <Button type={BtnClr.EDIT} bg={ true } onClick={() => onClickEdit(data)} >
                                  <span>&#128393;</span> แก้ไข
                              </Button>
                          </td>
                        </tr>
                      ))
                    }
              </tbody>
            </table>
          </div>
        </div>

        <PageFooterSpaceContainer>
          
        </PageFooterSpaceContainer>
    </PageContainer>
  );
};

export default DrugInfo;
