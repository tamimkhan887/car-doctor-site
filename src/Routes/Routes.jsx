import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/LogIn/Login";
import Checkout from "../Pages/CheckOut/Checkout";
import Cart from "../Pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path:"/",
            element: <Home></Home>
        },
        {
          path: "/register",
          element: <Register></Register>
        },{
          path: "/login",
          element: <Login></Login>
        },{
          path: '/services/:id',
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
          loader : ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path: "/cart",
          element: <PrivateRoute> <Cart></Cart></PrivateRoute>
        }
    ]
  },
]);

export default router;