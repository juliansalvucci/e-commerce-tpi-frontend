import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartPopUp.css";

export const CartPopup = ({ isVisible, onClose }) => {
  const { shoppingList, removeProduct, incrementQuantity, decrementQuantity } = useContext(CartContext)

  const calculateTotal = () => {
    return shoppingList.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
  }

  // Función para calcular la cantidad total de productos
  const calculateTotalQuantity = () => {
    return shoppingList.reduce((totalQuantity, product) => totalQuantity + product.quantity, 0);
  };

  if (!isVisible) return null;  // Si el popup no está visible, no se renderiza nada

  return (

    <div className='cart'>

      {/* Contenedor con scroll donde se listan los productos */}
      <div id="cart-scroll-container" data-bs-spy="scroll" data-bs-target="#cart-nav" className="scroll-container" tabindex="0">

        <h3>Carrito de Compras</h3>

        <ul>

          {shoppingList.map((product) => (

            <div className="cart-product">

              <li key={product.id}>

                <button className="x-btn" onClick={onClose}>X</button>

                <div className="image-container">
                  <img className="cart-img" src={product.image} alt={product.title} />
                </div>

                <div className="title-container">
                  <strong>{product.title}</strong>
                </div>
                <div className="price-container">
                  {/* Total por producto */}
                  <p>${(product.price * product.quantity).toFixed(2)}</p>
                </div>

                <div className="counter-products">
                  
                  <div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => decrementQuantity(product.id)}
                    >-</button>

                    <button
                      className="btn btn-primary"
                    >{product.quantity}</button>

                    <button
                      className="btn btn-outline-primary"
                      onClick={() => incrementQuantity(product.id)}
                    >+</button>
                  </div>

                  <div className="delete-group">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeProduct(product.id)}
                    >Eliminar</button>
                  </div>

                </div>

              </li>
            </div>

          ))}

        </ul >

        <hr />
        {/* Mostrar el total de los productos en el carrito */}
        <div className="total-container">
          <h4>Total ({calculateTotalQuantity()}): ${calculateTotal()}</h4>
        </div>

        <div className="close-botton">
          <button className="btn btn-primary" onClick={onClose}>Continuar compra</button>
        </div>

      </div>

    </div>
  );
};