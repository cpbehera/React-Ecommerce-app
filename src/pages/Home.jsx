import { Link } from 'react-router-dom'
import './Home.css'

/* Small inline icons (replace emoji so they match the theme and scale cleanly) */
const icons = {
  bag: (
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
  ),
  sparkle: (
    <path d="M8 0c.4 3.8 1.9 6 6 8-4.1 2-5.6 4.2-6 8-.4-3.800-1.900-6-6-8 4.100-2 5.600-4.200 6-8z" />
  ),
  heart: (
    <path d="M8 14.5S1 10.2 1 5.6A3.600 3.600 0 0 1 8 4.300 3.600 3.600 0 0 1 15 5.600c0 4.600-7 8.900-7 8.900z" />
  ),
  grid: (
    <path d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z" />
  ),
  star: (
    <path d="M8 1l2 4.200 4.600.600-3.400 3.200.9 4.600L8 11.300l-4.100 2.300.9-4.600L1.400 5.800 6 5.200 8 1z" />
  ),
  cart: (
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.890 3H14.500a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.010 3.607 1.610 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  ),
}

function Icon({ name, size = 22 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="hero-kicker">Your everyday shopping destination</p>

            <h1 className="hero-title">
              Shop smart.
              <br />
              Live better.
            </h1>

            <p className="hero-lead">
              Discover amazing products, explore the latest trends, and find
              everything you love, all in one place.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="home-btn home-btn-primary">
                Shop now
              </Link>
              <Link to="/products" className="home-btn home-btn-ghost">
                Explore products
              </Link>
            </div>

            <dl className="hero-facts">
              <div>
                <dt>Quality</dt>
                <dd>Products</dd>
              </div>
              <div>
                <dt>Easy</dt>
                <dd>Shopping</dd>
              </div>
              <div>
                <dt>Great</dt>
                <dd>Value</dd>
              </div>
            </dl>
          </div>

          <div className="col-lg-6">
            <div className="hero-tiles" aria-hidden="true">
              <div className="tile tile-beauty">
                <Icon name="sparkle" size={26} />
                <span className="tile-title">Beauty</span>
              </div>

              <div className="tile tile-fashion">
                <Icon name="bag" size={26} />
                <span className="tile-title">Fashion</span>
              </div>

              <div className="tile tile-discover">
                <Icon name="grid" size={22} />
                <span className="tile-title">Discover more</span>
                <span className="tile-sub">Find your favorites</span>
              </div>

              <div className="tile tile-made">
                <Icon name="heart" size={22} />
                <span className="tile-title">Made for you</span>
                <span className="tile-sub">Love every purchase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits container">
        <div className="row g-5">
          <div className="col-lg-4">
            <h2 className="section-title">Why MyStore?</h2>
            <p className="section-lead">
              Everything you need for a better shopping experience.
            </p>
          </div>

          <div className="col-lg-8">
            <ul className="benefit-list">
              <li className="benefit">
                <span className="benefit-icon">
                  <Icon name="grid" />
                </span>
                <div>
                  <h3>Wide selection</h3>
                  <p>Explore products across beauty, fashion, and more.</p>
                </div>
              </li>

              <li className="benefit">
                <span className="benefit-icon">
                  <Icon name="star" />
                </span>
                <div>
                  <h3>Quality first</h3>
                  <p>Find products that match your style and preferences.</p>
                </div>
              </li>

              <li className="benefit">
                <span className="benefit-icon">
                  <Icon name="cart" />
                </span>
                <div>
                  <h3>Easy shopping</h3>
                  <p>
                    Browse your favorites and add them to your cart with ease.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container">
        <div className="home-cta">
          <div>
            <h2>Ready to find your favorites?</h2>
            <p>Explore our collection and discover something special.</p>
          </div>

          <Link to="/products" className="home-btn home-btn-accent">
            Browse products
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
