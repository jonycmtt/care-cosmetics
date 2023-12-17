// import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useContext } from "react";
import {useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const ProductDetails = () => {
  const detailsProduct = useLoaderData();
  const {user} = useContext(AuthContext)
  const email = user.email
  console.log(email)
  // console.log(detailsProduct);
  const { photo, name, description, price, rating, category, brand } =
    detailsProduct;

  const sendDetailsData = {email,brand,name,price,photo}
  console.log(sendDetailsData)

  const handleCart = () => {
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDetailsData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Product Added to Cart',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      })
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto py-6 lg:py-20 px-3">
      <div className="w-full border rounded-lg p-3">
        <img
          className="max-h-[500px] mx-auto w-full"
          src={photo}
          alt=""
        />
      </div>
      <div className="w-full">
        <h2 className="text-3xl">{name}</h2>
        <p className="mb-2">{description}</p>
        <p className="text-xl font-semibold">Price : ${price}</p>
        <p className="text-lg font-semibold">20 Items sold in last 3 days</p>

        <div className="my-8">
          <h2 className="text-xl mb-2">Product Rating : </h2>
          <div className="rating">
            <Rating
              readOnly
              name="size-medium"
              precision={0.5}
              defaultValue={rating}
            />
            <span className="text-slate-400 text-sm mt-0.5">({rating})</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Category : <span className="text-lg font-normal">{category}</span>
          </h2>
          <h2 className="text-xl font-semibold mb-2">
            Brand : <span className="text-lg font-normal">{brand}</span>
          </h2>

          <div className="mt-10">
            <button
              onClick={handleCart}
              className="btn btn-neutral btn-outline"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
