import React, { useReducer } from "react";
import { CartContext } from "./CartContext";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../api/api";

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

      default:
        return state;
    }
  };

  const [shoppingList, dispatch] = useReducer(cartReducer, initialState);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Estados para el descuento
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  //const [isDiscountShown, setIsDiscountShown] = useState(false);

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

  const calculateTotal = () => {
    return shoppingList.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  // Calculamos el descuento y el total con descuento
  useEffect(() => {
    const total = calculateTotal();
    setSubtotal(total);
    if (total >= 1000000) {
      const calculatedDiscount = total * 0.1; // 10% de descuento
      setDiscount(calculatedDiscount);
      setTotalWithDiscount(total - calculatedDiscount);
      // Mostrar el mensaje de descuento aplicado en la primera vez
      
    } else if (total < 1000000) {
      // Reinicia el estado si el total baja de 8000000
      setDiscount(0);
      setTotalWithDiscount(total);
      //setIsDiscountShown(false);
    }
  }, [shoppingList]);

  const calculateTotalQuantity = () => {
    return shoppingList.reduce(
      (totalQuantity, product) => totalQuantity + product.quantity,
      0
    );
  };

  // Función para crear un nuevo pedido
  const createOrder = async (newOrder) => {
    try {
      const response = await api.post("/orders", newOrder);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      Swal.fire({
        icon: "success",
        title: "Exito!",
        text: `El producto ${response.data.name} fue creado con éxito!`,
        customClass: {
          popup: "swal-success-popup",
          confirmButton: "swal-ok-button",
        },
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Email incorrecto",
          text: "No existe un usuario con ese email en la base de datos",
          confirmButtonText: "OK",
          customClass: {
            popup: "swal-success-popup",
            confirmButton: "swal-ok-button",
          },
        });
      } else {
        console.error("Error al crear producto:", error); // Por ahora mostramos el error por consola por comodidad
      }
    }
  };

  const selectedProductForEdit = (product) => {
    dispatch(product);
  };

  return (
    <CartContext.Provider
      value={{
        shoppingList,
        calculateTotal,
        dispatch,
        products,
        addProduct,
        removeProduct,
        incrementQuantity,
        decrementQuantity,
        selectedProductForEdit,
        emptyCart,
        createOrder,
        orders,
        setOrders,
        calculateTotalQuantity,
        subtotal,
        discount,
        totalWithDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
