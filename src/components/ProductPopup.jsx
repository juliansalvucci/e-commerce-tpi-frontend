import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import addProductToCart from "../assets/add-product.png";
import removeProductToCart from "../assets/remove-product.png";
import Swal from "sweetalert2";
import "../styles/ProductPopUp.css";

export const ProductPopup = ({ isVisible, onClose, product }) => {
  const {
    shoppingList,
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
  } = useContext(CartContext);

  // Estado local para controlar si el producto ya está en el carrito
  const [added, setAdded] = useState(false); // Aquí se declara `added`
  const [localQuantity, setLocalQuantity] = useState(product.quantity || 1); // Cantidad por defecto

  // Actualizar si el producto ya está en el carrito (cada vez que el carrito cambia)
  useEffect(() => {
    const isProductInCart = shoppingList.find((item) => item.id === product.id);
    if (isProductInCart) {
      setAdded(true);
      setLocalQuantity(isProductInCart.quantity); // Sincroniza la cantidad local con la del carrito
    } else {
      setAdded(false);
      setLocalQuantity(1); // Resetea la cantidad local si no está en el carrito
    }
  }, [shoppingList, product.id]);

  // Función para agregar el producto al carrito
  const handleAddProduct = () => {
    addProduct(product, localQuantity); // Agrega el producto con la cantidad actual
    setAdded(true);
  };

  // Función para eliminar el producto del carrito
  const handleRemoveProduct = () => {
    removeProduct(product.id); // Elimina el producto del carrito
    setAdded(false);
  };

  // Función para incrementar la cantidad en el popup y en el carrito
  const handleIncrement = () => {
    setLocalQuantity(localQuantity + 1);
    incrementQuantity(product.id); // Incrementa la cantidad en el carrito
  };

  // Función para decrementar la cantidad en el popup y en el carrito
  const handleDecrement = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      decrementQuantity(product.id); // Decrementa la cantidad en el carrito
    }
  };

  /*
  const calculateTotal = () => {
    return shoppingList
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };
  */

  const handlerPurchase = () => {
    //Mostramos una alerta en el que se muestre el listado de los productos comprados (su titulo y cantidad)
    Swal.fire({
      title: "Finalizar compra",
      text: "¿Desea confirmar la compra?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-question-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Mostrar la segunda alerta si el usuario confirma la primera
        Swal.fire({
          icon: "success",
          title: "La compra se ha realizado con éxito",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button", // Clase personalizada para el botón "OK"
          },
        });
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className="product-container">
      <div className="popup-content">
        <button className="x-btn-popup" onClick={onClose}>
          X
        </button>

        <div className="image-container">
          <img className="popup-img" src={product.image} alt={product.title} />
        </div>

        <div className="details-container">
          <h1>{product.title}</h1>
          <div className="price-container">
            {/* Total por producto */}
            <span>Precio: </span>
            <p>
              $
              {(product.price * localQuantity).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <span>Descripción: </span>
          <p>{product.description}</p>

          {/* Aquí mostramos el stock disponible */}
          <div className="stock-container">
            <p>Stock disponible: {product.stock}</p>{" "}
            {/* Aquí se muestra el stock */}
          </div>

          <div className="buy-counter-buttoms">
            <div className="d-grid gap-2 buy-container">
              <button
                className="btn btn-primary buy-button"
                type="button"
                onClick={handlerPurchase}
              >
                Comprar ahora
              </button>
            </div>
            <div className="products-counter-buttons">
              <button
                className="btn btn-outline-primary"
                onClick={handleDecrement}
              >
                -
              </button>
              <button className="btn btn-primary local-quantity">
                {localQuantity}
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={handleIncrement}
              >
                +
              </button>

              {added ? (
                // Si el producto ya está en el carrito, mostramos el botón para remover
                <div className="circle">
                  <img
                    src={removeProductToCart}
                    alt="Remover del carrito"
                    className="remove_button"
                    onClick={handleRemoveProduct}
                  />
                </div>
              ) : (
                // Si el producto no está en el carrito, mostramos el botón para agregar
                <div className="circle">
                  <img
                    src={addProductToCart}
                    alt="Agregar al carrito"
                    className="add_button"
                    onClick={handleAddProduct}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
