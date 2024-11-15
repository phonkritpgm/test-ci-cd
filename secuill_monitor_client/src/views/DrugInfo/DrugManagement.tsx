import { useEffect, useState } from "react";
import Button, {
  BtnClr,
} from "../../components/ToolsComp/button/Button/Button";
import GroupBox from "../../components/ToolsComp/groupBox/groupBox";
import { IOption } from "../../components/ToolsComp/radioButton/InputInterface";
//import RadioButton from "../../components/ToolsComp/radioButton/radioButton";
import RadioButtonGroup from "../../components/ToolsComp/radioButton/ReadioButtonGroup";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import styles from "./DrugManage.module.css";
import { IDrugInfo } from "../../interface/druginfo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  getDrugInfo,
  insertDrug,
  updateDrug,
} from "../../store/slices/drugInfoSlice";
import { IPayloadErrorModel } from "../../interface/iResponseApi";
import Dialog, { buttonType, messageType } from "../../components/Popups/Dialog/Dialog";
import CheckBox from "../../components/ToolsComp/checkBox/checkbox";

export enum eEvent {
  INSERT,
  EDIT,
}

type propsType = {
  Event: eEvent;
  data: IDrugInfo;
};

const DrugManagement = (props: propsType) => {
  const [inputDrugCode, setInputDrugCode] = useState<string>(
    props.data.drug_code
  );
  const [inputDrugNameEn, setInputDrugNameEn] = useState<string>(
    props.data.drug_name_en
  );
  const [inputDrugNameTh, setInputDrugNameTh] = useState<string>(
    props.data.drug_name_th
  );
  const [inputDrugBarcode, setInputDrugBarcode] = useState<string>(
    props.data.drug_barcode
  );
  const [inputDrugUnit, setInputDrugUnit] = useState<string>(
    props.data.drug_unit
  );
  const [inputStockMin, setInputStockMin] = useState<number>(
    props.data.stock_min
  );
  const [inputStockMax, setInputStockMax] = useState<number>(
    props.data.stock_max
  );
  const [inputDrugStatus, setInputDrugStatus] = useState<string>(
    props.data.drug_status
  );
  const [inputDrugNarcotic, setInputDrugNarcotic] = useState<string>(
    props.data.drug_narcotic
  );
  const [inputDrugAntibiotic, setInputDrugAntibiotic] = useState<string>(
    props.data.drug_antibiotic
  );
  const [inputDrugHightAlert, setInputDrugHightAlert] = useState<string>(
    props.data.drug_highalert
  );

  const [inputUnitQty,setInputUnitQty] = useState<number>(props.data.unitqty == null ? 0 : props.data.unitqty);
  const [inputUnitCode,setInputUnitCode] = useState<string>(props.data.unitcode);
  const [inputConvertQty,setInputConvertQty] = useState<number>(props.data.convto == null ? 0 : props.data.convto);
  const [inputConvertCode,setInputConvertCode] = useState<string>(props.data.convtounitcode);
  const [checkOpenConvert,setCheckOpenConvert] = useState<boolean>(props.data.useConverUnit) ;

  const [messageDrugCode, setMessageDrugCode] = useState<string>("");
  const [messageDrugName, setMessageDrugName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const optionRadioDrugStatus: IOption[] = [
    {
      label: "ปิด",
      name: "Status",
      color: "var(--primary2-400)",
      checked: inputDrugStatus == "0" && true,
    },
    {
      label: "เปิด",
      name: "Status",
      color: "var(--green-500)",
      checked: inputDrugStatus == "1" && true,
    },
  ];

  const optionRadioNacrotic: IOption[] = [
    {
      label: "ไม่ใช่",
      name: "Nacrotic",
      color: "var(--primary2-400)",
      checked: inputDrugNarcotic == "0" && true,
    },
    {
      label: "ใช่",
      name: "Nacrotic",
      color: "var(--green-500)",
      checked: inputDrugNarcotic == "1" && true,
    },
  ];
  const optionRadioAntibiotic: IOption[] = [
    {
      label: "ไม่ใช่",
      name: "Antibiotic",
      color: "var(--primary2-400)",
      checked: inputDrugAntibiotic == "0" && true,
    },
    {
      label: "ใช่",
      name: "Antibiotic",
      color: "var(--green-500)",
      checked: inputDrugAntibiotic == "1" && true,
    },
  ];
  const optionRadioHightAlert: IOption[] = [
    {
      label: "ไม่ใช่",
      name: "HightAlert",
      color: "var(--primary2-400)",
      checked: inputDrugHightAlert == "0" && true,
    },
    {
      label: "ใช่",
      name: "HightAlert",
      color: "var(--green-500)",
      checked: inputDrugHightAlert == "1" && true,
    },
  ];

  const [selectedValue, setSelectedValue] = useState<String>(
    props.data.drug_status === "1" ? "เปิด" : "ปิด"
  );
  const [radioName, setRadioName] = useState<String>("Status");

  function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedValue(event.target.value);
    setRadioName(event.target.name);
  }

  const setValueFromRadio = () => {
    switch (radioName) {
      case "Status":
        selectedValue === "เปิด"
          ? setInputDrugStatus("1")
          : setInputDrugStatus("0");
        break;
      case "Nacrotic":
        selectedValue === "ใช่"
          ? setInputDrugNarcotic("1")
          : setInputDrugNarcotic("0");
        break;
      case "Antibiotic":
        selectedValue === "ใช่"
          ? setInputDrugAntibiotic("1")
          : setInputDrugAntibiotic("0");
        break;
      case "HightAlert":
        selectedValue === "ใช่"
          ? setInputDrugHightAlert("1")
          : setInputDrugHightAlert("0");
        break;
    }
  };

  const onClickSave = async () => {
    Dialog.open((e)=>handleConfirmDialog(Object.assign(e)),
                          "ยืนยันการเพิ่มข้อมูล ",
                          "แจ้งเตือน",
                          buttonType.YesNo, messageType.Question,
                )  
  };

  const handleConfirmDialog = async(e:any)=>{
    if (e.eventMessage == "yes"){
      const data: IDrugInfo = {
        drug_code: inputDrugCode,
        drug_name_en: inputDrugNameEn,
        drug_name_th: inputDrugNameTh,
        drug_barcode: inputDrugBarcode,
        stock_min: inputStockMin,
        stock_max: inputStockMax,
        drug_unit: inputDrugUnit,
        drug_status: inputDrugStatus,
        drug_antibiotic: inputDrugAntibiotic,
        drug_highalert: inputDrugHightAlert,
        drug_narcotic: inputDrugNarcotic,
        stock_qty: 0,
        useConverUnit:checkOpenConvert,  
        unitqty:inputUnitQty,
        unitcode:inputUnitCode,
        convto:inputConvertQty,
        convtounitcode:inputConvertCode
      };
  
      let result: any = null;
      switch (props.Event) {
        case eEvent.INSERT:
          result = await dispatch(insertDrug(data));
          if (result.meta.requestStatus == "fulfilled") {
            if (result.payload.statusCode == 200) {
              Dialog.open(() => {},
                  "เพิ่มข้อมูลสำเร็จ ",
                  "แจ้งเตือน",
                  buttonType.OK, messageType.Success,
               )
              dispatch(getDrugInfo());
              return;
            }
            //alert("เพิ่มข้อมูลไม่สำเร็จ \r\n" + result.payload.status + " \r\n" + result.payload.detail);
          }  
          break;
        case eEvent.EDIT:
          result = await dispatch(updateDrug(data));
          if (result.meta.requestStatus == "fulfilled") {
            if (result.payload.statusCode == 200) {
              Dialog.open(() => {},
                "แก้ไขข้อมูลสำเร็จ ",
                "แจ้งเตือน",
                buttonType.OK, messageType.Success,
              )
              return;
            }    
          }
          break;
      }
      if (result.payload.statusCode == 422) {
        if (result.payload.payload){
          result.payload.payload.map((data:IPayloadErrorModel)=>{
            switch (data.field){
              case "drug_code":
                setMessageDrugCode(data.message);
                break;
              case "drug_name_en":
                setMessageDrugName(data.message);
                break;
            }
          })
        }
        return;
      }
      else {
        Dialog.open(() => {},
                "ทำรายการล้มเหลว " + "<br/>" + result.payload.message,
                "แจ้งเตือน",
                buttonType.OK, messageType.Error,
              )
        alert();
      }
    }
  }

  useEffect(() => {
    setValueFromRadio();
  }, [radioName, selectedValue]);

  return (
    <div className={styles.manageDrug}>
      <GroupBox title="ข้อมูลยา">
        <div className={styles.flexColumnGap05}>
          <p>รหัสยา</p>
          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <Textbox
              placeholder="รหัสยา"
              style={{ width: "200px" }}
              disabled={props.Event === eEvent.EDIT && true}
              value={inputDrugCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                setMessageDrugCode("")
                setInputDrugCode(e.target.value)
              }
              }
            />
            <span
              style={{ fontSize: "14px", color: "red" }}
              hidden={messageDrugCode != "" && false}
            >
              {messageDrugCode}
            </span>
          </div>
          <p>ชื่อยาภาษา(Eng.)</p>
          <Textbox
            placeholder="ชื่อยา (English)"
            style={{ width: "440px" }}
            value={inputDrugNameEn}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMessageDrugName("");
              setInputDrugNameEn(e.target.value);
            }}
          />
          <span
            style={{
              fontSize: "14px",
              color: "red",
              marginBottom: `${messageDrugName != "" && "10px"}`,
            }}
            hidden={messageDrugName != "" && false}
          >
            {messageDrugName}
          </span>
          <p>ชื่อยาภาษา(ไทย)</p>
          <Textbox
            placeholder="ชื่อยา (ไทย)"
            style={{ width: "440px" }}
            value={inputDrugNameTh}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputDrugNameTh(e.target.value)
            }
          />
          <div style={{ display: "flex" }}>
            <div className={styles.flexColumnGap05}>
              <p>หน่วย</p>
              <Textbox
                placeholder="หน่วย"
                style={{ width: "100px" }}
                value={inputDrugUnit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputDrugUnit(e.target.value)
                }
              />
            </div>
            <div className={styles.flexColumnGap05}>
              <p>Barcode</p>
              <Textbox
                placeholder="Barcode"
                style={{ width: "230px", marginLeft: "10px" }}
                value={inputDrugBarcode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputDrugBarcode(e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.groupTextboxStock}>
            <GroupBox title="ข้อมูล Stock">
              <div className={styles.inputStock}>
                <div className={styles.flexColumnGap05}>
                  <p>ปริมาณสูงสุด</p>
                  <Textbox
                    placeholder="ปริมาณสูงสุด"
                    style={{ width: "140px", textAlign: "center" }}
                    value={inputStockMax}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    {
                      if (Number(e.target.value)){
                        setInputStockMax(Number(e.target.value));
                      }       
                      else if (e.target.value === ""){
                        setInputStockMax(0);
                      }  
                    }                     
                    }
                  />
                </div>
                <div className={styles.flexColumnGap05}>
                  <p>ปริมาณต่ำสุด</p>
                  <Textbox
                    placeholder="ปริมาณต่ำสุด"
                    style={{ width: "140px", textAlign: "center" }}
                    value={inputStockMin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        {
                          if (Number(e.target.value)){
                            setInputStockMin(Number(e.target.value))
                          }       
                          else if (e.target.value === ""){
                            setInputStockMin(0)
                          }  
                        
                        }
                     }
                  />
                </div>
              </div>
            </GroupBox>
          </div>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <GroupBox title="สถานะ">
            <div className={styles.groupRadioButtin}>
              <RadioButtonGroup
                label="open"
                options={optionRadioDrugStatus}
                onChange={(e) => radioGroupHandler(e)}
              />
              <RadioButtonGroup
                label="Narcotic"
                options={optionRadioNacrotic}
                onChange={(e) => radioGroupHandler(e)}
              />
              <RadioButtonGroup
                label="Antibiotic"
                options={optionRadioAntibiotic}
                onChange={(e) => radioGroupHandler(e)}
              />
              <RadioButtonGroup
                label="HightAlert"
                options={optionRadioHightAlert}
                onChange={(e) => radioGroupHandler(e)}
              />
            </div>
          </GroupBox>
          <div style={{fontSize:"16px",marginTop:"10px"}}>
            <GroupBox title="อัตราส่วน หน่วยย่อย : หน่วยเต็ม">
                <div style={{display:"flex",flexDirection:"column",width:"100%"}}> 
                    <div style={{margin:"10px 0px 10px 0px"}}>
                      <CheckBox label="เปิดใช้" checked={checkOpenConvert} onChange={()=>setCheckOpenConvert(!checkOpenConvert)}/>
                    </div>                
                    <div style={{display:"flex",alignItems:"center",gap:"5px",margin:"10px 0px 10px 0px"}}>
                      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                         <p>ปริมาณ</p>
                         <Textbox style={{width:"80px",textAlign:"center"}} 
                              placeholder="0" 
                              value={inputUnitQty} 
                              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                  if (Number(e.target.value)){
                                    setInputUnitQty(Number(e.target.value));
                                  }       
                                  else if (e.target.value === ""){
                                    setInputUnitQty(0);
                                  }  
                               }
                              } 
                              disabled={checkOpenConvert == false ? true : false }/>                
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <p>หน่วยย่อย</p>
                        <Textbox style={{width:"100px",textAlign:"center"}} value={inputUnitCode}  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setInputUnitCode(e.target.value)} disabled={checkOpenConvert == false ? true : false }/>
                      </div>
                      
                      <span style={{fontSize:"20px",marginTop:"10px"}}>
                        :
                      </span>
                      
                      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                         <p>ปริมาณ</p>
                         <Textbox style={{width:"80px",textAlign:"center"}} 
                            placeholder="0" 
                            value={inputConvertQty} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                              if (Number(e.target.value)){
                                  setInputConvertQty(Number(e.target.value));
                              }       
                              else if (e.target.value === ""){
                                setInputConvertQty(0);
                              }  
                             
                            }}  
                         disabled={checkOpenConvert == false ? true : false }/>                
                      </div>
                      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                        <p>หน่วย่เต็ม</p>
                        <Textbox style={{width:"100px",textAlign:"center"}}  value={inputConvertCode} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setInputConvertCode(e.target.value)}  disabled={checkOpenConvert == false ? true : false }/>
                      </div>
                    </div>
                </div>                
            </GroupBox>
          </div>
          
        </div>
      </GroupBox>

      <div className={styles.panelButton}>
        <Button type={BtnClr.SUBMIT} bg={true} onClick={onClickSave}>
          บันทึก
        </Button>
      </div>
    </div>
  );
};

export default DrugManagement;
