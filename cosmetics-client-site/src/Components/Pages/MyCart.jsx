import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CartItems from "./CartItems";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const MyCart = () => {
  
  const { user } = useContext(AuthContext);

  const cartLoader = useLoaderData();
  const [carts, setCarts] = useState(cartLoader);

  useEffect(() => {
    const userProducts = carts.filter(
      (products) => products.email === user.email
    );
    setCarts(userProducts);
  }, []);

  
 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            const remaining = carts.filter((cart) => cart._id !== id);
            setCarts(remaining);
          });
      }
    });
  };
  const handleOrder = () => {
    toast.success('Order Confirm')
  }
  return (
    <div className="max-w-6xl mx-auto my-12">
      <div className="flex gap-12 flex-col lg:flex-row px-3">
        <div className="w-full lg:w-2/3 border p-5 rounded-md">
          <h1 className="text-2xl font-semibold text-center mb-10">
            Shopping Cart
          </h1>
          {carts.length > 0 ? (
            <div className="grid grid-cols-1 gap-10 border p-3 md:p-12 rounded-md">
              {carts.map((cart) => (
                <CartItems
                  handleDelete={handleDelete}
                  key={cart._id}
                  cart={cart}
                ></CartItems>
              ))}
            </div>
          ) : (
            <div className="text-center my-12">
              <img
                className="w-60 mx-auto"
                src="https://i.ibb.co/pnzTVvF/shopping-venture-2614015-1280.png"
                alt=""
              />
              <h2 className="text-2xl font-semibold">No Cart Product Found</h2>
            </div>
            
          )}
        </div>

        <div className="w-full max-h-[500px]   lg:w-1/3 border p-5 rounded-md">
          <h2 className="text-2xl font-semibold mb-8">Customer Details</h2>
          <img
            className="mb-4 rounded-full w-20 h-20  mx-auto border-2 border-black"
            src={user.photoURL}
            alt={user.displayName}
          />
          <h3 className="text-lg"> Name : {user.displayName}</h3>
          <h3 className="text-lg"> Email : {user.email}</h3>
          <h3 className="text-lg"> Total Order : {carts.length}</h3>

          <h3 className="text-lg mt-6"> Payment Method : </h3>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Cash On Delivery</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-red-500"
                checked
              />
            </label>
          </div>
          <button onClick={handleOrder} className="btn btn-neutral mt-8">Place Order</button>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default MyCart;
