import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Signup from "./pages/Signup/Signup"
import { Main } from "./pages/Main/Main"
import { Login } from "./pages/Login/Login"
import { Layout } from "./pages/Profile/Layout"
import { Profile } from "./pages/Profile/Profile/Profile"
import { Settings } from "./pages/Profile/Settings/Settings"
import { Photos } from "./pages/Profile/Photos/Photos"
import { UserAccount } from "./pages/Profile/UserAccount/UserAccount"
function App() {
  const routes = createBrowserRouter([
    {
      path:"",
      element:<Main/>
    },
    {
      path:"/signup",
      element:<Signup/>,
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:'/profile',
      element:<Layout/>,
      children:[
        {
          path:'',
          element:<Profile/>
        },
        {
          path:':id',
          element:<UserAccount/>
        },
        {
          path:"settings",
          element:<Settings/>
        },
        {
          path:"photos",
          element:<Photos/>
        }
      ]
    }
  ]) 

  return (
    <RouterProvider router={routes}>
        
    </RouterProvider>
  )
}

export default App
