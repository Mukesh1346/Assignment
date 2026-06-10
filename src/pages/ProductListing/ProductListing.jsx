import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Filters from "../../components/Filters/Filters";
import axios from 'axios';
import Pagination from "../../components/Pagination/Pagination"


const ProductListing = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);

 const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);

const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 12




  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://dummyjson.com/products?limit=100");
      setProducts(response.data.products);
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



const brands = [
  ...new Set(
    products
      .map((product) => product.brand)
      .filter(Boolean)
  ),
];

const filteredProducts = products.filter(
  (product) => {

    const categoryMatch =
      !selectedCategory ||
      product.category === selectedCategory;

    const priceMatch =
      (!minPrice ||
        product.price >= Number(minPrice)) &&
      (!maxPrice ||
        product.price <= Number(maxPrice));

    const brandMatch =
      selectedBrands.length === 0 ||
      selectedBrands.includes(product.brand);

    return (
      categoryMatch &&
      priceMatch &&
      brandMatch
    );
  }
);




useEffect(() => {
  setCurrentPage(1);
}, [
  selectedCategory,
  minPrice,
  maxPrice,
  selectedBrands
]);

const lastProductIndex = currentPage * productsPerPage;
const firstProductIndex = lastProductIndex - productsPerPage;

const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);

const totalPages = Math.ceil(filteredProducts.length / productsPerPage);






  if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}





  return (
    <>
      <Navbar setShowSidebar={setShowSidebar} />

      <div className="container-fluid">
        <div className="row">

          {currentProducts.length === 0 && (
  <div className="text-center py-5">
    <h4>No Products Found</h4>
  </div>
)}

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
  brands={brands}
  selectedBrands={selectedBrands}
  setSelectedBrands={setSelectedBrands}
/>
          </div>

          {/* Product Section */}
          <div className={showSidebar ? "col-lg-10" : "col-lg-12"}>
            <h3 className="mt-3">Products</h3>

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
              ? "col-xl-3 col-md-4 mb-4"
              : "col-xl-2 col-lg-3 col-md-4 mb-4"
          }
        >
          <div className="card p-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid"
            />

            <h6 className="mt-2">
              {product.title}
            </h6>

            <p>${product.price}</p>

            <small>
              ⭐ {product.rating}
            </small>
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