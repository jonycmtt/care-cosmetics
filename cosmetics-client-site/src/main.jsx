import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Route from './Components/Route/Route.jsx'
import AuthProvider from './Components/AuthProvider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
    <RouterProvider router={Route}></RouterProvider>
   </AuthProvider>
  </React.StrictMode>,
)