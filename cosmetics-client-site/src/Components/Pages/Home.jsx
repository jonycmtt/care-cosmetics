import { Link, useLoaderData } from "react-router-dom";
import Banner from "../Header/Banner";
import Brands from "./Brands";
import { useContext, useEffect, useState } from "react";
import Category from "./Category";
import ClientSays from "./ClientSays";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Home = () => {
  const loaderProduct = useLoaderData();
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
      <Banner></Banner>
      <div className="my-16 max-w-7xl mx-auto px-3">
        <h1 className="text-center text-3xl font-bold mb-10">Brand Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loaderProduct.map((brand) => (
            <Brands key={brand.id} brand={brand}></Brands>
          ))}
        </div>
        <div className="my-20">
          <img src="https://i.ibb.co/sP0rSLw/Banner1.jpg" alt="" />
        </div>
        <div>
          <h1 className="text-center text-3xl font-bold mb-10">
            Top Category Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0,6).map((category) => (
              <Category key={category._id} category={category}></Category>
            ))}
          </div>
          <div className="text-center my-12">
            <Link to='/category'>
              <button className="btn btn-neutral">Show All</button>
            </Link>
          </div>
        </div>
        {/* slider */}
        <div className="my-20">
          <h1 className="text-center text-3xl font-bold mb-10">
          What Customer Says
          </h1>
          <ClientSays></ClientSays>
        </div>
      </div>
    </div>
  );
};

export default Home;
