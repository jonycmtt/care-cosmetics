import { Link } from "react-router-dom";

const Brands = ({ brand }) => {
  const { brand_name, brand_logo } = brand;
  return (
    <Link to={`product/${brand_name}`}>
      <div className="card shadow border">
        <figure className="h-60 border-b">
          <img className="object-cover h-full w-full" src={brand_logo} alt={brand_name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{brand_name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Brands;
