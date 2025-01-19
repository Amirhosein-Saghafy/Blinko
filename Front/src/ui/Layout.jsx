import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full">
      <div className="w-10/12 mx-auto">
        <h1>hello</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
