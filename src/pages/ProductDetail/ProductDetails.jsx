import React, { useState, useEffect } from "react";
import "./details.css";
import axios from "axios";
import {
  useParams,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";

const handleOrder = () => {
  Swal.fire({
    title: "Order Placed!",
    text: "Your order has been placed successfully.",
    icon: "success",
    confirmButtonText: "OK",
  });
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productItem, setProductItem] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [currentImage, setCurrentImage] =
    useState("");

  const getProduct = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://dummyjson.com/products/${id}`
      );

      setProductItem(res.data);

      setCurrentImage(
        res.data.images?.[0]
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleQuantityChange = (
    value
  ) => {
    const newValue = quantity + value;

    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  const handleThumbnailClick = (
    image
  ) => {
    setCurrentImage(image);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!productItem) {
    return (
      <h2>Product Not Found</h2>
    );
  }


const handleOrder = () => {
  Swal.fire({
    title: "Order Placed!",
    text: "Your order has been placed successfully.",
    icon: "success",
    confirmButtonText: "OK",
  });
};


  return (
    <>
      <div className="container mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <section className="pd-hero-section py-5">
        <div className="container">
          <div className="row g-4">

            {/* Product Images */}

            <div className="col-lg-6">
              <div className="pd-image-container bg-white rounded-3 shadow-sm p-4 d-flex">

                <div className="pd-thumbnails d-flex flex-column align-items-center me-4">

                  {productItem.images?.map(
                    (image, index) => (
                      <div
                        key={index}
                        className={`pd-thumbnail rounded-2 overflow-hidden mb-3 ${
                          currentImage === image
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          handleThumbnailClick(
                            image
                          )
                        }
                      >
                        <img
                          src={image}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    )
                  )}

                </div>

                <div className="pd-main-image d-flex justify-content-center align-items-center flex-fill">
                  <img
                    src={currentImage}
                    alt={productItem.title}
                    className="img-fluid pd-product-img"
                  />
                </div>

              </div>
            </div>

            {/* Product Details */}

            <div className="col-lg-6 pd-details">
              <div className="pd-details-container p-4">

                <h1 className="pd-product-title mb-3">
                  {productItem.title}
                </h1>

                <p className="mb-0">
                  {productItem.description}
                </p>

                {/* Rating */}

                <div className="pd-rating d-flex align-items-center gap-2 mt-3">

                  <div className="pd-stars fs-4 d-flex">

                    {[...Array(5)].map(
                      (_, i) => (
                        <span
                          key={i}
                          className={
                            i <
                            Math.floor(
                              productItem.rating
                            )
                              ? "pd-star pd-filled"
                              : "pd-star"
                          }
                        >
                          {i <
                          Math.floor(
                            productItem.rating
                          )
                            ? "★"
                            : "☆"}
                        </span>
                      )
                    )}

                  </div>

                  <span className="pd-rating-value">
                    {productItem.rating}
                  </span>

                  <span className="pd-reviews-count text-muted">
                    ({productItem.rating} Rating)
                  </span>

                </div>

                {/* Price */}

                <div className="pd-price-section d-flex align-items-center gap-3 mt-3">

                  <span className="pd-current-price fs-3 fw-bold">
                    ₹ {productItem.price}
                  </span>

                  <span className="pd-discount-badge bg-danger text-white px-2 py-1 rounded-pill small">
                    {Math.round(
                      productItem.discountPercentage
                    )}
                    % OFF
                  </span>

                </div>

                <p className="pd-product-desc mb-4 mt-3">
                  {productItem.description}
                </p>

                {/* Quantity */}

                <div className="pd-quantity d-flex align-items-center gap-3 mb-4">

                  <span className="pd-quantity-label">
                    Quantity:
                  </span>

                  <div className="d-flex align-items-center">

                    <button
                      className="detail_cart_btn"
                      onClick={() =>
                        handleQuantityChange(
                          -1
                        )
                      }
                      disabled={
                        quantity <= 1
                      }
                    >
                      −
                    </button>

                    <span className="mx-3">
                      {quantity}
                    </span>

                    <button
                      className="detail_cart_btn"
                      onClick={() =>
                        handleQuantityChange(
                          1
                        )
                      }
                      disabled={
                        quantity >= 10
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* Buttons */}

                <div className="pd-actions d-flex gap-3 mb-4">

                  {/* <button className="pd-add-to-cart CartBtn px-4 py-3 flex-grow-1">
                    🛒 ADD TO CART
                  </button> */}

                  <button className="pd-buy-now btn btn-outline-warning px-4 py-3 text-dark flex-grow-1"  onClick={handleOrder}>
                    BUY NOW
                  </button>

                </div>

                {/* Meta Info */}

                <div className="pd-meta border-top pt-3">

                  <div className="pd-meta-item row mb-2">
                    <div className="col-4 pd-meta-label fw-bold">
                      Brand:
                    </div>
                    <div className="col-8 pd-meta-value">
                      {productItem.brand}
                    </div>
                  </div>

                  <div className="pd-meta-item row mb-2">
                    <div className="col-4 pd-meta-label fw-bold">
                      Category:
                    </div>
                    <div className="col-8 pd-meta-value">
                      {productItem.category}
                    </div>
                  </div>

                  <div className="pd-meta-item row mb-2">
                    <div className="col-4 pd-meta-label fw-bold">
                      Availability:
                    </div>
                    <div className="col-8 pd-meta-value text-success">
                      {productItem.stock > 0
                        ? "In Stock"
                        : "Out Of Stock"}
                    </div>
                  </div>

                  <div className="pd-meta-item row">
                    <div className="col-4 pd-meta-label fw-bold">
                      Stock:
                    </div>
                    <div className="col-8 pd-meta-value">
                      {productItem.stock}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}