import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Filters from "../../components/Filters/Filters";

const ProductListing = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <Navbar setShowSidebar={setShowSidebar} />

      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div
            className={`sidebar-wrapper ${
              showSidebar ? "col-lg-2" : "d-none"
            }`}
          >
            <Filters />
          </div>

          {/* Product Section */}
          <div className={showSidebar ? "col-lg-10" : "col-lg-12"}>
            <h3 className="mt-3">Products</h3>

            <div className="row">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className={
                    showSidebar
                      ? "col-xl-3 col-md-4 mb-4"
                      : "col-xl-2 col-lg-3 col-md-4 mb-4"
                  }
                >
                  <div className="card p-3">
                    <img
                      src="https://dummyjson.com/image/200x150"
                      alt=""
                      className="img-fluid"
                    />
                    <h6 className="mt-2">Product {item}</h6>
                    <p>$99</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;