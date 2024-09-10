import { useContext } from "react"
import { CardComponent } from "../components/CardComponent"
import { ProductContext } from "../context/ProductContext"
import { CartContext } from "../context/CartContext"

export const ProductsPage = () => {
  
  const { products } = useContext(ProductContext)
  const {addProduct, removeProduct} = useContext(CartContext)
  
  return (
    <>
      <h1>Productos</h1>
      <hr />
      {/* Renderizado condicional para manejar cuando no haya productos */}
      {products.length > 0 ? (
        products.map(product => (
          <CardComponent    
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            description={product.description}
            handlerAdd={() => addProduct(product)}
            handlerRemove={() => removeProduct(product.id)}
          />
        ))
      ) : (
        <p>Cargando...</p>
      )}
    </>
  )
}
