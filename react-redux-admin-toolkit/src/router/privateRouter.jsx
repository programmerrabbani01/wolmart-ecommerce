// create private router

import PageLayout from "../components/PageLayout/PageLayout.jsx";
import Brand from "../pages/Brand/Brand.jsx";
import Category from "../pages/Category/Category.jsx";
import Product from "../pages/Product/Product.jsx";
import ProductCreate from "../pages/Product/ProductCreate.jsx";
import Tag from "../pages/Tag/Tag.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Permission from "../pages/permission/Permission.jsx";
import Role from "../pages/role/Role.jsx";
import User from "../pages/user/User.jsx";
import PrivateGard from "./PrivateGard.jsx";

const privateRouter = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateGard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/role",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
          {
            path: "/tag",
            element: <Tag />,
          },
          {
            path: "/brand",
            element: <Brand />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/createProduct",
            element: <ProductCreate />,
          },
        ],
      },
    ],
  },
];

// export router

export default privateRouter;
