import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const updateLoader = useLoaderData();
  const navigate = useNavigate()
  const { name, brand, category, price, description, rating, photo, _id } =
    updateLoader;
  // console.log(updateLoader)

  const handleUpdate = (event) => {
    
    event.preventDefault();
    const form = event.target;
    const name = form.product.value;
    const brand = form.brand.value;
    const category = form.category.value;
    const price = form.price.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const photo = form.photo.value;
    console.log(_id,name, brand, category, price, description, rating, photo);
    const updateProduct = {
      name,
      brand,
      category,
      price,
      description,
      rating,
      photo,
    };

    fetch(`http://localhost:5000/product/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Product Updated Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });

        }
        // console.log(data);
        navigate(-1)
      });
  };

  // delete
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/product/${_id}`, {
          method : "DELETE",
        })
        .then(res => res.json())
        .then(data => {
          if(data.deletedCount > 0) {
           Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
          }
          navigate(-1)
          // const remaining = carts.filter(cart => cart._id !== id);
          // setCarts(remaining)
        })
        
      }
    })

    // =======================
  }
  return (
    <div className="lg:w-2/3 w-full mx-auto min-h-screen flex justify-center flex-col border-2 px-3 sm:px-8 mb-12 py-5 rounded-lg">
      <h2 className="text-2xl md:text-3xl  text-center">
        Update a Cosmetics Product
      </h2>
      <p className="text-center text-2xl mb-10">&ldquo; {name} &ldquo;</p>
      <form onSubmit={handleUpdate}>
        {/* coffee row */}
        <div className="md:flex gap-6">
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>

            <input
              required
              type="text"
              name="product"
              placeholder="Product Name"
              className="input input-bordered w-full"
              defaultValue={name}
            />
          </div>

          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>
            <input
              required
              name="brand"
              type="text"
              placeholder="Brand Name"
              className="input input-bordered w-full"
              defaultValue={brand}
            />
          </div>
        </div>
        {/* supplier and taster row */}
        <div className="md:flex gap-6">
          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text">Category </span>
            </label>

            <input
              required
              type="text"
              name="category"
              placeholder="Product Category"
              className="input input-bordered w-full"
              defaultValue={category}
            />
          </div>

          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              required
              name="price"
              type="text"
              placeholder="Price"
              className="input input-bordered w-full"
              defaultValue={price}
            />
          </div>
        </div>
        {/* category row */}
        <div className="md:flex md:flex-col gap-2">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <textarea
              defaultValue={description}
              required
              className="input input-bordered w-full h-32 resize-none"
              placeholder="Short description"
              name="description"
            ></textarea>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              required
              type="text"
              name="rating"
              placeholder="Rating"
              className="input input-bordered w-full"
              defaultValue={rating}
            />
          </div>
        </div>
        {/* category row */}
        <div className="mb-10">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Photo</span>
            </label>

            <textarea
              defaultValue={photo}
              required
              className="input input-bordered w-full h-32 resize-none"
              placeholder="Enter Photo url"
              name="photo"
            ></textarea>
          </div>
        </div>
        <input
          className="w-full btn btn-primary"
          type="submit"
          value="Update Product"
        />
      </form>
      <div className="mt-2">
        <button onClick={() =>handleDelete(_id)} className="btn btn-error w-full"> Delete Product</button>
      </div>
    </div>
  );
};

export default UpdateProduct;
