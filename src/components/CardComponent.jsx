import { useContext, useEffect, useState } from "react";
import "../styles/CardComponent.css";
import { CartContext } from "../context/CartContext";
import addProductToCart from "../assets/add-product.png";
import removeProductToCart from "../assets/remove-product.png";

export const CardComponent = ({
  id,
  image,
  title,
  price,
  handlerAdd,
  handlerRemove,
}) => {
  const { shoppingList } = useContext(CartContext);

  //Comprobamos si está o no agregado al carrito
  const [added, setAdded] = useState(false);

  const addProduct = () => {
    handlerAdd();
    setAdded(true);
  };

  const removeProduct = () => {
    handlerRemove();
    setAdded(false);
  };

  const checkAdded = () => {
    //Verifico si hay algún id que coincide con el que ya seleccioné para que no se marqué como no seleccionado otra vez
    const boolean = shoppingList.some((product) => product.id == id);
    setAdded(boolean);
  };

  //Para saber si el estado del producto inicializa en verdadero o falso debo hacer lo siguiente
  useEffect(() => {
    checkAdded();
  }, [shoppingList]); //Se actualiza cada vez que el shoppingList cambie

  return (
    <li className="card">
      <img src={image} alt={title} className="card-img" />

      <div className="card_content">
        <h5 className="card_title">{title}</h5>
        <p className="card_price">${price.toFixed(2)}</p>
        {added ? (
          //En el caso de que ya se haya añadido el producto al carrito y el usuario quiere quitarla
          <div className="circle">
            <img
              src={removeProductToCart}
              alt="Remover del carrito"
              className="remove_button"
              onClick={removeProduct}
            />
          </div>
        ) : (
          //En el caso de que no se haya agregado el producto al carrito
          <div className="circle">
            <img
              src={addProductToCart}
              alt="Agregar al carrito"
              className="add_button"
              onClick={addProduct}
            />
          </div>
        )}
      </div>
    </li>
  );
};
