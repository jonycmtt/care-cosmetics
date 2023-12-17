import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const { createUser, updateProfileInfo,googleLogin,setLoading,loading } = useContext(AuthContext);


  const navigate = useNavigate()
  const location = useLocation()

  if (loading) {
    return (
      <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    console.log(name, photoUrl, email, password);


    if (password < 6) {
      setRegisterError("Please enter 6 character  Password");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password must contain at least one uppercase letter."
      );
      return;
    } else if (!/[!,#,$,%,*,@]/.test(password)) {
      setRegisterError("Your password must be added !,#,$,%,*.");
      return;
    }
    setRegisterError("");

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateProfileInfo(result.user, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            console.log("profile updated");
            Navigate("/");
            toast.success('Registration Success.');
          })
          .catch((error) => console.log(error));
          setLoading(false)
          navigate('/')
          
      })
      .catch((error) => {
        console.error(error.message);
        setRegisterError("Password should be at least 6 characters");
      });
  };


  const handleGoogle = () => {
    googleLogin()
    .then(result => {
      console.log(result.user)
      navigate(location?.state ? location.state : "/");
      toast.success('Registration Success.');
    }).catch(error => {
      console.error(error.message)
    })
  }
  return (
    <div>
      <div className="lg:w-[600px] md:w-3/4 w-full mx-auto border-2 rounded-lg p-5 mb-6">
        <form onSubmit={handleRegister} className="">
          <h2 className="text-center font-bold text-2xl">Please Register</h2>
          <div className="text-center my-2">
            {registerError && (
              <span className="text-rose-500">{registerError}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name </span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL </span>
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
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
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Register
            </button>
          </div>
        </form>
        <p className="text-center">
          Already have an account ? Please{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
        <div className="my-4">
          <button onClick={handleGoogle} className="flex w-full items-center gap-6 btn btn-primary btn-outline text-white">
            <FcGoogle className="text-2xl"></FcGoogle>
            <span>Login With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
