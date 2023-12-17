import Swal from "sweetalert2";
import ClientSays from "./ClientSays";
import Slider from "./Slider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Review = () => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
  const handleReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const review = form.review.value;
    const userImg = form.photo.value;
    const emotion = form.emotion.value;
    console.log(name, email, review, userImg);

    const reviewCart = {
      name,
      email,
      review,
      userImg,
      emotion
    };

    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewCart),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Review Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        navigate('/review')
        // console.log(data);
        form.reset();
      });
  };
  return (
    <div>
      <Slider></Slider>
      <div className="my-20 max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-10">
          Show Products Review
        </h1>
        <ClientSays></ClientSays>

        <div className="my-12">
          <h1 className="text-center text-3xl font-bold mb-10">
          Create Review 
        </h1>
          {
            user ? <div className="lg:w-2/3 md:w-3/4 w-full mx-auto border-2 mt-10 rounded-lg p-5">
            <form onSubmit={handleReview} className="pb-2  px-5 md:px-0">
              {/* <h2 className="text-center font-bold text-2xl">
                {" "}
                Create Review{" "}
              </h2> */}
              <div className="flex flex-col md:flex-row gap-2">
                <div className="form-control w-full   ">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control w-full">
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
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Write Your Review</span>
                </label>
                <textarea
                  required
                  className="input input-bordered w-full h-32 resize-none"
                  placeholder="Write Your Review"
                  name="review"
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Photo</span>
                </label>

                <textarea
                  required
                  className="input input-bordered w-full h-32 resize-none"
                  placeholder="Enter Photo url"
                  name="photo"
                ></textarea>
              </div>
              <div className="my-2">
                <h2>Your Emotion :</h2>
                <select name="emotion" className="mt-2 select select-bordered w-full">
                  <option disabled selected>
                    Your Emotion
                  </option>
                  <option value="Good">Good</option>
                  <option value="Better">Better</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Bad">Bad</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-neutral">
                Review
                </button>
              </div>
            </form>
          </div>
          : 
          <div>
            <p className="text-xl text-center text-rose-400">You can login first, then you write review... Please <Link className="text-green-600" state={location.pathname} to='/login'>Review</Link> </p>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Review;
