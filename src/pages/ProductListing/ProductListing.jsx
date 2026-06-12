import { useState, useEffect } from "react";
import Filters from "../../components/Filters/Filters";
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination"
import { useProductContext } from '../../context/ProductContext'
import { useNavigate } from 'react-router-dom';
import "./ProductListing.css";
import Loader from "../../components/Loader/Loader";

const ProductListing = ({ showSidebar, }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [categories, setCategories] = useState([]);

  const {
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedBrands,
    setSelectedBrands,
    navbarSearch,
    // setNavbarSearch,
    sidebarSearch,
    setSidebarSearch,
  } = useProductContext();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12




  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products?limit=100");
      setProducts(response.data.products);
      console.log(response.data.products)
    } catch (error) {
      setError("Failed to fetch Products");

    } finally {
      setLoading(false);
    }
  }


  const getCategories = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products/categories");
      setCategories(response.data);


    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getProducts();
    getCategories();
  }, [])




const searchValue = navbarSearch || sidebarSearch;

const filteredProducts = products.filter((product) => {
  const searchMatch =
    product.title
      .toLowerCase()
      .includes(searchValue.toLowerCase()) ||
    product.description
      .toLowerCase()
      .includes(searchValue.toLowerCase()) ||
    product.brand
      ?.toLowerCase()
      .includes(searchValue.toLowerCase());

  const categoryMatch =
    !selectedCategory ||
    product.category === selectedCategory;

  const priceMatch =
    (!minPrice || product.price >= Number(minPrice)) &&
    (!maxPrice || product.price <= Number(maxPrice));

  const brandMatch =
    selectedBrands.length === 0 ||
    selectedBrands.includes(product.brand);

  return (
    searchMatch &&
    categoryMatch &&
    priceMatch &&
    brandMatch
  );
});



useEffect(() => {
  setCurrentPage(1);
}, [
  selectedCategory,
  minPrice,
  maxPrice,
  selectedBrands,
  navbarSearch,
  sidebarSearch,
]);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);




  const filteredBrands = [
    ...new Set(
      products
        .filter(
          (product) =>
            !selectedCategory ||
            product.category === selectedCategory
        )
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ];

  if (loading) {
    return <Loader/>
  }

  if (error) {
    return <h2>{error}</h2>;
  }




  console.log(selectedCategory);
  console.log(
    products.filter(
      (item) => item.category === selectedCategory
    )
  );




  return (
    <>
      {/* <Navbar setShowSidebar={setShowSidebar} /> */}

      <div className="container-fluid">
        <div className="row">

          {/* {currentProducts.length === 0 && (
            <div className="text-center py-5">
              <h4>No Products Found</h4>
            </div>
          )} */}

          {/* Sidebar */}
          <div
            className={`sidebar-wrapper ${showSidebar ? "col-lg-2" : "d-none"
              }`}
          >
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              brands={filteredBrands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              searchTerm={sidebarSearch}
              setSearchTerm={setSidebarSearch}
            />
          </div>

          {/* Product Section */}
          <div className={showSidebar ? "col-lg-10" : "col-lg-12"}>
            <h3 className="mt-3 PageTitle">PRODUCTS</h3>

            {currentProducts.length === 0 ? (
              <div className="text-center py-5">
                <h4>No Products Found</h4>
              </div>
            ) : (
              <div className="row">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className={
                      showSidebar
                        ? "col-6 col-md-4 col-xl-3 mb-4"
                        : "col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4"
                    }
                  >
                    <div
                      className="product-card"
                      onClick={() =>
                        navigate(`/product/${product.id}`)
                      }
                    >
                      <div className="product-image-wrapper">
                        <img
                          src={product.images?.[0] || product.thumbnail}
                          alt={product.title}
                          className="product-image"
                        />

                        <div className="discount-badge">
                          {Math.round(product.discountPercentage)}% Off
                        </div>
                      </div>

                      <div className="product-details">
                        <p className="product-title">
                          {product.title}
                        </p>


                        <p className="product-description">
                          {product.description}
                        </p>
                        <div className="d-flex justify-content-center align-items-center">
                          <p className="text-warning m-0"> Price :  </p>

                          <p className="text-center fw-bold text-secondary m-0">
                            {product.price}
                          </p>
                        </div>
                        <div className="product-rating">
                          {[...Array(5)].map((_, index) => (
                            <span key={index}>
                              {index < Math.round(product.rating) ? "⭐" : "☆"}
                            </span>
                          ))}

                          <span className="rating-text">
                            ({product.rating})
                          </span>
                        </div>

                        <button className="add-to-cart-btn">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListing;