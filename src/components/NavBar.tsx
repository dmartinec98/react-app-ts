import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="container mx-auto bg-gray-100 shadow-md py-2 mt-5 rounded-3xl mb-10">
        <div className="flex justify-center space-x-8">
          <Link to={"/"}>
            <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </span>
          </Link>
          <Link to={"/cart"}>
            <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Cart
            </span>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
