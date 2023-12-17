
const CartItems = ({ cart,handleDelete }) => {
  const { photo, name, brand, price,_id} = cart;
  

  return (
    <div className="flex justify-between px-5 items-start sm:items-center  bg-clip-border shadow py-5 border-b">
      <div className="relative flex w-full md:max-h-[100px] flex-col sm:flex-row rounded-xl items-center text-gray-700 ">
        <div className="relative max-w-[200px] max-h-32 m-0 overflow-hidden text-gray-700 bg-white ">
          <img src={photo} alt={brand} className="w-full h-32" />
        </div>
        <div className="p-2">
          <h6 className="block font-sans text-sm antialiased font-semibold leading-relaxed tracking-normal text-pink-500 uppercase">
            {brand}
          </h6>
          <h4 className="block font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h4>
          <p className="block mb-8 font-sans antialiased font-normal leading-relaxed text-gray-700 text-lg">
            Price : ${price}
          </p>
          {/* <p className="block mb-8 font-sans antialiased font-normal leading-relaxed text-gray-700 text-lg">
            Price : {email}
          </p> */}
        </div>
      </div>
      <div className="">
       <button onClick={() => handleDelete(_id)} className="btn">X</button>
      </div>
    </div>
  );
};

export default CartItems;
