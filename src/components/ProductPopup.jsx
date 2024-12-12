import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import addProductToCart from "../assets/add-product.png";
import removeProductToCart from "../assets/remove-product.png";
import { CartContext } from "../context/CartContext";
import "../styles/ProductPopUp.css";

export const ProductPopup = ({ isVisible, onClose, product }) => {
  const {
    shoppingList,
    addProduct,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    emptyCart,
    createOrder,
  } = useContext(CartContext);

  // Estado local para controlar si el producto ya está en el carrito
  const [added, setAdded] = useState(false); // Aquí se declara `added`
  const [localQuantity, setLocalQuantity] = useState(product.quantity || 1); // Cantidad por defecto
  const navigate = useNavigate();
  //const { loggedUser } = useContext(UserContext); // Descomentar cuando esté arreglado loggedUser

  const loggedUser = JSON.parse(sessionStorage.getItem("userData"));

  // Actualizar si el producto ya está en el carrito (cada vez que el carrito cambia)
  useEffect(() => {
    const isProductInCart = shoppingList.find((item) => item.id === product.id);
    //console.log(isProductInCart);
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
    if (product.stock > 0) {
      addProduct(product, localQuantity);
      setAdded(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "No hay más stock disponible",
        text: `El producto ${product.title} ha alcanzado el límite de stock`,
      });
    }
  };

  // Función para eliminar el producto del carrito
  const handleRemoveProduct = () => {
    removeProduct(product.id);
    setAdded(false);
  };

  // Función para incrementar la cantidad en el popup y en el carrito
  const handleIncrement = () => {
    setLocalQuantity(localQuantity + 1);
    incrementQuantity(product.id);
  };

  // Función para decrementar la cantidad en el popup y en el carrito
  const handleDecrement = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
      decrementQuantity(product.id);
    }
  };

  const onSubmit = async () => {
    try {
      const email = loggedUser?.email;
      const newOrder = {
        userEmail: email,
        orderDetails: shoppingList.map((product) => ({
          productId: product.id,
          amount: product.quantity,
        })),
      };

      //console.log(newOrder);
      await createOrder(newOrder);
      //console.log("Pedido registrado");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  const handlerPurchase = () => {
    //Mostramos una alerta para que el usuario confirme la compre antes de continuar
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onSubmit();
        // Mostrar la segunda alerta si el usuario confirma la primera
        Swal.fire({
          icon: "success",
          title: "La compra se ha realizado con éxito",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            emptyCart();
            navigate("/");
            window.location.reload(); // Recarga la página después de redirigir al Home
          }
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
          <h3>{product.title}</h3>
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

          {/*Si hay stock disponible, lo muestro en color verde, pero si no hay, en rojo */}
          <p
            className={`stock ${
              product.stock > 0 ? "stock-available" : "stock-unavailable"
            }`}
          >
            Stock disponible: {product.stock}
          </p>

          <div className="buy-counter-buttoms">
            <div className="d-grid gap-2 buy-container">
              <button
                className="btn btn-primary buy-button"
                type="button"
                onClick={handlerPurchase}
                disabled={product.stock === 0 || !added} 
              >
                Comprar ahora
              </button>
            </div>
            <div className="products-counter-buttons">
              {added ? (
                <>
                  {/* Botones de incrementar, cantidad y decrementar */}
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
                  {/* Botón de remover */}
                  <div className="circle">
                    <img
                      src={removeProductToCart}
                      alt="Remover del carrito"
                      className="remove_button"
                      onClick={handleRemoveProduct}
                    />
                  </div>
                </>
              ) : (
                // Botón de agregar al carrito si no está en el carrito
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