import { Outlet } from "react-router-dom";
import Header from "../Header/Header.jsx";
import SideBar from "../SideBar/SideBar.jsx";

const PageLayout = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />

        <SideBar />

        {/* <!-- Page Wrapper --> */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <Outlet />
          </div>
        </div>
        {/* <!-- /Page Wrapper --> */}
      </div>
    </>
  );
};

export default PageLayout;
