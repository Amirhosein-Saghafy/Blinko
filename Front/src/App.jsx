import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ui/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./store/store";

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
          path: "/chat/:id",
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

  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
