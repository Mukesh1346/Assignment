import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [selectedBrands, setSelectedBrands] =
    useState([]);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () =>
  useContext(ProductContext);