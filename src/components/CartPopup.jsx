import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/CartPopUp.css";

export const CartPopup = ({ isVisible, onClose }) => {
  const { shoppingList, removeProduct, incrementQuantity, decrementQuantity } = useContext(CartContext)

  /*
  const calculateTotal = () => {
    return shoppingList.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
  }
  */

  if (!isVisible) return null;  // Si el popup no está visible, no se renderiza nada

  return (
    <div className='cart'>
        <h3>Carrito de Compras</h3>
        <ul>
          {shoppingList.map((product) => (
            <li key={product.id}>
              <button className="close-btn" onClick={onClose}>X</button>
              <img className="cart-img" src={product.image} alt={product.title} />
              <div>
                <strong>{product.title}</strong>  
                <p>${product.price}</p>
              </div>
              <td>
                {/*Quito cantidad de productos del carrito */}
                <button
                  className="btn btn-outline-primary"
                  onClick={() => decrementQuantity(product.id)}
                >-</button>

                <button
                  className="btn btn-primary">{product.quantity}
                </button>
                
                <button
                  className="btn btn-outline-primary"
                  onClick={() => incrementQuantity(product.id)}
                >+</button>
              </td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeProduct(product.id)}
                >Eliminar</button>
              </td>
              {/*<b>Total: </b>${calculateTotal()}*/}
            </li>
          ))}
        </ul >
        <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
      </div>
  );
};
