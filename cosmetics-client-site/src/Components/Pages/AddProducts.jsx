import Swal from "sweetalert2";

const AddProducts = () => {
  const handleAddCoffee = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.product.value;
    const brand = form.brand.value;
    const category = form.category.value;
    const price = form.price.value;
    const description = form.description.value;
    const rating = form.rating.value;
    const photo = form.photo.value;
    console.log(name, brand, category, price, description, rating, photo);
    const newProduct = {
      name,
      brand,
      category,
      price,
      description,
      rating,
      photo,
    };

    fetch("http://localhost:5000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Product Added Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
        console.log(data);
        form.reset()
      });
  };
  return (
    <div className="lg:w-2/3 w-full mx-auto min-h-screen flex justify-center flex-col border-2 px-3 md:px-8 mb-12 py-5 rounded-lg">
      <h2 className="text-4xl text-center mb-10">Add a Cosmetics Product</h2>
      <form onSubmit={handleAddCoffee}>
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
            />
          </div>

          <div className="form-control md:w-1/2 w-full">
            <label className="label">
              <span className="label-text">Brand Name</span>
            </label>

            {/* <input
              required
              name="brand"
              type="text"
              placeholder="Brand Name"
              className="input input-bordered w-full"
            /> */}
            <select name="brand" className="select select-bordered w-full">
              <option disabled selected>
                Select Brand
              </option>
              <option value="LOreal">LOreal</option>
              <option value="EsteeLauder">EsteeLauder</option>
              <option value="Chanel">Chanel</option>
              <option value="Urban Decay">Urban Decay</option>
              <option value="Revlon">Revlon</option>
              <option value="Dior">Dior</option>
            </select>
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
          value="Add Product"
        />
      </form>
    </div>
  );
};

export default AddProducts;
