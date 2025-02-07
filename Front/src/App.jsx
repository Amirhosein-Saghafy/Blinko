import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
