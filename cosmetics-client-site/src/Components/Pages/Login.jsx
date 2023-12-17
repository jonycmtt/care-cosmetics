
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [errorMessage,setErrorMessage] = useState('')
  const {loginUser,googleLogin,setLoading} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  
  setLoading(false)
  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email,password);

    loginUser(email,password)
    .then(result => {
      console.log(result.user)
     
      // get access token
      const user = {email};

      axios.post('http://localhost:5000/jwt', user , {withCredentials : true})
      .then(res => {
        console.log(res.data)
        if(res.data.success) {
          navigate(location?.state ? location.state : "/");
        }
      }) 
     
      toast.success('Login success.');

    }).catch(error => {
      console.error(error.message);
      setErrorMessage("'Email and password do not match!'")
    })
  }

  const handleGoogle = () => {
    googleLogin()
    .then(result => {
      console.log(result.user)
      navigate(location?.state ? location.state : "/");
      toast.success('Login success.');
    }).catch(error => {
      console.error(error.message)
    })
  }

  return (
    <>
      <div className="lg:w-1/3 md:w-3/4 w-full mx-auto border-2 mt-10 rounded-lg p-5">
        <form
          onSubmit={handleLogin}
          className="pb-2  px-5 md:px-0"
        >
          <h2 className="text-center font-bold text-2xl">Please Login</h2>

          <div className="text-center">
            {errorMessage && (
              <span className="text-lg text-red-600">{errorMessage}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Login
            </button>
          </div>
        </form>
        <p className="text-center my-2">
        Do not have an account? Please{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </p>
        <div className="my-4">
          <button onClick={handleGoogle} className="flex w-full items-center gap-6 btn btn-primary btn-outline text-white">
            <FcGoogle className="text-2xl"></FcGoogle>
            <span>Login With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
