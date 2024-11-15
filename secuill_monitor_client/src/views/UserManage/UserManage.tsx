
import styled from "styled-components";
import { PageContainer, PageFooterSpaceContainer } from "../../styled";
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import PopupInfoChild from "../../components/Popups/PopupInfoChild/PopupInfoChild";
import { useCallback, useEffect, useState } from "react";
import UserEdit from "./UserEdit";
import { IPermission, IUser, IWardMaster } from "../../interface/IUsers";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { LoadingPage } from "../_LoadingPage/LoadingPage";
import { getAllUsers, getUserPermission, getWardMaster } from "../../store/slices/userSlice";

const TabSearch = styled.div<any>`
    width: 100%;
    height: auto;
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 10px;
`;

const UserContainer = styled.div<any>`
    position: relative;
    width: 70%;
    height: auto;
    left: 50%;
    transform: translateX(-50%);

    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 10px;

    @media screen and (max-width: 1000px) {
        width: 85%;
    }
`;

const UserLists = styled.div<any>`
    width: 100%;
    height: auto;  
`;

const TableUser = styled.table<any>`
    width: 100%;
    height: auto;

    tr td{
        line-height: 40px;
        border-bottom: solid 1px silver;
    }

    tr th{
        font-size: 0.8rem;
        font-weight: 600;
        padding: 10px 0;
    }

    tr th: nth-child(1){
        width: 50%;
        text-align: left;
        padding-left: 30px;
    }
    tr th: nth-child(2){
        width: 30%;
        text-align: left;
        padding-left: 30px;
    }
    tr th: nth-child(3){
        width: 20%;
        text-align: left;
        padding-left: 30px;
        padding-right: 30px;
    }
    tr td{
        font-size: 0.7rem;
        text-align: left;
        padding-left: 30px;
    }
`;

const UserManage = () => {

    const dataUsers: IUser[] = useSelector((state: any) => state.user.dataListUsers.data)
    const dataUsersLoading: boolean = useSelector((state: any) => state.user.dataListUsers.loading)
    // const dataPermission: IPermission[] = useSelector(( state: any ) => state.dataPermission.data);
    const [ permission, setPermission ] = useState<IPermission[]>();
    const [ wardMaster, setWardMaster ] = useState<IWardMaster[]>();
    const dispatch = useDispatch<AppDispatch>();

    const [ visiblePopup, setVisiblePopup ] = useState<boolean>(false);
    const [ useSelectedData, setUseSelectedData ] = useState<IUser>();

    const onClickEdit = (data: IUser) => {
        setUseSelectedData(data);
        setVisiblePopup(true);
    }

    const fetchPermission = useCallback(async () => {
        const response: any = await dispatch(getUserPermission());
        setPermission(response.payload.payload);

        const responseWard: any = await dispatch(getWardMaster());
        setWardMaster(responseWard.payload.payload);

    }, [])

    useEffect(() => {
        dispatch(getAllUsers());
        fetchPermission();
    }, [])

    return (
        <PageContainer>
            <div className="root_title">
                <h4>ข้อมูลผู้ใช้งาน</h4>
            </div>
            <hr />

            <UserContainer>
                <TabSearch>
                    <Textbox/>
                    <Button type={BtnClr.SEARCH} bg={ true } onClick={() => {}} >
                        ค้นหา
                    </Button>
                </TabSearch>

                <UserLists>
                    <TableUser>
                        <thead>
                            <tr>
                                <th>ชื่อผู้ใช้งาน</th>
                                <th>ตำแหน่ง</th>
                                <th>กลุ่มสิทธิ์</th>
                                <th>แก้ไข</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataUsersLoading == true ? (
                                    <tr>
                                        <td colSpan={ 4 } >
                                            <div>Loading data . . . !</div>
                                            <LoadingPage></LoadingPage>
                                        </td>
                                    </tr>
                                ) : dataUsers == undefined ? (
                                    <div>undefined</div>
                                ) : dataUsers.length == undefined || dataUsers.length <= 0 ? (
                                    <div>length</div>
                                ) : (
                                    dataUsers.map((data: IUser) => (
                                        <tr>
                                            <td>{data.userFullName}</td>
                                            <td>{data.userLocationName}</td>
                                            <td>{data.perName}</td>
                                            <td>
                                                <Button type={BtnClr.EDIT} bg={ true } onClick={() => onClickEdit(data)} >
                                                    <span>&#128393;</span> แก้ไข
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )                     
                            }
                        </tbody>
                    </TableUser>
                </UserLists>

            </UserContainer>

            <PopupInfoChild
                // key={PatientInfo.name}
                onClose={(e) => setVisiblePopup(e)}
                show={visiblePopup}
                bgClose={ false }
                title="แก้ไขข้อมูล User"
            >
                <UserEdit data={ useSelectedData } permission={ permission } wardMaster={ wardMaster } />
            </PopupInfoChild>

            <PageFooterSpaceContainer>

            </PageFooterSpaceContainer>
        </PageContainer>
    )
}
export default UserManage;