import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ErrorElement = () => { 
  const {loading} = useContext(AuthContext);
  if (loading) {
    return (
      <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <img
        className="w-72"
        src="https://i.ibb.co/ScJ5Vht/8157731-404-error-sign-removebg-preview.png"
        alt=""
      />
      <p className="text-5xl">Not found page</p>
      <Link className="/">
        <button className="btn btn-neutral my-6">Go Home</button>
      </Link>
    </div>
  );
};

export default ErrorElement;
