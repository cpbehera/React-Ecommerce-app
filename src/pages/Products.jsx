import { useState, useEffect, useContext } from 'react'
import ProductCard from '../components/ProductCard'
import CartContext from '../context/CartContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

/* Page styles (shared by the loading, error and main views) */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');

  .pp {
    --ink: #12161f;
    --ink-soft: #5a6272;
    --paper: #f5f6f8;
    --surface: #ffffff;
    --line: #e2e5eb;
    --amber: #f5b83d;
    --amber-soft: #fde9bd;

    min-height: calc(100vh - 70px);
    padding: 3.5rem 0 5rem;
    background-color: var(--paper);
    color: var(--ink);
    font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  }

  /* Header */
  .pp-title {
    margin: 0 0 0.4rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif;
    font-size: clamp(2rem, 4.5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }
  .pp-subtitle {
    margin: 0;
    font-size: 1.1rem;
    color: var(--ink-soft);
  }

  /* Search */
  .pp-search {
    position: relative;
  }
  .pp-search svg {
    position: absolute;
    top: 50%;
    left: 1.1rem;
    transform: translateY(-50%);
    color: var(--ink-soft);
    pointer-events: none;
  }
  .pp-search input {
    width: 100%;
    height: 52px;
    padding: 0 1.25rem 0 2.9rem;
    border: 1.5px solid var(--line);
    border-radius: 999px;
    background-color: var(--surface);
    color: var(--ink);
    font-size: 1rem;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .pp-search input::placeholder {
    color: #8a91a0;
  }
  .pp-search input:focus {
    outline: none;
    border-color: var(--ink);
    box-shadow: 0 0 0 4px rgba(245, 184, 61, 0.35);
  }

  /* Result count */
  .pp-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2.25rem 0 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
    font-size: 0.95rem;
    color: var(--ink-soft);
  }
  .pp-meta strong {
    color: var(--ink);
    font-weight: 600;
  }

  /* Card wrapper */
  .pp-item {
    transition: transform 0.2s ease;
  }
  .pp-item:hover {
    transform: translateY(-3px);
  }

  /* Loading skeleton */
  .pp-skel {
    height: 100%;
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 16px;
    background-color: var(--surface);
  }
  .pp-skel-img,
  .pp-skel-line {
    background: linear-gradient(90deg, #eceef2 25%, #f6f7f9 50%, #eceef2 75%);
    background-size: 200% 100%;
    animation: pp-shimmer 1.4s linear infinite;
  }
  .pp-skel-img {
    height: 190px;
  }
  .pp-skel-body {
    padding: 1rem;
  }
  .pp-skel-line {
    height: 12px;
    margin-bottom: 0.7rem;
    border-radius: 6px;
  }
  .pp-skel-line.w-60 { width: 60%; }
  .pp-skel-line.w-40 { width: 40%; margin-bottom: 0; }
  @keyframes pp-shimmer {
    to { background-position: -200% 0; }
  }

  /* Error + empty states */
  .pp-state {
    max-width: 30rem;
    margin: 4rem auto 0;
    padding: 2.5rem 1.5rem;
    text-align: center;
  }
  .pp-state-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin-bottom: 1.25rem;
    border-radius: 18px;
    background-color: var(--ink);
    color: var(--amber);
  }
  .pp-state h2 {
    margin: 0 0 0.4rem;
    font-family: 'Bricolage Grotesque', 'DM Sans', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .pp-state p {
    margin: 0;
    color: var(--ink-soft);
  }
  .pp-error {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    max-width: 38rem;
    margin: 0 auto;
    padding: 1.1rem 1.25rem;
    border: 1px solid #f1c3c3;
    border-left: 5px solid #d64545;
    border-radius: 12px;
    background-color: #fff;
    color: #7a1f1f;
    font-weight: 500;
  }
  .pp-error svg {
    flex: 0 0 auto;
    margin-top: 2px;
    color: #d64545;
  }

  @media (prefers-reduced-motion: reduce) {
    .pp-item,
    .pp-search input { transition: none; }
    .pp-skel-img,
    .pp-skel-line { animation: none; }
    .pp-item:hover { transform: none; }
  }
`

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { cart, setCart } = useContext(CartContext)

  const addToCart = (product) => {
    toast(`Added "${product.title}" to cart!`)
    setCart((prevCart) =>{

      // Check if the product already exists in the cart
      const existingProduct = prevCart.find(item => item.id === product.id); 
      
      // If it exists, you can choose to update the quantity or ignore it
      if(existingProduct){
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart,{...product, quantity: 1}];
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) =>{
      return prevCart.filter(item => item.id !== productId);
    })
  }


  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products)
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
      <div className="pp">
        <style>{pageStyles}</style>
        <div className="container" role="status">
          <span className="visually-hidden">Loading products...</span>
          <div className="mb-5">
            <h1 className="pp-title">Our products</h1>
            <p className="pp-subtitle">Loading products...</p>
          </div>
          <div className="row g-4" aria-hidden="true">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="pp-skel">
                  <div className="pp-skel-img"></div>
                  <div className="pp-skel-body">
                    <div className="pp-skel-line"></div>
                    <div className="pp-skel-line w-60"></div>
                    <div className="pp-skel-line w-40"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pp">
        <style>{pageStyles}</style>
        <div className="container">
          <div className="pp-error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <div>{error}</div>
          </div>
        </div>
      </div>
    )
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="pp">
      <style>{pageStyles}</style>
      <div className="container">
        <ToastContainer position="bottom-right" />

        {/* Header + Search */}
        <div className="row align-items-end g-4">
          <div className="col-lg-7">
            <h1 className="pp-title">Our products</h1>
            <p className="pp-subtitle">Browse our curated collection of quality items</p>
          </div>

          <div className="col-lg-5">
            <div className="pp-search">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="pp-meta" aria-live="polite">
          {search ? (
            <span>
              <strong>{filteredProducts.length}</strong> result{filteredProducts.length !== 1 ? 's' : ''} found
            </span>
          ) : (
            <span>
              <strong>{products.length}</strong> products
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="pp-state">
            <div className="pp-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
            <h2>No products found</h2>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => {
              return (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="h-100 pp-item">
                    <ProductCard product={product} onAddToCart={()=>addToCart(product)} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
