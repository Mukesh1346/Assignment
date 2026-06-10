import "./Filter.css";

const Filters = () => {
  return (
    <div className="filters-container">

      <div className="filter-search">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search..."
        />
      </div>

      {/* Categories */}

      <div className="filter-group">
        <h6>Categories</h6>

        <label className="filter-option">
          <input type="checkbox" />
          Smartphones
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Laptops
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Fragrances
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Skincare
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Groceries
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Home Decoration
        </label>
      </div>

      {/* Price */}

      <div className="filter-group">
        <h6>Price Range</h6>

        <div className="price-wrapper">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
          />

          <input
            type="number"
            className="form-control"
            placeholder="Max"
          />
        </div>

        <button className="apply-btn">
          Apply
        </button>
      </div>

      {/* Brands */}

      <div className="filter-group">
        <h6>Brands</h6>

        <label className="filter-option">
          <input type="checkbox" />
          Apple
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Samsung
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Huawei
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          Xiaomi
        </label>

        <label className="filter-option">
          <input type="checkbox" />
          OPPO
        </label>
      </div>

    </div>
  );
};

export default Filters;