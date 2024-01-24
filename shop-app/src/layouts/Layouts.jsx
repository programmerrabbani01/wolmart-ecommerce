import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import { Outlet } from "react-router-dom";

const Layouts = () => {
  return (
    <>
      <div className="page-wrapper">
        <Header />

        <Outlet />

        <Footer />
      </div>
    </>
  );
};

export default Layouts;
