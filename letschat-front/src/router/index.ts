import {
  createBrowserRouter
} from "react-router";
import App from "../../App";
import Home from "@/layouts/Home";
import Login from "@/layouts/Login";
import Friends from "@/pages/Friends";
import Messages from "@/pages/Messages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        // index:true,
        path:'home',
        Component: Home,
        children:[
          { 
              path:'friends',
              Component:Friends
          },
          {
            path:'messages',
            Component:Messages
          },
        ]
      },
      {
        index:true,
        // path:'login',
        Component: Login
      }
    ]
  }

  // {
  //   path: "auth",
  //   Component: AuthLayout,
  //   children: [
  //     { path: "login", Component: Login },
  //     { path: "register", Component: Register },
  //   ],
  // },
  // {
  //   path: "concerts",
  //   children: [
  //     { index: true, Component: ConcertsHome },
  //     { path: ":city", Component: ConcertsCity },
  //     { path: "trending", Component: ConcertsTrending },
  //   ],
  // },
// ],
  // },
]);
export default router;