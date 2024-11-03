import { useContext } from "react";
import Swal from "sweetalert2";
import trashIcon from "../assets/trash-icon.png";
import { CartContext } from "../context/CartContext";
import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const CartPage = () => {
  const {
    shoppingList,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    create,
    emptyCart,
    calculateTotal,
    calculateTotalQuantity,
  } = useContext(CartContext);

  const { email } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const newOrder = {
        userEmail: email,
        orderDetails: shoppingList.map((product) => ({
          productId: product.id,
          amount: product.quantity,
        })),
      };

      await create(newOrder);
      console.log("Pedido registrado");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
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
          const productsPurchased = shoppingList
            .map((product) => `<li>${product.name} x ${product.quantity}</li>`)
            .join(""); // Generar elementos de lista para cada producto
          Swal.fire({
            icon: "success",
            title: "La compra se ha realizado con éxito",
            html: `
            <p>Has comprado:</p>
            <ul>${productsPurchased}</ul> <!-- Mostrar productos en una lista -->
            <p>Total: ${calculateTotal()}</p>
          `,
            customClass: {
              popup: "swal-success-popup",
              confirmButton: "swal-ok-button",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              // Solo si confirma en la alerta de éxito
              emptyCart();
              navigate("/", { state: { reloadStock: true } });
            }
          });
        }
      });
    }
  };

  return (
    <div className="container-cart-page">
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
            <b>Total: {calculateTotal()}</b>
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
