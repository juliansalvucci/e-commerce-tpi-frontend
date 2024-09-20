import { useContext, useState } from "react";
import { CardComponent } from "../components/CardComponent";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export const ProductsPage = () => {
  const { products } = useContext(ProductContext);
  const { addProduct, removeProduct } = useContext(CartContext);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Calcular el índice de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="products">
        <h1>Nuestros productos</h1>
        <hr />

        <ul>
          {/* Renderizado condicional para manejar cuando no haya productos */}
          {products.length > 0 ? (
            currentProducts.map((product) => (
              <CardComponent
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                handlerAdd={() => addProduct(product)}
                handlerRemove={() => removeProduct(product.id)}
              />
            ))
          ) : (
            <p>Cargando...</p>
          )}
        </ul>
      </div>

      {/* Paginación */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <span
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Anterior
            </span>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <span className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </span>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <span
              className="page-link"
              onClick={() => paginate(currentPage + 1)}
            >
              Siguiente
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
