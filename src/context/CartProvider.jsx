import { useReducer } from "react";
//import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const CartProvider = ({ children }) => {
  const initialState = [];
  //const navigate = useNavigate();

  const cartReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case "[CART] Add Product":
        //action.payload contiene el producto que desea agregar al carrito
        return [...state, action.payload]; //Retorno el estado que ya esté y el producto entero del action.payload
      case "[CART] Remove Product":
        //Devuelve todos los id cuyos id no coinciden con el id que está dentro del action.payload
        return state.filter((product) => product.id !== action.payload);
      case "[CART] Increment Quantity":
        //Recorro los productos y el que coincide con el id del producto, se le incrementa la cantidad
        return state.map((product) => {
          // Si la cantidad es menor que el stock disponible, se incrementa la cantidad
          if (
            product.id === action.payload &&
            product.quantity < product.stock
          ) {
            return { ...product, quantity: product.quantity + 1 };
          } else if (
            product.id === action.payload &&
            product.quantity >= product.stock
          ) {
            // Si se alcanza el stock disponible, mostrar alerta
            Swal.fire({
              icon: "warning",
              title: "No hay más stock disponible",
              text: `El producto ${product.name} ha alcanzado el límite de stock.`,
            });
          }
          return product;
        });
      case "[CART] Decrement Quantity":
        //Recorro los productos y el que coincide con el id del producto (almacenado en el action.payload),
        //verifico que la cantidad sea mayor a 1 y se le decrementa la cantidad
        return state.map((product) => {
          const cant = product.quantity - 1;
          if (product.id === action.payload && product.quantity > 1)
            return { ...product, quantity: cant };
          return product;
        });
      case "[CART] Empty Cart":
        return [];

      //despues de esto yo debería actualizar el stock disponible en el backend

      case "[CART] Update Stock":
        return state.map((product) => {
          if (product.id === action.payload) {
            return {
              ...product,
              stock: product.stock - action.payload.quantity,
            };
          }
          return product;
        });

      default:
        return state;
    }
  };

  const [shoppingList, dispatch] = useReducer(cartReducer, initialState);

  const [products, setProducts] = useState([]);
  //const [selectedProducts, setSelectedProduct] = useState(null);

  const addProduct = (product) => {
    product.quantity = 1; //Comience en 1 cuando agregue un producto
    const action = {
      type: "[CART] Add Product",
      payload: product,
    };
    dispatch(action);
  };

  const removeProduct = (id) => {
    const action = {
      type: "[CART] Remove Product",
      payload: id,
    };
    dispatch(action);
  };

  const incrementQuantity = (id) => {
    const action = {
      type: "[CART] Increment Quantity",
      payload: id,
    };
    dispatch(action);
  };

  const decrementQuantity = (id) => {
    const action = {
      type: "[CART] Decrement Quantity",
      payload: id,
    };
    dispatch(action);
  };

  const emptyCart = () => {
    const action = {
      type: "[CART] Empty Cart",
    };
    dispatch(action);
  };

  const updateStock = async (id, updatedStock) => {
    try {
      // Enviar la solicitud para actualizar el stock del producto
      const response = await axios.patch(
        `http://localhost:8080/product/update-stock/${id}`,
        { stock: updatedStock }
      );

      // Si la solicitud es exitosa, actualizamos el estado local
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, stock: updatedStock } : product
        )
      );
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el stock del producto.",
      });
    }
  };

  const selectedProductForEdit = (product) => {
    dispatch(product);
  };

  return (
    <CartContext.Provider
      value={{
        shoppingList,
        products,
        addProduct,
        removeProduct,
        incrementQuantity,
        decrementQuantity,
        updateStock,
        selectedProductForEdit,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
