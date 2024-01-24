// create public router

import Account from "../pages/Account/Account.jsx";
import Cart from "../pages/cart/Cart.jsx";
import CheckOut from "../pages/checkOut/CheckOut.jsx";
import Home from "../pages/home/Home.jsx";
import Shop from "../pages/shop/Shop.jsx";
import SingleShop from "../pages/shop/singleShop/SingleShop.jsx";

const publicRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/:id",
    element: <SingleShop />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkOut",
    element: <CheckOut />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

// export router

export default publicRouter;
