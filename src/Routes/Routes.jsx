import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";

import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import FoodCardDetails from "../Components/FoodCard/FoodCardDetails";
import PaymentWithCOD from "../Pages/Dashboard/Payment/PaymentWithCOD/PaymentWithCOD";
import PaymentWithSSLcommerz from "../Pages/Dashboard/Payment/PaymentWithSSLcommerz/PaymentWithSSLcommerz";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentWithSSLcommerz/PaymentSuccess";
import PaymentFailed from "../Pages/Dashboard/Payment/PaymentWithSSLcommerz/PaymentFailed";
import ContactUs from "../Components/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "payment/success/:tranId",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment/fail/:tranId",
        element: <PaymentFailed></PaymentFailed>,
      },
      {
        path: "food/:_id",
        element: <FoodCardDetails></FoodCardDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/menu/${params._id}`),
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "COD",
        element: <PaymentWithCOD></PaymentWithCOD>,
      },
      {
        path: "contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/sslcommerz",
        element: <PaymentWithSSLcommerz></PaymentWithSSLcommerz>,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //normal user routes
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },

      // admin only routes
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },

      {
        path: "addItems",
        element: <AddItems></AddItems>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "manageItems",
        element: <ManageItems></ManageItems>,
      },
      {
        path: "updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`https://restaurant-server-sepia.vercel.app/menu/${params.id}`),
      },

      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);
