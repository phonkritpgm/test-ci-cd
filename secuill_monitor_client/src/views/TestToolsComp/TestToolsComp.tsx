//@ts-nocheck
import Button, { BtnClr } from "../../components/ToolsComp/button/Button/Button";
import Textbox from "../../components/ToolsComp/Textbox/Textbox";
import DatetimePicker from "../../components/ToolsComp/input/DatetimePicker/DatetimePicker";
import { ChangeEvent, MouseEvent, useState} from "react";
import MessageBox from "../../components/Popups/MessageBox/MessageBox";
import TabView, { ITableView } from "../../components/ToolsComp/TabMenu/TabView";

import ErrorPage from "../ErrorPage";
import Overview from "../Overview/Overview";
import DrugManagement from '../DrugInfo/DrugManagement';
import MachineInfo from "../MachineInfo/MachineInfo";
import DrugInfo from "../DrugInfo/DrugInfo";

// test login
import Login from "../Authentication/Login";

// test dialog
import Dialog, { buttonType, messageType } from "../../components/Popups/Dialog/Dialog"

// test popup
import PopupInfoChild from "../../components/Popups/PopupInfoChild/PopupInfoChild";

import RadioButtonGroup from '../../components/ToolsComp/radioButton/ReadioButtonGroup';
import RadioButton from "../../components/ToolsComp/radioButton/radioButton";
import GroupBox from '../../components/ToolsComp/groupBox/groupBox';
// import test report
import { ClassComponentText } from "./TestReactPrint";
import { ClassComponentContextConsumer } from "./TestToolsComp2";

const TestToolsComp = () => {
    // popup
    const [visibility, setVisibility] = useState(false);
    const [visibility2, setVisibility2] = useState(false);

    const [ visibleDialog1, setVisibleDialog1] = useState(false);

    const popupCloseHandler = (e: boolean) => {
        setVisibility(e);
        setVisibility2(e);
    };

    // handle click ref input textbox
    const handleClickTextbox = (event: MouseEvent) => {
        const elem: any = event.target; 
        // cconsole.log(elem.value);
    }

    const handleTextChange = (event: ChangeEvent) => {
        const elem: any = event.target;
        // cconsole.log(elem.value);
    }
    // -----------------------------

    const onClick_Close = (e) => {

        Dialog.removeDialogMain();
        // cconsole.log("onClick_Close", e);
    }

    const onCloseDialogManage = () => {
        // cconsole.log("onCloseDialogManage");
    }

    // TabView
    const tabViewData: ITableView[] = [
        // {
        //     tabName: "TabView_1",
        //     tabIco: undefined,
        //     tabContent: <Overview/>,
        // },
        // {
        //     tabName: "TabView_2",
        //     tabIco: undefined , 
        //     tabContent: <MachineInfo/>,
        // },
        // {
        //     tabName: "TabView_3",
        //     tabIco: undefined,
        //     tabContent: <DrugInfo/>,
        // },
        // {
        //     tabName: "TabView_4",
        //     tabIco: undefined,
        //     tabContent: <ErrorPage />,
        // }
    ]
    // -----------------------------


    return(
        <div className="root_ov_container">
            <div className="root_title">
                <h4>Test tools . . .</h4>
            </div>
            <hr />

            <div style={
                {
                    width: '100%',
                    height: '100%'
                }
            }>
                
                <p style={{ marginTop: '10px' }}>button</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>
                    <Button type={ BtnClr.ADD } bg={ true } onClick={() => {}} >
                        Add
                    </Button>
                    <Button type={ BtnClr.EDIT } bg={ true } onClick={() => {}} >
                        Edit
                    </Button>
                    <Button type={ BtnClr.DELETE } bg={ true } onClick={() => {}} >
                        Delete
                    </Button>
                    <Button type={ BtnClr.BACK } bg={ true } onClick={() => {}} >
                        { '< Back' }
                    </Button>
                    <Button type={ BtnClr.NEXT } bg={ true } onClick={() => {}} >
                        { 'Next >' }
                    </Button><Button type={ BtnClr.OK } bg={ true } onClick={() => {}} >
                        OK
                    </Button>
                    <Button type={ BtnClr.RETRY } bg={ true } onClick={() => {}} >
                        Retry
                    </Button>
                    <Button type={ BtnClr.CANCEL } bg={ true } onClick={() => {}} >
                        Cancel
                    </Button>
                    <Button type={ BtnClr.SUBMIT } bg={ true } onClick={() => {}} >
                        Submit
                    </Button>
                </div>

                <hr />

                <p style={{ marginTop: '10px' }}>Textbox</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    <Textbox
                        placeholder="@email test placeholder"
                        maxLength={25}
                        onClick={ (e: MouseEvent) => handleClickTextbox(e) }
                        onChange={(e: ChangeEvent) => handleTextChange(e)}
                        
                        >             
                    </Textbox>

                </div>

                <p style={{ marginTop: '10px' }}>Label ( fill & border & circle )</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    
                </div>

                <p style={{ marginTop: '10px' }}>Checkbox</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    
                </div>

                <p style={{ marginTop: '10px' }}>Combobox</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    
                </div>

                <p style={{ marginTop: '10px' }}>RadioButton</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    <RadioButtonGroup
                        label="Group RedioButton:"
                        options={ [
                            {
                              label: "Coffee",
                              name: "button-types",
                              disabled: true,
                            },
                            {
                              label: "Tea",
                              name: "button-types",
                            },
                          ]}
                        onChange={()=>{}}
                    />
                    <RadioButton label="Rediobuttom" disabled={false}  onChange={()=>{}}/>
                </div>

                <p style={{ marginTop: '10px' }}>DatetimePicker</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    <DatetimePicker date={new Date().toUTCString()} setDate={() => {}} />
                </div>

                <p style={{ marginTop: '10px' }}>Popup MessageBox</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>
                    <MessageBox
                        onClose={popupCloseHandler}
                        show={visibility}
                        title="Authentication"
                    >
                        test
                        test
                    </MessageBox>

                    {/* <PopupLogin
                        onClose={popupCloseHandler}
                        show={visibility}
                        title="Authentication"
                    >
                        {
                            visibility == true ? <Login/> :<div />
                        }
                        
                    </PopupLogin> */}

                    {/* <Login/> */}

                    <Button type={ BtnClr.ADD } bg={ true } onClick={() => setVisibility(!visibility)} >
                        Show MessageBox
                    </Button>

                    <Button type={ BtnClr.EDIT } bg={ true } onClick={() => setVisibility(!visibility2)} >
                        Show MessageBox2
                    </Button>

                    <Button type={ BtnClr.EDIT } bg={ true } 
                        onClick={() => Dialog.open((e) => onClick_Close(e), 
                                                    "ทดสอบ แจ้งเตือน 1234"
                                                    , ""
                                                    , buttonType.OK
                                                    , messageType.Info
                                                )}
                    >
                        Show Dialog Create to main body
                    </Button>
                    
                    <PopupInfoChild
                        onClose={(e) => {setVisibleDialog1(e)}}
                        show={visibleDialog1}
                        bgClose={true}
                        title={"Test Dialog manage data."}
                    >
                        <DrugManagement></DrugManagement>
                    </PopupInfoChild>
                    <Button type={ BtnClr.EDIT } bg={ true } onClick={() => setVisibleDialog1(!visibleDialog1)} >
                        Show Dialog Manage data
                    </Button>
                    
                </div>

                <p style={{ marginTop: '10px' }}>TabMenuBar</p>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    margin: '15px 0',
                }}>                  
                    <TabView tabViewData={ tabViewData }>{""}</TabView>
                </div>
                    <p style={{ marginTop: '10px' }}>GroupBox</p>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        margin: '15px 0',
                    }}>    
                    <GroupBox/>
                </div>

                {/* --------------- test report --------------- */}
                {/* https://codesandbox.io/p/sandbox/magical-babycat-rzdhd?file=%2Fexamples%2FClassComponentText%2Findex.js%3A44%2C22 */}
                {/* https://www.youtube.com/watch?v=xrlpJ2QRPNY */}
                <ClassComponentContextConsumer/>
                
                <div className="test-report">
                    <ClassComponentText></ClassComponentText>
                </div>
                
            </div>
            
            
        </div>
    )
}

export default TestToolsComp;
