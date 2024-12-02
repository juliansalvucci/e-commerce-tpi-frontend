import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardComponent } from "../components/CardComponent";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export const ProductsPage = () => {
  const { products, fetchProducts } = useContext(ProductContext);
  const { addProduct, removeProduct } = useContext(CartContext);
  const location = useLocation();

  // Recargar productos si viene con reloadStock: true
  useEffect(() => {
    if (location.state?.reloadStock) {
      fetchProducts();
    }
  }, [location.state, fetchProducts]);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calcular el índice de los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calcular el total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      <div className="products-pagination">
        <div className="products-page">
          <h1>Nuestros Productos</h1>
          <hr />
          <ul>
            {/* Renderizado condicional para manejar cuando no haya productos */}
            {products.length > 0 ? (
              currentProducts.map((product) => (
                <CardComponent
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.imageURL}
                  stock={product.stock}
                  price={product.price}
                  description={product.description}
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
      </div>
    </>
  );
};
