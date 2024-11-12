import React from "react" ;
import ReactDOM from "react-dom/client" ;
import Header from "./Header";
import Card_Layout from "./Card";
import { createBrowserRouter , Outlet, RouterProvider } from "react-router-dom";
import JobDetails from "./jobDetails";
import Form from "./Form";

const App = ()=>(
    <>
    <Header />
    <Outlet />
    </>
)

const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[{
            path:"/",
            element:<Card_Layout />
        } , {
            path:"/jobdescription/:id" , 
            element:<JobDetails />
        }
        
    ]
    }
    , {
        path:"/form", 
        element:<Form />
    }
])

const root = ReactDOM.createRoot(document.getElementById("root")) ;
root.render(<RouterProvider router = {router} />)