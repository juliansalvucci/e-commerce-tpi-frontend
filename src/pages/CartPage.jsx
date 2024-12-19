import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import trashIcon from "../assets/trash-icon.png";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const {
    shoppingList,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    createOrder,
    emptyCart,
    calculateTotalQuantity,
    subtotal,
    discount,
    totalWithDiscount,
  } = useContext(CartContext);

  //const { loggedUser } = useContext(UserContext); // Descomentar cuando esté arreglado loggedUser

  const loggedUser = JSON.parse(sessionStorage.getItem("userData"));

  const navigate = useNavigate();

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
      await createOrder(newOrder);
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  const handlerPurchase = () => {
    if (loggedUser != null) {
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
          const productsPurchased = shoppingList
            .map((product) => `<li>${product.name} x ${product.quantity}</li>`)
            .join("");
          Swal.fire({
            icon: "success",
            title: "La compra se ha realizado con éxito",
            html: `
              <p>Has comprado:</p>
              <ul>${productsPurchased}</ul>
              <div style="
                  border: 1px solid #ccc; 
                  border-radius: 8px; 
                  padding: 10px; 
                  margin-top: 15px; 
                  text-align: left;
                ">
                <p>Cantidad de productos: ${calculateTotalQuantity()}</p>
                <p>Subtotal:${subtotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</p>
                <p>Descuento (5% a partir de $1,000,000): ${discount.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}</p>
                <p>Total: ${totalWithDiscount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</p>
              </div>
            `,
            customClass: {
              popup: "swal-success-popup",
              confirmButton: "swal-ok-button",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              emptyCart();
              navigate("/", { state: { reloadStock: true } });
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: "Usuario no logueado",
        text: "¿Desea loguearse para finalizar su compra?",
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
          navigate("/login");
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
            <h6>Resumen de compra</h6>
            <p>Cantidad de productos: {calculateTotalQuantity()}</p>
            <p>
              Subtotal:{" "}
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p>
              Descuento (5% a partir de $1,000,000):{" "}
              {discount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <h6>
              Total:{" "}
              {totalWithDiscount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handlerPurchase}
              disabled={shoppingList.length === 0}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
