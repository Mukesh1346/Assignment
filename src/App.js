import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductDetail from "./pages/ProductDetail/ProductDetails";
import Navbar from "./components/Navbar/Navbar";
import React, { useState } from "react";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <BrowserRouter>

      <Navbar
        setShowSidebar={setShowSidebar}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProductListing
              showSidebar={showSidebar}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;