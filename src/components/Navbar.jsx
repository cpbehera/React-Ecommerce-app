import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import CartContext from '../context/CartContext.jsx'

function Navbar() {
  const { cart } = useContext(CartContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top store-nav">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-mark d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
            </svg>
          </span>
          <span className="brand-name">MyStore</span>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link store-link ${isActive ? 'active' : ''}`
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
                  `nav-link store-link ${isActive ? 'active' : ''}`
                }
                to="/products"
              >
                Products
              </NavLink>
            </li>
          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center mt-3 mt-lg-0">

            {/* Cart */}
            <Link
              to="/cart"
              className="cart-btn d-flex align-items-center justify-content-center gap-2"
              aria-label={`Cart, ${cart.length} items`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span>Cart</span>
              <span className="cart-count">{cart.length}</span>
            </Link>

          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .store-nav {
          --nav-bg: #12161f;
          --nav-line: rgba(255, 255, 255, 0.08);
          --nav-text: rgba(255, 255, 255, 0.68);
          --nav-accent: #f5b83d;
          --nav-accent-ink: #1b1303;

          background-color: var(--nav-bg);
          border-bottom: 1px solid var(--nav-line);
          padding: 0.7rem 0;
        }

        /* Brand */
        .store-nav .navbar-brand {
          margin-right: 0;
        }
        .store-nav .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background-color: var(--nav-accent);
          color: var(--nav-accent-ink);
        }
        .store-nav .brand-name {
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
        }

        /* Links */
        .store-nav .store-link {
          position: relative;
          padding: 0.5rem 0.9rem;
          font-weight: 500;
          color: var(--nav-text);
          transition: color 0.15s ease;
        }
        .store-nav .store-link:hover {
          color: #fff;
        }
        .store-nav .store-link.active {
          color: #fff;
          font-weight: 600;
        }
        /* Active indicator: underline on desktop, side bar on mobile */
        .store-nav .store-link.active::after {
          content: '';
          position: absolute;
          background-color: var(--nav-accent);
          border-radius: 2px;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 3px;
        }
        @media (min-width: 992px) {
          .store-nav .store-link.active::after {
            left: 0.9rem;
            right: 0.9rem;
            top: auto;
            bottom: -0.35rem;
            width: auto;
            height: 3px;
          }
        }

        /* Cart button */
        .store-nav .cart-btn {
          padding: 0.45rem 0.5rem 0.45rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }
        .store-nav .cart-btn:hover {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.35);
          color: #fff;
        }
        .store-nav .cart-count {
          min-width: 26px;
          height: 26px;
          padding: 0 0.45rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background-color: var(--nav-accent);
          color: var(--nav-accent-ink);
          font-size: 0.78rem;
          font-weight: 700;
          line-height: 1;
        }

        /* Mobile: full-width cart button */
        @media (max-width: 991.98px) {
          .store-nav .navbar-collapse {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid var(--nav-line);
          }
          .store-nav .store-link {
            padding-left: 1rem;
          }
          .store-nav .cart-btn {
            width: 100%;
            justify-content: space-between !important;
            padding-left: 1rem;
          }
          .store-nav .cart-btn > span:nth-of-type(1) {
            margin-right: auto;
          }
        }

        /* Keyboard focus */
        .store-nav a:focus-visible,
        .store-nav .navbar-toggler:focus-visible {
          outline: 2px solid var(--nav-accent);
          outline-offset: 3px;
          border-radius: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
          .store-nav * {
            transition: none !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
