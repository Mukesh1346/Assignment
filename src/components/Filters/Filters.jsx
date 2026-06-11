import "./Filter.css";

const Filters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  brands,
  selectedBrands,
  setSelectedBrands,
  searchTerm,
  setSearchTerm,
}) => {

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter(
          (item) => item !== brand
        )
      );
    } else {
      setSelectedBrands([
        ...selectedBrands,
        brand,
      ]);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedBrands([]);
  };



 const handleClearFilters = () => {
  setSelectedCategory("");
  setMinPrice("");
  setMaxPrice("");
  setSelectedBrands([]);
  setSearchTerm("");
};




  return (
    <div className="filters-container">

      <div className="filter-search">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>



      {/* Categories */}

      <div className="filter-group">
        <h6>Categories</h6>

        <div className="filter-scroll">
          <label className="filter-option">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={(e) =>
                handleCategoryChange(e.target.value)
              }
            />
            All Categories
          </label>

          {categories.map((category) => (
            <label
              key={category.slug}
              className="filter-option"
            >
              <input
                type="radio"
                name="category"
                value={category.slug}
                checked={
                  selectedCategory === category.slug
                }
                onChange={(e) =>
                  handleCategoryChange(e.target.value)
                }
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
      {/* Price */}

      <div className="filter-group">
        <h6>Price Range</h6>

        <div className="price-wrapper">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
          />

          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
          />
        </div>
        <button
          className="btn btn-secondary w-100 mt-2"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>


      {/* Brands */}

      {brands.length > 0 && (
        <div className="filter-group">
          <h6>Brands</h6>

          <div className="filter-scroll">
            {brands.map((brand) => (
              <label
                key={brand}
                className="filter-option"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(
                    brand
                  )}
                  onChange={() =>
                    handleBrandChange(brand)
                  }
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;