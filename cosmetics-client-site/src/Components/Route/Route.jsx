import { createBrowserRouter } from "react-router-dom"
import Root from "../Root/Root"
import ErrorElement from "../ErrorElement/ErrorElement"
import Home from "../Pages/Home"
import AddProducts from "../Pages/AddProducts"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import MyCart from "../Pages/MyCart"
import ShowBrands from "../Pages/ShowBrands"
import ProductDetails from "../Pages/ProductDetails"
import UpdateProduct from "../Pages/UpdateProduct"
import PrivateRoute from "./PrivateRoute"
import Category from "../Pages/Category"
import CartItems from "../Pages/CartItems"
import CategoryAll from "../Pages/CategoryAll"
import Review from "../Pages/Review"
import Dashboard from "../Pages/Dashboard"

const Route = createBrowserRouter([
    {
        path : '/',
        element : <Root></Root>,
        errorElement :<ErrorElement></ErrorElement>,
        children : [
            {
                path : '/',
                element : <Home></Home>,
                loader : () => fetch('http://localhost:5000/brands')
            },
            {
                path : 'product/:brand',
                element : <ShowBrands></ShowBrands>,
                loader : () => fetch('http://localhost:5000/product')
            },

            {
                path : '/brands/:id',
                element : <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                loader : ({params}) => fetch(`http://localhost:5000/product/${params.id}`)
            },

            {
                path : 'addProduct',
                element : <PrivateRoute><AddProducts></AddProducts></PrivateRoute>
            },
            {
                path : 'cart',
                element : <PrivateRoute><MyCart></MyCart></PrivateRoute>,
                loader : () => fetch('http://localhost:5000/cart')
               
            },
            {
                path : '/update/:id',
                element : <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>,
                loader : ({ params }) => fetch(`http://localhost:5000/product/${params.id}`)
            },
            {
                path :'login',
                element : <Login></Login>
            },
            {
                path :'register',
                element : <Register></Register>
            },
            {
                path :'category',
                element : <CategoryAll></CategoryAll>
            },
            {
                path :'review',
                element : <Review></Review>
            },
            {
                path :'dashboard',
                element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
        ]
    }
])

export default Route
