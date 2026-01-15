import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Components/Login";
import Register from "../Components/Register";
import CartPage from "../Pages/books/CartPage";
import CheckoutPage from "../Pages/books/CheckoutPage";
import SingleBooks from "../Pages/books/SingleBooks";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../Pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../Components/AdminLogin";
import DashboardLayout from "../Pages/dashboard/DashboardLayout";
import Dashboard from "../Pages/dashboard/Dashboard";
import ManageBooks from "../Pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../Pages/dashboard/addBook/AddBook";
import UpdateBook from "../Pages/dashboard/EditBook/UpdateBook";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
       {
        path: "/",
        element: <Home/>
       },
       {
        path: "/orders",
        element: <PrivateRoute><OrderPage/></PrivateRoute>
       },
       {
        path: "/about",
        element: <h1>about</h1>
       },
       {
        path: "/login",
        element: <Login/>
       },
       {
        path: "/register",
        element: <Register/>
       },
       {
        path: "/cart",
        element: <CartPage/>
       },
       {
        path: "/checkout",
        element: <PrivateRoute><CheckoutPage/></PrivateRoute>
       },
       {
        path:"/books/:id",
        element:<SingleBooks/>
       },
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path:"/dashboard",
    element: <AdminRoute><DashboardLayout/></AdminRoute>,
    children:[
      {
        path:"",
        element: <AdminRoute><Dashboard/></AdminRoute>
      },
      {
        path:"add-new-book",
        element: <AdminRoute><AddBook/></AdminRoute>
      },
      {
        path:"edit-book/:id",
        element: <AdminRoute><UpdateBook/></AdminRoute>
      },
      {
        path:"manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
      },

    ]
  }
]);

export default router;