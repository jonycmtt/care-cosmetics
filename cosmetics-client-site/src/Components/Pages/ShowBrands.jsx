import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Slider from "./Slider";

const ShowBrands = () => {
  const [brands,setBrands] = useState({})
  const brandsLoader = useLoaderData();
  const {brand} = useParams()
  const idt = brand;
  console.log(idt)

  useEffect(() => {
    const findBrand = brandsLoader.filter(brands => brands.brand === idt);
    console.log(findBrand)
    setBrands(findBrand)
  },[])

  // console.log(brandsLoader);
  return (
    <>
    <Slider></Slider>
      <div className="max-w-7xl mx-auto my-16 px-3">
        <h2 className="text-xl mb-12">Show Product Items : {brands.length}</h2>

        {
            brands.length > 0 ? 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {brands.map((brands) => (
              <div key={brands._id} className="card shadow border">
                <figure className="max-h-52 border-b">
                  <img
                    className="h-full w-full"
                    src={brands.photo}
                    alt={brands.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{brands.name}</h2>
                  <p>
                    Brand Name :{" "}
                    <span className="font-semibold">{brands.brand}</span>
                  </p>
                  <p>Category : {brands.category}</p>
                  <div className="rating">
                    <Rating readOnly name="size-medium" precision={0.5} defaultValue={brands.rating} />
                    <span className="text-slate-400 text-sm mt-0.5">({brands.rating})</span>
                  </div>
                  <p>
                    Price :{" "}
                    <span className="font-semibold">${brands.price}</span>
                  </p>
                  <div className="flex justify-between items-center mt-6">
                      <Link to={`/brands/${brands._id}`}>
                          <button className="btn btn-sm btn-neutral btn-outline">Details</button>
                         
                      </Link>
                      <Link to={`/update/${brands._id}`}>
                          <button className="btn btn-sm btn-neutral btn-outline">Update</button>
                      </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          : 
          <div>
            <img className="h-72 mx-auto" src="https://i.ibb.co/Lh4DSFd/no-product-found.png" alt="" />
            {/* <span>No products found for the specified brand</span> */}
          </div>
        }
       
      </div>
    </>
  );
};

export default ShowBrands;
