import { useContext, useEffect, useState } from "react"
import '../styles/CardComponent.css'
import { CartContext } from "../context/CartContext"

export const CardComponent = ({id, image, title, description, price, handlerAdd, handlerRemove}) => {

    const {shoppingList} = useContext(CartContext)

    //Comprobamos si está o no agregado al carrito
    const [added, setAdded] = useState(false)

    const addProduct = () => {
        handlerAdd()
        setAdded(true)
    };

    const removeProduct = () => {
        handlerRemove()
        setAdded(false)
    };

    const checkAdded = () => {
        //Verifico si hay algún id que coincide con el que ya seleccioné para que no se marqué como no seleccionado otra vez
        const boolean = shoppingList.some(product => product.id == id)
        setAdded(boolean)
    };
    
    //Para saber si el estado del producto inicializa en verdadero o falso debo hacer lo siguiente
    useEffect(() => {
      checkAdded()
    }, []);
    
    return (
        <div className="card">

            <img src={image} alt={title} className="card-img" />

            <div className="card_content">
                <h3 className="card_title">{title}</h3>
                <p className="card_description">{description}</p>
                <p className="card_price">{price}</p>
                {
                    added? 
                        //En el caso de que ya se haya añadido el producto al carrito
                        <button 
                            type="button"
                            className="remove_button"
                            onClick={removeProduct}
                        >
                            Quitar del carrito
                        </button>
                        :
                        //En el caso de que no se haya añadido el producto al carrito
                        <button 
                            type="button"
                            className="add_button"
                            onClick={addProduct}
                        >
                            Agregar al carrito
                        </button>
                }
            </div>
            
        </div>
    );
};
