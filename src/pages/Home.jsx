import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="hero-badge">
              ✨ Your Everyday Shopping Destination
            </span>

            <h1 className="hero-title">
              Shop Smart.
              <br />
              Live <span>Better.</span>
            </h1>

            <p className="hero-description">
              Discover amazing products, explore the latest trends,
              and find everything you love — all in one place.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="btn btn-shop">
                Shop Now <span>→</span>
              </Link>

              <Link to="/products" className="btn btn-explore">
                Explore Products
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>Quality</strong>
                <small>Products</small>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <strong>Easy</strong>
                <small>Shopping</small>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <strong>Great</strong>
                <small>Value</small>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-visual">
              <div className="hero-circle"></div>

              <div className="floating-card card-top">
                <span>✨</span>
                <div>
                  <strong>Discover More</strong>
                  <small>Find your favorites</small>
                </div>
              </div>

              <div className="shopping-illustration">
                <span className="bag-emoji">🛍️</span>
                <span className="sparkle sparkle-one">✦</span>
                <span className="sparkle sparkle-two">✧</span>
              </div>

              <div className="floating-card card-bottom">
                <span>💜</span>
                <div>
                  <strong>Made for You</strong>
                  <small>Love every purchase</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section container">
        <div className="text-center mb-5">
          <span className="section-label">WHY MYSTORE?</span>
          <h2 className="section-title">
            Shopping made simple
          </h2>
          <p className="section-description">
            Everything you need for a better shopping experience.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="benefit-card">
              <div className="benefit-icon purple">🛍️</div>
              <h5>Wide Selection</h5>
              <p>
                Explore products across beauty, fashion, and more.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="benefit-card">
              <div className="benefit-icon pink">💎</div>
              <h5>Quality First</h5>
              <p>
                Find products that match your style and preferences.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="benefit-card">
              <div className="benefit-icon orange">💜</div>
              <h5>Easy Shopping</h5>
              <p>
                Browse your favorites and add them to your cart with ease.
              </p>
            </div>
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

          <Link to="/products" className="btn btn-cta">
            Browse Products →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home