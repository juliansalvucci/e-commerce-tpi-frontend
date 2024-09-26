import { useContext, useEffect, useState } from "react";
import "../styles/CardComponent.css";
import { CartContext } from "../context/CartContext";
import { ProductPopup } from "../components/ProductPopup";
import addProductToCart from "../assets/add-product.png";
import removeProductToCart from "../assets/remove-product.png";

export const CardComponent = ({
  id,
  image,
  title,
  price,
  description,
  handlerAdd,
  handlerRemove,
}) => {
  const { shoppingList } = useContext(CartContext);

  //Comprobamos si está o no agregado al carrito
  const [added, setAdded] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);  // Estado para controlar la visibilidad del popup del producto
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para almacenar el producto seleccionado del popup del mismo

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

  const showProductPopup = () => {
    // Buscar el producto en el carrito para obtener su cantidad actual
    const productInCart = shoppingList.find((item) => item.id === id);
    const quantity = productInCart ? productInCart.quantity : 1;
  
    setSelectedProduct({ id, image, title, description, price, quantity });
    setIsPopupVisible(true);
  };

  //Cierro el popup con el detalle del producto seleccionado
  const closeProductPopup = () => {
    setIsPopupVisible(false);
  }

  return (
    <li className="card">
      <div className="product-alert">
        <img
          src={image}
          alt={title}
          className="card-img"
          onClick={showProductPopup}
        />
      </div>

      <div className="card_content">
        <div className="product-alert">
          <h5
            className="card_title"
            onClick={showProductPopup}
          >
            {title}
          </h5>
          <p
            className="card_price"
            onClick={showProductPopup}
          >
            ${price.toFixed(2)}
          </p>
        </div>
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

      {/*Renderiza el popup si está visible */}
      {isPopupVisible && (
        <ProductPopup
          isVisible={isPopupVisible}
          onClose={closeProductPopup}
          product={selectedProduct}
        />
      )}
    </li>
  );
};