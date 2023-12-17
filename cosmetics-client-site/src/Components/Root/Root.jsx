import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Root = () => {
  // const { loading } = useContext(AuthContext);
  // if (loading) {
  //   return (
  //     <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
