import styled from "styled-components";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import { IBodyUpdateUser, IPermission, IPermissionFunc, IUser, IWardMaster } from "../../interface/IUsers";
import { FilterSelectorContainer, SelectOptionType, SelectOptionValues } from "../../styled";
import RadioButtonGroup from "../../components/ToolsComp/radioButton/ReadioButtonGroup";
import { useState } from "react";
import Dialog, { buttonType, messageType } from "../../components/Popups/Dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { IAuthenticationWithData } from "../../interface/authentication";
import { updateMUsers } from "../../store/slices/userSlice";
import { AppDispatch } from "../../store/store";

const UserEditContainer = styled.div<any>`\
    position: relative;
    // min-width: 220px;
    width: 100%;
    height: auto;
    padding: 10px;
`;

const TabTitle = styled.div<any>`
    width: 100%;
    // background-color: #eee;
    padding: 10px;
    label{
        font-size: 0.8rem;
        font-weight: 600;
        color: #1a5276;
    }
`;



const TextGroup = styled(UserEditContainer)`
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;

    label {
        font-size: 0.8rem;
    }
`;

const RightGroup = styled.div<any>`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
`;

const SelectedRight = styled(RightGroup)`
    width: 100%;
`;

const BottomContainer = styled.div<any>`
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`; 

const RadioButtonContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.7em;
    padding: 0 10px;
`;

const UserEdit = (props: any) => {

    const data: IUser = props.data;
    const permission: IPermission[] = props.permission;
    const wardMaster: IWardMaster[] = props.wardMaster;
    const dataAuth: IAuthenticationWithData = useSelector((state: any) => state.auth.dataAuth);

    const dispatch = useDispatch<AppDispatch>();

    const [ tmpLocationCode, setTmpLocationCode ] = useState<string | undefined>(data.userLocationCode);
    const [ optionCheck, setOptionCheck ] = useState<number>(data.userLocationId == 1 ? 0 : data.userLocationId == 2 ? 1 : 2);
    const op: any = [
        {
            label: "พยาบาล",
            name: "locationOp",
            color: "var(--primary-400)",
            checked: optionCheck == 0 ? true : false,
        },
        {
            label: "เภสัช",
            name: "locationOp",
            color: "var(--primary-400)",
            checked: optionCheck == 1 ? true : false,
        },
        {
            label: "ไม่ระบุ",
            name: "locationOp",
            color: "var(--primary-400)",
            checked: optionCheck == 2 ? true : false,
        },
    ]

    // Option radio button handler change
    function radioGroupHandler(event: React.ChangeEvent<HTMLInputElement>) {
        for (let index = 0; index < op.length; index++) {
            if(op[index].label == event.target.value){
                setOptionCheck(index);
                const tbWard: any = document.getElementById("idWard");
                const selWard: any = document.getElementById("selectWard");
                if(event.target.value == "พยาบาล"){
                    tbWard.style.display = "block";
                    selWard.style.display = "block";
                    setTmpLocationCode(selWard.value);
                } else{
                    tbWard.style.display = "none";
                    selWard.style.display = "none";
                    setTmpLocationCode("");
                }

                return;
            }
            
        }
    }

    const handleClickViewPermission = (per: IPermission[]) => {
        const cbPermission: any = document.getElementById("selectPermission");
        if(cbPermission.value == ""){
            return;
        }
        const filterPermission: IPermission[] = per.filter((prm: any) => prm.perId == cbPermission.value )
        let desc: string = "<p style='color: green; padding: 5px;'>";
        filterPermission[0].permissionFunction.map((d: IPermissionFunc, i: number) => (
            desc += " " + (i + 1).toString() + ". " + d.funcName + "<br>"
        ))
        desc += "</p>"
        Dialog.open(
            () => {},
            desc,
            "Display", buttonType.OK, messageType.Info
        )
    }

    const handleOnSelectWard = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tbWard: any = document.getElementById("idWard");
        tbWard.value = event.target.value;
    }

    const handleOnSubmit = async () => {
        // get data on setting
        const userId: string = data.userId;
        const userName: string = data.userName;
        const locationId: number = optionCheck == 0 ? 1 : optionCheck == 1 ? 2 : 0 ;
        let locationCode: string = "";
        let locationName: string = "";
        let perId: string = "";
        const userAssign: string = dataAuth.user.uid;

        const cbPermission: any = document.getElementById("selectPermission");
        perId = cbPermission.value;

        const selWard: any = document.getElementById("selectWard");
        locationCode = selWard.value;
        locationName = selWard.options[selWard.selectedIndex].text;

        // const radioLocation: any = document.getElementsByName("locationOp");
        // for (let index = 0; index < radioLocation.length; index++) {
        //     const element = radioLocation[index];
        //     if(element.checked == true){
        //         locationCode = element.value;
        //     }
        // }

        // validate data input to from body
        // userId
        // locationId
        if(locationId != 1 && locationId != 2){
            locationCode = "";
            locationName = "";
        }

        if(locationId == 2){
            locationCode = "Pharm01";
            locationName = "Pharmacy";
        }
        // locationCode
        if(locationCode == ""){
            locationName = "";
        }
        // locationName
        // userAssign
        // perId

        const bodyFrom: IBodyUpdateUser = {
            userId: userId,
            locationId: locationId,
            locationCode: locationCode,
            locationName: locationName,
            perId: perId,
            userAssign: userAssign,
            userName: userName
        }
        
        Dialog.open(
            (e) => confirmSubmit(e, bodyFrom),
            "ยืนยันการบันทึก",
            "Confirm submit data",
            buttonType.YesNo, messageType.Question
        )
    }

    const confirmSubmit = async (event: any, bodyFrom: IBodyUpdateUser) => {
        if(event.eventMessage == "yes"){
            // dispatch action update
            try{
                const resultUpdate: any = await dispatch(updateMUsers( {bodyParams: bodyFrom} ))
                if(resultUpdate.payload.statusCode != 200){
                    Dialog.open(
                        () => {},
                        "บันทึกข้อมูลไม่สำเร็จ !" + "<br>" + resultUpdate.payload.message + "<br>" + resultUpdate.payload.statusCode,
                        "Confirm submit data",
                        buttonType.OK, messageType.Error
                    )
                    return;
                }
    
                Dialog.open(
                    () => {},
                    "บันทึกข้อมูลสำเร็จ !",
                    "Confirm submit data",
                    buttonType.OK, messageType.Success
                )
            }
            catch(ex) {
                Dialog.open(
                    () => {},
                    "บันทึกข้อมูลไม่สำเร็จ !" + "<br>" + ex,
                    "Confirm submit data",
                    buttonType.OK, messageType.Error
                )
            }
        
        }
    }

    return(
        <UserEditContainer>
            <TabTitle>
                <label>User: { data.userFullName }</label>
            </TabTitle>
            <TextGroup>
                <label htmlFor="">UserName</label>
                <Textbox disable={true} defaultValue={data.userName} value={ data.userName } />    
            </TextGroup>
            
            <RightGroup>
                <TabTitle>
                    <label>สิทธิ์การเข้าใช้งาน</label>
                </TabTitle>

                <SelectedRight>
                    <FilterSelectorContainer>
                        {/* select ward, patient | drug */}
                        {/* combo box selected */}
                        <label style={{ fontSize: "0.8em" }} htmlFor="selectWard">สิทธิ์ใช้งาน:</label>
                        <SelectOptionType id="selectPermission" onChange={ () => { } }>
                            <SelectOptionValues value="">ไม่ระบุ</SelectOptionValues>
                            {
                                permission.map( (per: IPermission) => (
                                    per.perId == data.perId ? (
                                        <SelectOptionValues value={ per.perId } selected>{ per.perName }</SelectOptionValues>
                                    ) : (
                                        <SelectOptionValues value={ per.perId }>{ per.perName }</SelectOptionValues>
                                    )
                                ))
                            }
                        </SelectOptionType>
                        <Button type={BtnClr.SUBMIT} bg={ true } onClick={() => handleClickViewPermission(permission)}><span>&#128269;</span></Button>
                    </FilterSelectorContainer>       
                </SelectedRight>
            </RightGroup>

            <TabTitle>
                <label>Location user</label>
                { 
                    <RadioButtonContent id="locationOption">
                        <RadioButtonGroup
                            label=""
                            options={op}
                            onChange={(e) => radioGroupHandler(e)}
                        />
                    </RadioButtonContent>
                }

                <SelectedRight>
                    <FilterSelectorContainer>
                        {/* select ward, patient | drug */}
                        {/* combo box selected */}
                        <Textbox 
                            id="idWard" 
                            style={{width: "100px", pointerEvents: "none", display: optionCheck == 0 ? "block" : "none"}} 
                            defaultValue={ tmpLocationCode } value={ tmpLocationCode }
                        />
                        <SelectOptionType id="selectWard" style={{display: optionCheck == 0 ? "block" : "none"}} onChange={ (e: any) => handleOnSelectWard(e) }>
                            <SelectOptionValues value="">ไม่ระบุ</SelectOptionValues>
                            {
                                wardMaster.map( (ward: IWardMaster) => (
                                    ward.wardCode == data.userLocationCode ? (
                                        <SelectOptionValues value={ ward.wardCode } content={ ward.wardName } selected>{ ward.wardName }</SelectOptionValues>
                                    ) : (
                                        <SelectOptionValues value={ ward.wardCode } content={ ward.wardName }>{ ward.wardName }</SelectOptionValues>
                                    )
                                    
                                ))
                            }
                        </SelectOptionType>
                    </FilterSelectorContainer>
                </SelectedRight>
            </TabTitle>

            <BottomContainer>
                <Button type={BtnClr.SUBMIT} bg={ true } onClick={() => handleOnSubmit()} >
                    บันทึก
                </Button>
            </BottomContainer>
        
        </UserEditContainer>
        
    )
}

export default UserEdit;