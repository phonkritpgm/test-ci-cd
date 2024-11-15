import  { useEffect, useId, useState } from 'react'
import { PageContainer } from '../../styled'
import styles from './LotExpire.module.css';
import Textbox from '../../components/ToolsComp/Textbox/Textbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import GroupBox from '../../components/ToolsComp/groupBox/groupBox';
import DatetimePicker from '../../components/ToolsComp/input/DatetimePicker/DatetimePicker';
import { cFormatDate } from '../../helper/convertDateForm';
import Button, { BtnClr } from '../../components/ToolsComp/button/Button/Button';
import { filterDrugLot, filterLotNumber, getDrugLot, getLotNumber, insertLotNumber, updateLotNumber, updateStatusLotNumber } from '../../store/slices/stockSlice';
import { IDrugLot, IinsertLotNumber, ILotNumber, IupdateLotNumber } from '../../interface/stock';
import Dialog, { buttonType, messageType } from '../../components/Popups/Dialog/Dialog';
import { IPayloadErrorModel } from '../../interface/iResponseApi';

const defaultTableHeaderDrug = [
  "รหัสยา",
  "ชื่อยา",
  "จำนวน Lot"
]

const defaultTableHeaderLot = [
  "Lot No.",
  "Qty",
  "Max Qty",
  "Date bbe",
  "Date Exp",
  "Action",
]


export default function LotExpire() {
  const hintId = useId();
  const dataDrugInfo: IDrugLot[] = useSelector((state:any)=>state.stk.dataDrugLot.data);
  const dataLotNumber: ILotNumber[]= useSelector((state:any)=>state.stk.dataLotNumber.data);
  const dispatch = useDispatch<AppDispatch>();
  const [selectDrug,setSelectDrug] = useState<string>("");
  const [selectRow,setSelectRow] = useState<string>("");
  const [selectRowLot,setSelectRowLot] = useState();
  const [datebbe, setDatebbe] =  useState<string>(cFormatDate(new Date())); 
  const [dateExp, setDateExp] =  useState<string>(cFormatDate(new Date())); 
  const [inputLotno,setInputLotno] = useState("");
  const [inputLotQty,setInputLotQty] = useState(0);
  const [inputLotMaxQty,setInputLotMaxQty] = useState(0);
  const [messageErrorLotno,setMessageErrorLotNo] = useState("");
  const [event,setEvent] =  useState("INSERT");

  const clearInput = () =>{
    setInputLotno("");
    setInputLotQty(0);
    setInputLotMaxQty(0);
    setDatebbe(cFormatDate(new Date()));
    setDateExp(cFormatDate(new Date()));
    setMessageErrorLotNo("");
  }

  const onClickRow = (e:any,drugName:string) =>{
    e.preventDefault();
    setSelectRow(e.target.parentNode.id);
    setSelectDrug(drugName);
    clearInput();
    setEvent("INSERT");
    dispatch(getLotNumber(e.target.parentNode.id));
  }



  const onClickDelete = (lotstatus:string,lotno:string) =>{
      switch (lotstatus){
        case "0":
          Dialog.open(()=>{commitDelete(lotstatus,lotno)},
            "คุณต้องการกู้คืน lot ใช่หรือไม่?",
            "แจ้งเตือน",
            buttonType.YesNo, messageType.Question,
          )
          break;
          case "1":
            Dialog.open(()=>{commitDelete(lotstatus,lotno)},
              "คุณต้องการลบ lot ใช่หรือไม่?",
              "แจ้งเตือน",
              buttonType.YesNo, messageType.Question,
            )
            break
      }
  }

  const commitDelete = async(lotstatus:string,lotno:string) =>{
    let result:any = [];
    switch (lotstatus){
      case "0":
        result = await dispatch(updateStatusLotNumber({data:{lotstatus:"1"},drugcode:selectRow,lotnumber:lotno}));
        break;
        case "1":
          result = await dispatch(updateStatusLotNumber({data:{lotstatus:"0"},drugcode:selectRow,lotnumber:lotno}));
          break
    }
    
    if (result.meta.requestStatus == "fulfilled") {
      if (result.payload.statusCode == 200) {
        Dialog.open(() => {},
          "ทำรายการสำเร็จ ",
          "แจ้งเตือน",
          buttonType.OK, messageType.Success,
        )
        dispatch(getDrugLot());
        dispatch(getLotNumber(selectRow));
        clearInput();
        return;
      }
      else{
        Dialog.open(() => {},
        "ทำรายการล้มเหลว " + "<br/>" + result.payload.message,
        "แจ้งเตือน",
        buttonType.OK, messageType.Error,
      )
      }
    }
  }

  const onClickSave = () =>{
    Dialog.open(commit,
    "ยืนยันการทำรายการ ",
    "แจ้งเตือน",
    buttonType.YesNo, messageType.Question,
  )};

  const commit = async()=>{
    let result: any = null;
    switch (event){
      case "INSERT":
        const dataInsert:IinsertLotNumber= {
          drugcode : selectRow,
          lotno : inputLotno,
          lotexp: dateExp,
          lotbbe:datebbe,
          lotqty:inputLotQty,
          lotmaxqty:inputLotMaxQty  
         }
        result = await dispatch(insertLotNumber({data:dataInsert}));
        if (result.meta.requestStatus == "fulfilled") {
          if (result.payload.statusCode == 200) {
            Dialog.open(() => {},
                "เพิ่มข้อมูลสำเร็จ ",
                "แจ้งเตือน",
                buttonType.OK, messageType.Success,
             )
            dispatch(getDrugLot());
            dispatch(getLotNumber(selectRow));
            clearInput();
            return;
          }
        }
        break;
        case "EDIT":
          const dataUpdate:IupdateLotNumber= {
            lotqty:inputLotQty,
            lotmaxqty:inputLotMaxQty,
            lotexp:dateExp,
            lotbbe:datebbe,
          }
          result = await dispatch(updateLotNumber({data:dataUpdate,drugcode:selectRow,lotnumber:inputLotno}));
          if (result.meta.requestStatus == "fulfilled") {
            if (result.payload.statusCode == 200) {
              Dialog.open(() => {},
                  "แก้ไข้ข้อมูลสำเร็จ ",
                  "แจ้งเตือน",
                  buttonType.OK, messageType.Success,
               )
              dispatch(getDrugLot());
              dispatch(getLotNumber(selectRow));
              clearInput();
              return;
            }
          }
        break;
    }

    if (result.payload.statusCode == 422) {
      result.payload.payload.map((data:IPayloadErrorModel)=>{
        switch (data.field){
          case "lotno":
            setMessageErrorLotNo(data.message);
            break;
            case "drugcode":{
              Dialog.open(() => {},
              data.message,
              "แจ้งเตือน",
              buttonType.OK, messageType.Error,
            )
              break;
            }
        }
      })
    }  
    else {
      Dialog.open(() => {},
              "ทำรายการล้มเหลว " + "<br/>" + result.payload.message,
              "แจ้งเตือน",
              buttonType.OK, messageType.Error,
            )
    }
  }

  const onClickLotNo = (e:any,data:ILotNumber) =>{
    setEvent("EDIT");
    setInputLotno(data.lotno);
    setInputLotQty(data.lotqty);
    setInputLotMaxQty(data.lotmaxqty);
    setDatebbe(cFormatDate(data.lotbbe.toString()));
    setDateExp(cFormatDate(data.lotexp.toString()));
    setSelectRowLot(e.target.parentNode.id);
  }


  const effectSelectRowDrug =(data:IDrugLot) => {return selectRow == data.drugCode ? styles.row_active : styles.row_inactive}
  const effectSelectRowLot =(data:ILotNumber) => {
    return data.lotstatus == "1"
      ?
        selectRowLot == data.lotno 
        ? 
        styles.row_active 
        : 
        styles.row_inactive
      :
      styles.row_disable
  }

  useEffect(()=>{
    dispatch(getDrugLot());
  },[])

  return (
   <PageContainer>
      <div className={styles.title} onClick={() => {}}>
        <h5>ข้อมูล Lot ยา</h5>
      </div>
      <hr></hr>
      <div className={styles.search}>
        <Textbox placeholder="ค้นหา รหัส ชื่อ ยา" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {dispatch(filterDrugLot({ search:e.target.value}))}}/>
      </div>
      <div className={styles.verify_orders}>
        <div key={hintId} className={ styles.tb_verify }>
          <div className={styles.table}>
            <table key={hintId}>
              <thead>
                <tr key={"rowHead"} >
                    { 
                        defaultTableHeaderDrug.map( ( head, i ) => (
                            <th key={ i }> { head } </th>
                        ))
                    }               
                </tr>
              </thead>
                {
                  dataDrugInfo == undefined 
                  ?
                   <div className={styles.message_notfound}>undefined</div>
                  :
                  dataDrugInfo.length == 0
                  ?
                    <div className={styles.message_notfound}>ไม่พบข้อมูล !</div>
                  :
                  <tbody>
                  {
                    dataDrugInfo.map((data:IDrugLot, i : number)=>(                      
                      <tr id={data.drugCode} key={i} onClick={(e)=>{onClickRow(e,data.drugName)}}>
                        <td className={effectSelectRowDrug(data)}>{data.drugCode}</td>
                        <td className={effectSelectRowDrug(data)}>{data.drugName}</td> 
                        <td className={effectSelectRowDrug(data)}>{data.countLot}</td> 
                      </tr>
                    ))
                  }
                  </tbody>
                }
            </table>
          </div>
        
        </div> 

        <div className={styles.lot}>
          <div className={styles.fromControl}>
          <GroupBox title={`เพิ่ม - แก้ไข LotNumber`}>   
            <div className={styles.control}>
              <p style={{marginTop:"10px",color:"var(--blue-900)"}}>{selectDrug != "" ? `ชื่อยา : ${selectDrug}` :"ชื่อยา : -" }</p>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                <p>Lot No.</p>
                <Textbox placeholder="Lot No." style={{width:"10rem"}} disabled={event == "EDIT" ? true : false} value={inputLotno} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setInputLotno(e.target.value)}></Textbox>
                <p hidden={messageErrorLotno == "" ? true : false} style={{fontSize:"var(--font-size-xxs)",color:"red"}}>{messageErrorLotno}</p>
              </div>
             <div style={{display:"flex",gap:"0.5rem"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                <p>จำนวนใน Lot</p>
                <Textbox placeholder ="Lot Qty" style={{width:"7rem",textAlign:"center"}} 
                value={inputLotQty} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                  if (Number(e.target.value)){
                    setInputLotQty(Number(e.target.value));
                  }
                  else{
                    setInputLotQty(0);
                  }                
                }}/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
              <p>จำนวนสูงสุดใน Lot</p>
              <Textbox placeholder ="Lot MaxQty" style={{width:"7rem",textAlign:"center"}} 
              value={inputLotMaxQty} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                  if (Number(e.target.value)){
                    setInputLotMaxQty(Number(e.target.value));
                  }              
                  else{
                    setInputLotMaxQty(0);
                  }
                }
              }
              />
              </div>    
             </div>
             <div style={{display:"flex",gap:"1rem"}}>
              <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                 <p>วันก่อนหมดอายุ</p>
                 <DatetimePicker date={datebbe} setDate={setDatebbe} />
               </div>
                <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
                 <p>วันหมดอายุ</p>
                 <DatetimePicker date={dateExp} setDate={setDateExp} />
                </div>
              </div>
              <div>
                <Button type={ BtnClr.OK } bg={ true } onClick={onClickSave}>SAVE</Button>
              </div>
            </div>
            </GroupBox>
          </div>
          <div className={styles.tbLot}> 
            <div className={styles.table}>
              <Textbox placeholder="ค้นหา Lot Number" style={{marginBottom:"10px"}} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>dispatch(filterLotNumber({search:e.target.value}))}> 
              </Textbox>
              <table key={hintId}>
                <thead>
                  <tr key={"rowHead"}>
                  { 
                      defaultTableHeaderLot.map( ( head, i ) => (
                          <th key={ i }> { head } </th>
                      ))
                  }               
                  </tr>
                </thead>
                <tbody>
                  {
                    dataLotNumber == undefined 
                    ?
                      <tr><td colSpan={ defaultTableHeaderLot.length } ><div>undefined</div></td></tr> 
                    :
                    dataLotNumber.length == 0
                    ?
                      <tr><td colSpan={ defaultTableHeaderLot.length } ><div>ไม่พบข้อมูล !</div></td></tr>
                    :
                    dataLotNumber.map((data:ILotNumber, i : number)=>(                      
                      <tr id={data.lotno} key={i} onClick={(e)=>onClickLotNo(e,data)}>
                        <td className={effectSelectRowLot(data)}>{data.lotno}</td>
                        <td className={effectSelectRowLot(data)}>{data.lotqty}</td> 
                        <td className={effectSelectRowLot(data)}>{data.lotmaxqty}</td> 
                        <td className={effectSelectRowLot(data)}>{cFormatDate(data.lotbbe)}</td> 
                        <td className={effectSelectRowLot(data)}>{cFormatDate(data.lotexp)}</td> 
                        <td className={effectSelectRowLot(data)}>
                          {data.lotstatus == "1"
                          ?
                            <Button type={ BtnClr.DELETE}  bg={ true } onClick={()=>{onClickDelete(data.lotstatus,data.lotno)}}>DELETE</Button>
                          :
                            <Button type={ BtnClr.EDIT}  bg={ true } onClick={()=>{onClickDelete(data.lotstatus,data.lotno)}}>Recovery</Button>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
   </PageContainer>
  )
}
