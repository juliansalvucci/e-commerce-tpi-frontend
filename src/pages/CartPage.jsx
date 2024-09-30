import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import trashIcon from "../assets/trash-icon.png";
import { CartContext } from "../context/CartContext";
import "../styles/CartPage.css";

export const CartPage = () => {
  const navigate = useNavigate();
  const { shoppingList, removeProduct, incrementQuantity, decrementQuantity, emptyCart } =
    useContext(CartContext);

  const calculateTotal = () => {
    return shoppingList
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toLocaleString("en-US", { style: "currency", currency: "USD" });
  };

  // Función para calcular la cantidad total de productos
  const calculateTotalQuantity = () => {
    return shoppingList.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0
    );
  };

  const handlerPurchase = () => {
    if (shoppingList.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "No hay productos seleccionados",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } else {
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
          const productsPurchased = shoppingList
            .map((product) => `<li>${product.name} x ${product.quantity}</li>`)
            .join(""); // Generar elementos de lista para cada producto
          Swal.fire({
            icon: "success",
            title: "La compra se ha realizado con éxito",
            html: `
            <p>Has comprado:</p>
            <ul>${productsPurchased}</ul> <!-- Mostrar productos en una lista -->
          `,
            customClass: {
              popup: "swal-success-popup",
              confirmButton: "swal-ok-button", // Clase personalizada para el botón "OK"
            },
          }).then((result) => {
            if (result.isConfirmed) {
              emptyCart();
              navigate("/");
            }
          });
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="top-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="table-title">
                Productos
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {shoppingList.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-info">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="product-img"
                    />
                    <span>{product.name}</span>
                  </div>
                </td>

                <td>
                  $
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  x {product.quantity}
                </td>
                <td>
                  {(product.price * product.quantity).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="quantity-column">
                  {/*Quito cantidad de productos al carrito */}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => decrementQuantity(product.id)}
                  >
                    -
                  </button>

                  <button className="btn btn-primary">
                    {product.quantity}
                  </button>
                  {/*Agrego cantidad de productos al carrito */}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => incrementQuantity(product.id)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <div className="circle">
                    <img
                      src={trashIcon}
                      alt="Remover del carrito"
                      className="trash-icon"
                      onClick={() => removeProduct(product.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bottom-container">
          <div className="summary">
            <b>Resumen de compra</b>
            <br />
            <p>Cantidad de productos: {calculateTotalQuantity()}</p>
            <b>Total: ${calculateTotal()}</b>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handlerPurchase}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
