import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "./features/auth/authApiSlice.js";
import {
  getAllPermission,
  getAllRole,
  getAllUser,
} from "./features/user/userApiSlice.js";
import {
  getAllBrand,
  getAllCategories,
  getAllTag,
} from "./features/product/productApiSlice.js";

// import Cookie from "js-cookie";

function App() {

  const dispatch = useDispatch();

  // httpOnly true thakle react theke cookie access kora jabe na
  
  // console.log(Cookie.get("accessToken"));

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedInUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPermission());
    dispatch(getAllRole());
    dispatch(getAllUser());
    dispatch(getAllTag());
    dispatch(getAllBrand());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
