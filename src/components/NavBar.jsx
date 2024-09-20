import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/NavBar.css';
import { useState, useEffect } from 'react';
const NavBar = () => {
  const navbarStyle = {
    backgroundColor: '#00203D',
    color: '#C2E1FF',
  };

  const linkStyle = {
    color: '#C2E1FF',
    textDecoration: 'none',
  };
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 200; // Puedes ajustar este valor según lo que desees
      const newOpacity = Math.max(1 - scrollY / maxScroll, 0); // Calcular la opacidad
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{opacity, navbarStyle}}>
      <div className="container-fluid justify-content-center col-md-auto" >
        <div className="row w-100">
          {/* Fila superior */}
          <div className="col-12 d-flex justify-content-center align-items-center mb-2">
            <a className="navbar-brand" href="#" style={linkStyle}>
            <i className="fa-solid fa-cart-shopping"></i>
              MegaStore
            </a>
            <form className="d-flex flex-grow-1 mx-4">
              <input className="form-control w-80 me-2" type="search" placeholder="Buscar" aria-label="Buscar"/>
              <button className="btn btn-outline-light" type="submit">Buscar</button>
            </form>
            <div className="d-flex">
              <a className="nav-link" href="#" style={linkStyle}>
                <i className="bi bi-person-fill me-2"></i>
                
              </a>
              <a className="nav-link ms-3" href="#" style={linkStyle}>
                <i className="bi bi-cart-fill me-2"></i>
                
              </a>
            </div>
          </div>
          
          {/* Fila inferior */}
          <div className="col-12">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">

                <li className="nav-item dropdown dropend">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={linkStyle}>
                  <i className="fa-solid fa-list me-2"></i>
                    Categorías
                  </a>

                  <ul className="dropdown-menu">
                <li className="dropdown-submenu">
                  <a className="dropdown-item dropdown-toggle" href="#">Categoría 1</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Subcategoría 1.1</a></li>
                    <li><a className="dropdown-item" href="#">Subcategoría 1.2</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a className="dropdown-item dropdown-toggle" href="#">Categoría 2</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Subcategoría 2.1</a></li>
                    <li><a className="dropdown-item" href="#">Subcategoría 2.2</a></li>
                  </ul>
                </li>
                <li className="dropdown-submenu">
                  <a className="dropdown-item dropdown-toggle" href="#">Categoría 3</a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Subcategoría 3.1</a></li>
                    <li><a className="dropdown-item" href="#">Subcategoría 3.2</a></li>
                  </ul>
                </li>
              </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={linkStyle}>
                  <i className="fa-solid fa-computer me-2"></i>
                    Nootbooks
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={linkStyle}>
                  <i className="fa-solid fa-mobile me-2"></i>
                    Smartphones
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link disabled" href="#" style={linkStyle}>
                  <i className="fa-solid fa-percent me-2"></i>
                    Promociones
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" style={linkStyle}>
                  <i className="fa-solid fa-circle-info me-2"></i>
                    Ayuda
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;