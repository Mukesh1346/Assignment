import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = ({ setShowSidebar }) => {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
     <div className="container-fluid">
       <FaBars
        size={22}

        style={{ cursor: "pointer"  ,color:"white"}}
        onClick={() => setShowSidebar((prev) => !prev)}
      />

      <div className="w-50">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
        />
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