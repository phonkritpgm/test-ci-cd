
import img_monitor from '../../assets/svg_icon_menu/monitoring_opsz40.svg'
import patient_profile from '../../assets/svg_icon_menu/patient_profile.svg'
import verify_prescription from '../../assets/svg_icon_menu/verify_prescription.svg'
import img_ov from '../../assets/svg_icon_menu/overview_opsz40.svg'
import img_stock from '../../assets/svg_icon_menu/summarize_opsz40.svg'
import img_robot from '../../assets/svg_icon_menu/smart_toy_opsz40.svg'
import img_drug from '../../assets/svg_icon_menu/vaccines_opsz40.svg'
import lot_number from '../../assets/svg_icon_menu/lot_number.svg'
import img_report from '../../assets/svg_icon_menu/add_chart_opsz40.svg'
import img_setting from '../../assets/svg_icon_menu/settings_opsz40.svg'
// import img_arr_down from '../../assets/svg_icon_menu/arrow_down_opsz40.svg'

export const links = [
    {
        id: 0,
        url: '/Overview',
        text: {'EN':'Overview', 'TH':"ภาพรวม"},
        alt: "overview program",
        ico: img_monitor,
        color: "#1877f2",
        enable: true,
    },
    {
        id: 1,
        url: '/VerifyPrescription',
        text: {'EN':'Verify Prescription', 'TH':"ตรวจสอบใบสั่งยา"},
        alt: "Verify Prescription",
        ico: verify_prescription,
        color: "#1877f2",
        enable: true,
    },
    {
        id: 2,
        url: '/PatientInfo',
        text: {'EN':'PatientInfo', 'TH':"ข้อมูลผู้ป่วย"},
        alt: "PatientInfo",
        ico: patient_profile,
        color: "#1877f2",
        enable: true,
    },
    {
        id: 3,
        url: '/DispenseView',
        text: {'EN':'DispenseView', 'TH':"ข้อมูลเบิกจ่ายยา"},
        alt: "dispensing view",
        ico: img_ov,
        color: "#1877f2",
        enable: true,
    },
    {
        id: 4,
        url: '/DrugStock',
        text: {'EN':'Stock current', 'TH':"จำนวนยาคงเหลือ"},
        alt: "Stock current amount",
        ico: img_stock,
        color: "#1877f2",
        enable: true,
    },
    {
        id: 5,
        url: '/MachineInfo',
        text: {'EN':'MachineInfo', 'TH':"ข้อมูลเครื่อง"},
        alt: "machine information",
        ico: img_robot,
        color: "#25d366",
        enable: true,
    },
    {
        id: 6,
        url: '/DrugInfo',
        text: {'EN':'MachineInfo', 'TH':"ข้อมูลยา"},
        alt: "drug master",
        ico: img_drug,
        color: "#1da1f2",
        enable: true,
    },
    {
        id: 7,
        url: '/LotExpireManage',
        text: {'EN':'MachineInfo', 'TH':"Lot exp."},
        alt: "Lot number expire",
        ico: lot_number,
        color: "#FF5733",
        enable: true,
    },
    {
        id: 8,
        url: '/Reports',
        text: {'EN':'Report', 'TH':"รายงาน"},
        alt: "Reports medication",
        ico: img_report,
        color: "#0a66c2",
        enable: true,
    },
    {
        id: 9,
        url: '/Setting',
        text: {'EN':'Setting', 'TH':"ตั้งค่า"},
        alt: "setting program",
        ico: img_setting,
        color: "#c32aa3",
        enable: false,
    },
    {
        id: 10,
        url: '/TestTools',
        text: {'EN':'TestTools', 'TH':"TestTools"},
        alt: "TestTools",
        ico: img_setting,
        color: "#c32aa3",
        enable: false,
    },
    {
        id: 11,
        url: '/UserManage',
        text: {'EN':'UserManage', 'TH':"ข้อมูลผู้ใช้งาน"},
        alt: "UserManage",
        ico: img_setting,
        color: "#c32aa3",
        enable: true,
    },
  ];
  
// #1b1e21
// #ff0000


//   export const social = [
//     {
//       id: 1,
//       url: 'https://www.twitter.com',
//       icon: "",
//     },
//     {
//       id: 2,
//       url: 'https://www.twitter.com',
//       icon: "",
//     },
//     {
//       id: 3,
//       url: 'https://www.twitter.com',
//       icon: "",
//     },
//     {
//       id: 4,
//       url: 'https://www.twitter.com',
//       icon: "",
//     },
//   ];