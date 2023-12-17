import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [theme,setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const handleToggle = (e) => {
    if(e.target.checked) {
      setTheme('dark');
      toast.success('Dark Mode!')
    }
    else{
      setTheme('light')
      toast.success('Light Mode!')
    }
  }

  useEffect(()=> {
    localStorage.setItem("theme",theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme",localTheme)
  },[theme])

  const { user, logOutUser, loading } = useContext(AuthContext);
  // const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  const handleLogOut = () => {
    
    logOutUser()
      .then((result) => {
        console.log(result);
        toast.success('LogOut');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const navItems = (
    <>
      <li className="text-[18px]">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-[18px]">
        <NavLink
          to="/addProduct"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Add Product
        </NavLink>
      </li>
      <li className="text-[18px]">
        <NavLink
          to="/category"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Category
        </NavLink>
      </li>
      <li className="text-[18px]">
        <NavLink
          to="/review"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Review
        </NavLink>
      </li>
      {
        user && <li className="text-[18px]">
        <NavLink
          to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
      }
      <li className="text-[18px]">
        <NavLink
          to="/cart"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-rose-600" : ""
          }
        >
          My Cart
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar px-3 lg:px-2 max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <h2 className="md:text-3xl font-bold">Care Cosmetics</h2>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-4 menu-horizontal px-1">{navItems}</ul>
      </div>

      <div className="navbar-end">
      <label className="swap swap-rotate md:mr-4">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={handleToggle} checked={theme === "light" ? false : true} />

          {/* sun icon */}
          <svg
            className="swap-on fill-current w-5 h-5 md:w-7 md:h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-5 h-5 md:w-7 md:h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 md:w-10 rounded-full">
                {user ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="https://i.ibb.co/rMhddk4/istockphoto-476085198-612x612.jpg" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[999] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72"
            >
              <li>
                <h2 className="text-lg font-bold capitalize">
                  {user.displayName}
                </h2>
                <p>Email : {user.email}</p>
              </li>
              <li className="mt-4">
                <button
                  onClick={handleLogOut}
                  className="btn btn-neutral btn-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-neutral btn-sm md:btn-md ml-2">Login</button>
          </Link>
        )}

        {/* dark mode */}

       
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
