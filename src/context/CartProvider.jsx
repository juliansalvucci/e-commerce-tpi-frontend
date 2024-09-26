import { useReducer } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const initialState = [];

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
          const cant = product.quantity + 1;
          if (product.id === action.payload)
            return { ...product, quantity: cant };
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

      default:
        return state;
    }
  };

  const [shoppingList, dispatch] = useReducer(cartReducer, initialState);

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

  return (
    <CartContext.Provider
      value={{
        shoppingList,
        addProduct,
        removeProduct,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
