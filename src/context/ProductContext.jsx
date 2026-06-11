import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [selectedBrands, setSelectedBrands] =
    useState([]);

  // const [searchTerm, setSearchTerm] =
  //   useState("");

  const [navbarSearch, setNavbarSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");



  return (
    <ProductContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedBrands,
        setSelectedBrands,
        navbarSearch,
        setNavbarSearch,
        sidebarSearch,
        setSidebarSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () =>
  useContext(ProductContext);