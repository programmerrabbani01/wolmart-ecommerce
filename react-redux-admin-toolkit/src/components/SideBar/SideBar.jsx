import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser.jsx";

const SideBar = () => {
  const location = useLocation();

  const { user } = useAuthUser();

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>

              {user?.role?.permissions?.includes("Dashboard") && (
                <li
                  className={` ${location.pathname === "/" ? "active" : ""} `}
                >
                  <Link to="/">
                    <i className="fe fe-home"></i> <span>Dashboard</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Orders") && (
                <li className="">
                  <Link to="">
                    <i className="fe fe-bolt"></i> <span>Orders</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Products") && (
                <li
                  className={` ${
                    location.pathname === "/product" ? "active" : ""
                  } `}
                >
                  <Link to="/product">
                    <i className="fe fe-bolt"></i> <span>Products</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Category") && (
                <li
                  className={` ${
                    location.pathname === "/category" ? "active" : ""
                  } `}
                >
                  <Link to="/category">
                    <i className="fe fe-bolt"></i> <span>Category</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Tag") && (
                <li
                  className={` ${
                    location.pathname === "/tag" ? "active" : ""
                  } `}
                >
                  <Link to="/tag">
                    <i className="fe fe-bolt"></i> <span>Tag</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Brands") && (
                <li
                  className={` ${
                    location.pathname === "/brand" ? "active" : ""
                  } `}
                >
                  <Link to="/brand">
                    <i className="fe fe-bolt"></i> <span>Brands</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Users") && (
                <li
                  className={` ${
                    location.pathname === "/user" ? "active" : ""
                  } `}
                >
                  <Link to="/user">
                    <i className="fe fe-user"></i> <span>Users</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Role") && (
                <li
                  className={` ${
                    location.pathname === "/role" ? "active" : ""
                  } `}
                >
                  <Link to="/role">
                    <i className="fa fa-anchor"></i> <span>Role</span>
                  </Link>
                </li>
              )}

              {user?.role?.permissions?.includes("Permission") && (
                <li
                  className={` ${
                    location.pathname === "/permission" ? "active" : ""
                  } `}
                >
                  <Link to="/permission">
                    <i className="fa fa-lock"></i> <span>Permission</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default SideBar;
