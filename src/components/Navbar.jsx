import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top modern-navbar">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span className="logo-icon d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
            </svg>
          </span>
          <span>MyStore</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Left menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                }
                to="/"
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link px-3 ${isActive ? 'active fw-semibold' : ''}`
                }
                to="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center gap-2 flex-column flex-lg-row w-100 w-lg-auto mt-3 mt-lg-0">

            

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-cart position-relative d-flex align-items-center justify-content-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span>Cart</span>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge">
                0
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .modern-navbar {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
          padding: 0.75rem 0;
        }
        .logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }
        .navbar-brand span {
          letter-spacing: -0.3px;
          font-size: 1.25rem;
        }
        .modern-navbar .nav-link {
          color: rgba(255, 255, 255, 0.75);
          border-radius: 8px;
          transition: color 0.2s ease, background-color 0.2s ease;
          font-weight: 500;
        }
        .modern-navbar .nav-link:hover {
          color: #fff;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .modern-navbar .nav-link.active {
          color: #fff;
          background-color: rgba(102, 126, 234, 0.25);
        }
        .search-form {
          min-width: 220px;
        }
        .search-form .input-group-text,
        .search-form .form-control {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
          border-radius: 10px !important;
        }
        .search-form .input-group-text {
          padding-right: 0.4rem;
        }
        .search-form .form-control {
          padding-left: 0.4rem;
        }
        .search-form .form-control::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .search-form .form-control:focus {
          background-color: rgba(255, 255, 255, 0.12);
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
        }
        .btn-cart {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 10px;
          padding: 0.5rem 0.2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-cart:hover {
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }
        .cart-badge {
          font-size: 0.65rem;
          padding: 0.25em 0.5em;
        }
      `}</style>
    </nav>
  )
}

export default Navbar