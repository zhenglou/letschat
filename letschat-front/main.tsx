// import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@/styles/globals.css"
import {
  RouterProvider,
} from "react-router";
import { Toaster } from 'react-hot-toast'
import router from "@/router/index"
// const root = createRoot(document.getElementById('root')!);
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );


createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster></Toaster>
  </>
  // <StrictMode>
  //   <App />
  // </StrictMode>
)
