import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [selectedBrands, setSelectedBrands] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

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
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () =>
  useContext(ProductContext);