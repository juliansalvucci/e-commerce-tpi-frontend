import React from "react";
import "../styles/ProductPage.css";

const ProductPage = () => {
  return (
    <div className="background">
      <div className="btn-volver">
        <label>Volver</label>
      </div>
      <div className="container-product">
        <div className="container-product-image">
          <img src="https://via.placeholder.com/400x400" alt="Product Image" />
        </div>
        <div className="container-product-details">
          <h2 className="product-title">Product Name</h2>
          <p className="product-price">$100</p>
          <label className="product-description-label">Descripción</label>
          <p className="product-description">
            Aca va la descripción del producto
          </p>
          <p className="product-stock">10 available units</p>
          <div className="container-product-cart">
            <button className="product-btn-quantity">1</button>
            <button className="product-btn-add-to-cart">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
