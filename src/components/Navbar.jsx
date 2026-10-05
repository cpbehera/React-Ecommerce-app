import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          MyStore 🛒
        </Link>

        {/* Mobile menu button */}
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

          </ul>

          {/* Right side */}
          <div className="d-flex align-items-center">

            {/* Search */}
            <form className="d-flex me-3">
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
              />
              <button className="btn btn-outline-light ms-2" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </form>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-outline-light position-relative"
            >
              <i className="bi bi-cart3"></i>
              <span className="ms-1">Cart</span>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </Link>

          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar