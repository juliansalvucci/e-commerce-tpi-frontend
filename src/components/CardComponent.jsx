import React from "react";
import { useContext, useEffect, useState } from "react";
import "../styles/CardComponent.css";
import { CartContext } from "../context/CartContext";
import { ProductPopup } from "../components/ProductPopup";
import addProductToCart from "../assets/add-product.png";
import removeProductToCart from "../assets/remove-product.png";
import Swal from "sweetalert2";

export const CardComponent = ({
  id,
  image,
  title,
  price,
  stock,
  description,
  handlerAdd,
  handlerRemove,
}) => {
  const { shoppingList } = useContext(CartContext);

  //Comprobamos si está o no agregado al carrito
  const [added, setAdded] = useState(false);

  //Estados para controlar la visibilidad y el almacenar el producto seleccionado en el popup
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addProduct = () => {
    //verifico previamente que el stock sea mayor a 0 para poder agregarlo al carrito
    if (stock > 0) {
      handlerAdd();
      setAdded(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No hay más stock disponible",
        text: `El producto ${title} ha alcanzado el límite de stock`,
      });
    }
  };

  const removeProduct = () => {
    handlerRemove();
    setAdded(false);
  };

  const checkAdded = () => {
    //Verifico si hay algún id que coincide con el que ya seleccioné para que no se marqué como no seleccionado otra vez
    const boolean = shoppingList.some((product) => product.id == id);
    setAdded(boolean);
  };

  //Para saber si el estado del producto inicializa en verdadero o falso debo hacer lo siguiente
  useEffect(() => {
    checkAdded();
  }, [shoppingList]); //Se actualiza cada vez que el shoppingList cambie

  const showProductPopup = () => {
    // Buscar el producto en el carrito para obtener su cantidad actual
    const productInCart = shoppingList.find((item) => item.id === id);
    const quantity = productInCart ? productInCart.quantity : 1;

    setSelectedProduct({
      id,
      image,
      title,
      description,
      price,
      quantity,
      stock,
    });
    setIsPopupVisible(true);
  };

  //Cierro el popup con el detalle del producto seleccionado
  const closeProductPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <li className="card">
      <div className="product-alert">
        <img
          src={image}
          alt={title}
          className="card-img"
          onClick={showProductPopup}
        />
      </div>
      {added ? (
        //En el caso de que ya se haya añadido el producto al carrito y el usuario quiere quitarla
        <div className="circle">
          <img
            src={removeProductToCart}
            alt="Remover del carrito"
            className="remove_button"
            onClick={removeProduct}
          />
        </div>
      ) : (
        //En el caso de que no se haya agregado el producto al carrito
        <div className="circle">
          <img
            src={addProductToCart}
            alt="Agregar al carrito"
            className="add_button"
            onClick={addProduct}
          />
        </div>
      )}

      <div className="card_content">
        <div className="product-alert">
          <h5 className="card_title" onClick={showProductPopup}>
            {title}
          </h5>

          <p className="card_price" onClick={showProductPopup}>
            $
            {price.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
          </p>

          <p
            className={`stock ${
              stock > 0 ? "stock-available" : "stock-unavailable"
            }`}
          >
            Stock disponible: {stock}
          </p>
        </div>
      </div>

      {/*Renderiza el popup si está visible */}
      {isPopupVisible && (
        <ProductPopup
          isVisible={isPopupVisible}
          onClose={closeProductPopup}
          product={selectedProduct}
        />
      )}
    </li>
  );
};
