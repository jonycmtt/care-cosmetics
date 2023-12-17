import { useContext, useEffect, useState } from "react";
import Slider from "./Slider"
import Category from "./Category";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CategoryAll = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/product/")
          .then((res) => res.json())
          .then((data) => setCategories(data));
      }, []);
      const { loading } = useContext(AuthContext);
      if (loading) {
        return (
          <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        );
      }
  return (
    <div>
        <Slider></Slider>
      {/* <Category></Category> */}
      <div className="my-20 max-w-7xl mx-auto">
          <h1 className="text-center text-3xl font-bold mb-10">
            Category Gallery
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Category key={category._id} category={category}></Category>
            ))}
          </div>
        </div>
    </div>
  )
}

export default CategoryAll
