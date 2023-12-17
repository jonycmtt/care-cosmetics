import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Footer = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="w-full absolute top-0 left-0 min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="shadow max-w-7xl mx-auto">
      <footer className="footer justify-between mx-aut p-10 text-base-content">
        <div>
          <Link to="/">
            <h2 className="text-3xl font-bold">Care Cosmetics</h2>
          </Link>
          <p>
            Established in 2023, Care Cosmetics is a leading <br /> new
            generation Third Party Cosmetic <br /> Manufacturing company in
            Bangladesh.{" "}
          </p>
        </div>
        <nav>
          <header className="footer-title">Pages</header>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="addProduct" className="link link-hover">
            Add Product
          </Link>
          <Link to="cart" className="link link-hover">
            Cart
          </Link>
          <Link to="category" className="link link-hover">
          Category
          </Link>
          <Link to="review" className="link link-hover">
          Review
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <Link className="link link-hover">
            LOreal
          </Link>
          <Link className="link link-hover">
            EsteeLauder
          </Link>
          <Link className="link link-hover">
            Chanel
          </Link>
          <Link className="link link-hover">
            Dior
          </Link>
          <Link className="link link-hover">
            Urban Decay
          </Link>
          <Link className="link link-hover">
            Revlon
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className="flex flex-col lg:flex-row gap-4  justify-evenly items-center py-10 text-center">
        <div>
          <h2 className="mb-2">Payment System:</h2>
          <img src="https://i.ibb.co/MM2ZdzN/payment-method.webp" alt="" />
        </div>
        <div>
          <h2 className="mb-2">Shipping System:</h2>
          <img src="https://i.ibb.co/1TnhPvQ/delivery-method.webp" alt="" />
        </div>
        <div>
          <p>Care Cosmetics &copy; 2023 CREATED BY JonyCmt Team .</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
