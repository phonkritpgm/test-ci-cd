import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
// // views 👇🏻
// // root
// import Root from "./pages/Root";
// import HomePage from "./pages";
// import ErrorPage from "./pages/ErrorPage";
// import AboutPage from "./pages/AboutPage";
// import AdminLoginPage from "./pages/AdminLoginPage";
// import KingsMessagePage from "./pages/KingsMessagePage";
// // news/
// import NewsPage from "./pages/news";
// import AddNewsPage from "./pages/news/AddNewsPage";
// // tools/
// import HpCalculatorPage from "./pages/tools/HpCalculatorPage";
// import ResourcePage from "./pages/tools/ResourcePage";
// import TroopPowerPage from "./pages/tools/TroopPowerPage";
// // commanders/
// import CommandersPage from "./pages/commanders";
// import CommanderPage from "./pages/commanders/CommanderPage";
// //
// import TestPage from "./test/TestPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "about", element: <AboutPage /> },
//       { path: "admin-login", element: <AdminLoginPage /> },
//       { path: "kings-message", element: <KingsMessagePage /> },
//       { path: "news", element: <NewsPage /> },
//       { path: "news/add-news", element: <AddNewsPage /> },
//       { path: "commanders", element: <CommandersPage /> },
//       { path: "commanders/:id", element: <CommanderPage /> },
//       { path: "tools/troop-power", element: <TroopPowerPage /> },
//       { path: "tools/resource", element: <ResourcePage /> },
//       { path: "tools/hp-calculator", element: <HpCalculatorPage /> },
//       { path: "test", element: <TestPage /> },
//     ],
//   },
// ]);

import Root from "../views/Root";
import ErrorPage from "../views/ErrorPage";
import DrugInfo from "../views/DrugInfo/DrugInfo";
import Overview from "../views/Overview/Overview";
import PatientInfo from "../views/PatientInfo/PatientInfo";
import VerifyPrescription from '../views/VerifyPrescription/VerifyPrescription';
import DispenseView from "../views/DispenseView/DispenseView";
import DrugStock from "../views/DrugStock/DrugStock";
import MachineInfo from "../views/MachineInfo/MachineInfo";
import Report from "../views/Reports/Report";
// import Setting from "../views/Setting";
import TestToolsComp from "../views/TestToolsComp/TestToolsComp";
import LotExpire from "../views/LotExpire/LotExpire";
import UserManage from "../views/UserManage/UserManage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Root><Outlet/></Root>,
    errorElement: <Root><ErrorPage/></Root>,
    children: [
      { path: "", element: <Overview /> },
      { path: "Overview", element: <Overview /> },
      { path: "PatientInfo", element: <PatientInfo /> },
      { path: "VerifyPrescription", element: <VerifyPrescription /> },
      { path: "DispenseView", element: <DispenseView /> },
      { path: "DispenseView/:view", element: <DispenseView /> },
      { path: "DrugStock", element: <DrugStock /> },
      { path: "MachineInfo", element: <MachineInfo /> },
      { path: "DrugInfo", element: <DrugInfo /> },
      { path: "LotExpireManage", element:<LotExpire/>},
      { path: "Reports", element: <Report /> },
      { path: "Reports/:view", element: <Report /> },
      { path: "Setting", element: <div>Setting</div> },
      { path: "TestTools", element: <TestToolsComp /> },
      { path: "UserManage", element: <UserManage /> },
    ],
  },
]);

export default router;