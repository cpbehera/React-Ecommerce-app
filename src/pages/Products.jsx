import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products)
      console.log('Fetched products:', response.data.products)
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again later.')
    } finally {
      console.log('Finished fetching products.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted fw-semibold">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex align-items-center shadow-sm" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <div>{error}</div>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark mb-2">Our Products</h1>
        <p className="text-muted fs-5">Browse our curated collection of quality items</p>
      </div>

      {/* Search Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden">
            <span className="input-group-text bg-white border-end-0 ps-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search text-muted" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="form-control border-start-0 shadow-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search && (
            <p className="text-muted small mt-2 ms-2">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <div className="display-1 text-muted mb-3">🔍</div>
          <h4 className="text-muted">No products found</h4>
          <p className="text-muted">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((product) => {
            return (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="h-100 transition-transform">
                  <ProductCard product={product} />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Inline styles for hover effect */}
      <style>{`
        .transition-transform {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .transition-transform:hover {
          transform: translateY(-6px);
        }
        .input-group-text {
          border-color: #dee2e6;
        }
        .form-control:focus {
          border-color: #dee2e6;
          box-shadow: none;
        }
      `}</style>
    </div>
  )
}

export default Products