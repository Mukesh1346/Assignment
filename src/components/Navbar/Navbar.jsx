import {FaBars, FaShoppingCart, FaUser,} from "react-icons/fa";
import "./Navbar.css";

import { useProductContext } from "../../context/ProductContext";

const Navbar = ({
  setShowSidebar,
}) => {
  const {
    navbarSearch,
    setNavbarSearch
  } = useProductContext();


  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <div className="container-fluid">

        <FaBars
          size={22}
          style={{
            cursor: "pointer",
            color: "white",
          }}
          onClick={() =>
            setShowSidebar((prev) => !prev)
          }
        />

        <div className="w-50">
          <div className="navbar-search">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>

            <input
              type="text"
              placeholder="Search products..."
              value={navbarSearch}
              onChange={(e) => setNavbarSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex gap-3 text-white">
          <FaShoppingCart size={20} />
          <FaUser size={20} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;