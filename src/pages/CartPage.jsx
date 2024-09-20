import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";
import "../styles/CartPage.css";
import trashIcon from "../assets/trash-icon.png";

export const CartPage = () => {
  const { shoppingList, removeProduct, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  const calculateTotal = () => {
    return shoppingList
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  // Función para calcular la cantidad total de productos
  const calculateTotalQuantity = () => {
    return shoppingList.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0
    );
  };

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
        const productsPurchased = shoppingList
          .map((product) => `<li>${product.title} x ${product.quantity}</li>`)
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
        });
      }
    });
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
                      src={product.image}
                      alt={product.title}
                      className="product-img"
                    />
                    <span>{product.title}</span>
                  </div>
                </td>

                <td>${(product.price * product.quantity).toFixed(2)}</td>
                <td className="quantity-column">
                  {/*Quito cantidad de productos del carrito */}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => decrementQuantity(product.id)}
                  >
                    -
                  </button>

                  <button className="btn btn-primary">
                    {product.quantity}
                  </button>

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
